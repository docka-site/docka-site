import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, AlertCircle, ChevronDown, KeyRound, Copy, Check, Eye, EyeOff } from "lucide-react";
import AdminLayout from "./layout";
import { adminFetch } from "@/lib/adminApi";
import { PhoneInput } from "@/components/phone-input";
import { CnpjInput, validateCnpj } from "@/components/cnpj-input";

interface Policyholder {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  status: "ativo" | "inativo";
  notes?: string;
  createdAt: string;
}

const emptyForm = { name: "", email: "", phone: "", cnpj: "", status: "ativo" as "ativo" | "inativo", notes: "" };

interface TempPasswordModal {
  email: string;
  password: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  cnpj?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: typeof emptyForm): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = "Nome completo \u00e9 obrigat\u00f3rio";
  }

  if (!form.email.trim()) {
    errors.email = "E-mail \u00e9 obrigat\u00f3rio";
  } else if (!validateEmail(form.email)) {
    errors.email = "E-mail inv\u00e1lido";
  }

  if (!form.phone.trim()) {
    errors.phone = "Telefone \u00e9 obrigat\u00f3rio";
  } else if (form.phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Informe um n\u00famero de telefone v\u00e1lido";
  }

  if (!form.cnpj.trim()) {
    errors.cnpj = "CNPJ \u00e9 obrigat\u00f3rio";
  } else if (form.cnpj.replace(/\D/g, "").length !== 14) {
    errors.cnpj = "Informe o CNPJ completo";
  } else if (!validateCnpj(form.cnpj)) {
    errors.cnpj = "CNPJ inv\u00e1lido \u2014 verifique os d\u00edgitos e tente novamente";
  }

  return errors;
}

export default function AdminClientes() {
  const [clients, setClients] = useState<Policyholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Policyholder | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [deleting, setDeleting] = useState<number | null>(null);
  const [generatingPw, setGeneratingPw] = useState<number | null>(null);
  const [tempPwModal, setTempPwModal] = useState<TempPasswordModal | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTempPw, setShowTempPw] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminFetch<{ policyholders: Policyholder[] }>("/admin/policyholders");
      setClients(data.policyholders);
    } catch { /* handled by adminFetch */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setError("");
    setFieldErrors({});
    setShowModal(true);
  };

  const openEdit = (c: Policyholder) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, cnpj: c.cnpj, status: c.status, notes: c.notes || "" });
    setError("");
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    setError("");
    try {
      if (editing) {
        await adminFetch(`/admin/policyholders/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
        setShowModal(false);
        await load();
      } else {
        const data = await adminFetch<{ policyholder: Policyholder }>("/admin/policyholders", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setShowModal(false);
        await load();
        await handleGenerateTempPassword(data.policyholder.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    setDeleting(id);
    try {
      await adminFetch(`/admin/policyholders/${id}`, { method: "DELETE" });
      await load();
    } catch { /* ignore */ }
    setDeleting(null);
  };

  const handleGenerateTempPassword = async (id: number) => {
    setGeneratingPw(id);
    try {
      const data = await adminFetch<{ password: string; email: string }>(
        `/admin/policyholders/${id}/set-temp-password`,
        { method: "POST" }
      );
      setCopied(false);
      setShowTempPw(false);
      setTempPwModal({ email: data.email, password: data.password });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao gerar senha");
    } finally {
      setGeneratingPw(null);
    }
  };

  const handleCopy = async () => {
    if (!tempPwModal) return;
    await navigator.clipboard.writeText(tempPwModal.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = clients.filter((c) =>
    [c.name, c.email, c.cnpj, c.phone].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const f = (field: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors((prev) => { const n = { ...prev }; delete n[field as keyof FieldErrors]; return n; });
    }
  };

  const inputCls = (field: keyof FieldErrors) =>
    `w-full px-4 py-2.5 rounded-xl border ${
      fieldErrors[field] ? "border-red-300 focus:ring-red-200 focus:border-red-400" : "border-slate-200 focus:ring-primary/15 focus:border-primary"
    } focus:outline-none focus:ring-4 text-sm transition-all`;

  return (
    <AdminLayout title="Clientes">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail ou CNPJ..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary"
            />
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-7 h-7 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              {search ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                    <th className="px-5 py-3 font-semibold">Nome</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">E-mail</th>
                    <th className="px-5 py-3 font-semibold hidden lg:table-cell">CNPJ</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold text-right">A\u00e7\u00f5es</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400 md:hidden">{c.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">{c.email}</td>
                      <td className="px-5 py-3.5 text-slate-500 font-mono text-xs hidden lg:table-cell">{c.cnpj}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          c.status === "ativo" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                        }`}>
                          {c.status === "ativo" ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleGenerateTempPassword(c.id)}
                            disabled={generatingPw === c.id}
                            title="Gerar / resetar senha de acesso"
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all disabled:opacity-40"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>
                          <button onClick={() => openEdit(c)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            disabled={deleting === c.id}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">
                {editing ? "Editar Cliente" : "Novo Cliente"}
              </h2>
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

              {!editing && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                  <KeyRound className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Ao salvar, uma <strong>senha de acesso</strong> ser\u00e1 gerada automaticamente para o portal do cliente.</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome completo / Raz\u00e3o social *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  placeholder="Empresa Ltda"
                  className={inputCls("name")}
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => f("email", e.target.value)}
                  placeholder="contato@empresa.com"
                  className={inputCls("email")}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefone *</label>
                <PhoneInput
                  value={form.phone}
                  onChange={(val) => f("phone", val)}
                  initialValue={editing?.phone}
                  className={`flex w-full rounded-xl border bg-white hover:border-slate-300 focus-within:ring-4 transition-all duration-200 ${
                    fieldErrors.phone
                      ? "border-red-300 focus-within:ring-red-200 focus-within:border-red-400"
                      : "border-slate-200 focus-within:ring-primary/15 focus-within:border-primary"
                  }`}
                />
                {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">CNPJ *</label>
                <CnpjInput
                  value={form.cnpj}
                  onChange={(val) => f("cnpj", val)}
                  className={inputCls("cnpj")}
                />
                {fieldErrors.cnpj && <p className="mt-1 text-xs text-red-500">{fieldErrors.cnpj}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) => f("status", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Observa\u00e7\u00f5es</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => f("notes", e.target.value)}
                  rows={3}
                  placeholder="Anota\u00e7\u00f5es internas sobre o cliente..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {tempPwModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-slate-900">Senha de Acesso Gerada</h2>
              </div>
              <button onClick={() => setTempPwModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                Compartilhe estas credenciais com o cliente para acesso ao portal.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label>
                <p className="text-sm font-medium text-slate-800 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200">
                  {tempPwModal.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Senha de acesso</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200 font-mono text-sm">
                    {showTempPw ? tempPwModal.password : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                  </div>
                  <button
                    onClick={() => setShowTempPw(!showTempPw)}
                    className="p-2.5 text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                    title={showTempPw ? "Ocultar" : "Mostrar"}
                  >
                    {showTempPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`p-2.5 border rounded-lg transition-colors ${
                      copied
                        ? "text-green-600 bg-green-50 border-green-200"
                        : "text-slate-400 hover:text-slate-700 bg-slate-50 border-slate-200"
                    }`}
                    title="Copiar senha"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setTempPwModal(null)}
                className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all"
              >
                Feito
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
