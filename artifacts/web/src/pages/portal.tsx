import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { setClientToken, getClientToken } from "@/lib/portalApi";

export default function Portal() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (getClientToken()) setLocation("/portal/dashboard");
  }, []);

  // Handle Google token from callback URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setClientToken(token);
      setLocation("/portal/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/portal/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message ?? "E-mail ou senha incorretos");
      }
      const data = await res.json();
      setClientToken(data.token);
      setLocation("/portal/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "E-mail ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/15 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-8 pb-0">
        <a href="/" className="inline-flex items-center group">
          <img
            src={`${import.meta.env.BASE_URL}images/docka-logo-h.png`}
            alt="Docka Seguros"
            className="h-9 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Área do Cliente</h1>
            <p className="text-slate-400">Acesse suas apólices, sinistros e documentos</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  placeholder="voce@empresa.com.br"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Use a senha fornecida pela equipe Docka no seu cadastro.
              </p>
            </form>
          </div>

          <div className="flex justify-between mt-6 text-sm text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← Página inicial</a>
            <a href="/cotacao" className="hover:text-white transition-colors">
              Fazer cotação →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
