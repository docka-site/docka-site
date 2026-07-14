import { useEffect, useState } from "react";
import { Plus, X, AlertCircle, UserCheck, UserX, Shield } from "lucide-react";
import AdminLayout from "./layout";
import { adminFetch } from "@/lib/adminApi";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export default function AdminUsuarios() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminFetch<{ users: AdminUser[] }>("/admin/users");
      setUsers(data.users);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("As senhas não conferem"); return; }
    if (form.password.length < 8) { setError("Senha deve ter no mínimo 8 caracteres"); return; }
    setSaving(true);
    try {
      await adminFetch("/admin/users", {
        method: "POST",
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      setShowModal(false);
      setForm({ name: "", email: "", password: "", confirm: "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar usuário");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (u: AdminUser) => {
    try {
      await adminFetch(`/admin/users/${u.id}`, { method: "PUT", body: JSON.stringify({ active: !u.active }) });
      await load();
    } catch { /* ignore */ }
  };

  const f = (field: keyof typeof form, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <AdminLayout title="Usuários Administrativos">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => { setError(""); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Administrador
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-7 h-7 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {users.map((u) => (
                <div key={u.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${u.active ? "bg-primary/10" : "bg-slate-100"}`}>
                    <Shield className={`w-5 h-5 ${u.active ? "text-primary" : "text-slate-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${u.active ? "text-slate-800" : "text-slate-400"}`}>{u.name}</p>
                    <p className="text-xs text-slate-400 truncate">{u.email}</p>
                  </div>
                  <button
                    onClick={() => toggleActive(u)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                      u.active
                        ? "text-red-600 bg-red-50 hover:bg-red-100"
                        : "text-green-600 bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    {u.active ? <><UserX className="w-3.5 h-3.5" /> Desativar</> : <><UserCheck className="w-3.5 h-3.5" /> Ativar</>}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">Novo Administrador</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {[
                { label: "Nome completo", field: "name" as const, type: "text", placeholder: "Maria Silva" },
                { label: "E-mail", field: "email" as const, type: "email", placeholder: "admin@empresa.com" },
                { label: "Senha", field: "password" as const, type: "password", placeholder: "Mínimo 8 caracteres" },
                { label: "Confirmar senha", field: "confirm" as const, type: "password", placeholder: "Repita a senha" },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={(e) => f(field, e.target.value)}
                    required
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60">
                  {saving ? "Criando..." : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
