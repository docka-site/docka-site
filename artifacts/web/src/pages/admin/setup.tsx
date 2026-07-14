import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { adminFetch } from "@/lib/adminApi";

export default function AdminSetup() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    adminFetch<{ setupRequired: boolean }>("/admin/setup")
      .then((data) => {
        if (!data.setupRequired) setLocation("/admin/login");
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("As senhas não conferem"); return; }
    if (password.length < 8) { setError("Senha deve ter no mínimo 8 caracteres"); return; }
    setLoading(true);
    try {
      await adminFetch("/admin/setup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar administrador");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Configuração concluída!</h2>
          <p className="text-slate-500 mb-6">Administrador criado com sucesso.</p>
          <button
            onClick={() => setLocation("/admin/login")}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Configuração Inicial</h1>
          <p className="text-slate-500 mt-1 text-sm">Crie o primeiro administrador do sistema</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {[
              { label: "Nome completo", value: name, onChange: setName, type: "text", placeholder: "João Silva" },
              { label: "E-mail", value: email, onChange: setEmail, type: "email", placeholder: "admin@empresa.com" },
              { label: "Senha", value: password, onChange: setPassword, type: "password", placeholder: "Mínimo 8 caracteres" },
              { label: "Confirmar senha", value: confirm, onChange: setConfirm, type: "password", placeholder: "Repita a senha" },
            ].map(({ label, value, onChange, type, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60"
            >
              {loading ? "Criando..." : "Criar Administrador"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
