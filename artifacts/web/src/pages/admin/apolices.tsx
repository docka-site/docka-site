import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, AlertCircle, ExternalLink, ChevronDown, Search, Upload, FileText, Loader2 } from "lucide-react";
import AdminLayout from "./layout";
import { adminFetch } from "@/lib/adminApi";

interface Policy {
  id: number;
  policyNumber?: string;
  fileName?: string;
  fileUrl?: string;
  status: "ativa" | "vencida" | "cancelada" | "pendente";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  policyholderId: number;
  productId?: number;
  policyholderName?: string;
  productName?: string;
}

interface Policyholder { id: number; name: string; }
interface Product { id: number; name: string; }

const emptyForm = {
  policyholderId: "" as string | number,
  productId: "" as string | number,
  policyNumber: "",
  fileUrl: "",
  fileName: "",
  status: "ativa" as Policy["status"],
  startDate: "",
  endDate: "",
};

const statusLabel: Record<string, string> = { ativa: "Ativa", vencida: "Vencida", cancelada: "Cancelada", pendente: "Pendente" };
const statusClass: Record<string, string> = {
  ativa: "bg-green-100 text-green-700",
  vencida: "bg-amber-100 text-amber-700",
  cancelada: "bg-red-100 text-red-700",
  pendente: "bg-blue-100 text-blue-700",
};

async function uploadFile(file: File): Promise<{ objectPath: string }> {
  const res = await fetch("/api/storage/uploads/request-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      size: file.size,
      contentType: file.type,
    }),
  });
  if (!res.ok) throw new Error("Falha ao solicitar URL de upload");
  const { uploadURL, objectPath } = await res.json();

  const putRes = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!putRes.ok) throw new Error("Falha ao enviar arquivo");

  return { objectPath };
}

export default function AdminApolices() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policyholders, setPolicyholders] = useState<Policyholder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Policy | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [polData, phData, prData] = await Promise.all([
        adminFetch<{ policies: Policy[] }>("/admin/policies"),
        adminFetch<{ policyholders: Policyholder[] }>("/admin/policyholders"),
        adminFetch<{ products: Product[] }>("/admin/products"),
      ]);
      setPolicies(polData.policies);
      setPolicyholders(phData.policyholders);
      setProducts(prData.products);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setError("");
    setUploadedFileName("");
    setShowModal(true);
  };

  const openEdit = (p: Policy) => {
    setEditing(p);
    setForm({
      policyholderId: p.policyholderId,
      productId: p.productId || "",
      policyNumber: p.policyNumber || "",
      fileUrl: p.fileUrl || "",
      fileName: p.fileName || "",
      status: p.status,
      startDate: p.startDate || "",
      endDate: p.endDate || "",
    });
    setUploadedFileName(p.fileName || "");
    setError("");
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Apenas arquivos PDF são permitidos");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Arquivo deve ter no máximo 20MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const { objectPath } = await uploadFile(file);
      const fileUrl = `/api/storage${objectPath}`;
      setForm((prev) => ({ ...prev, fileUrl, fileName: file.name }));
      setUploadedFileName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar arquivo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      policyholderId: Number(form.policyholderId),
      productId: form.productId ? Number(form.productId) : undefined,
    };
    try {
      if (editing) {
        await adminFetch(`/admin/policies/${editing.id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await adminFetch("/admin/policies", { method: "POST", body: JSON.stringify(payload) });
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir esta apólice?")) return;
    try {
      await adminFetch(`/admin/policies/${id}`, { method: "DELETE" });
      await load();
    } catch { /* ignore */ }
  };

  const f = (field: keyof typeof form, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const filtered = policies.filter((p) =>
    [p.policyholderName, p.productName, p.policyNumber].some(
      (v) => v && v.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <AdminLayout title="Apólices">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente, produto ou número..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary"
            />
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nova Apólice
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-7 h-7 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              {search ? "Nenhuma apólice encontrada." : "Nenhuma apólice cadastrada."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                    <th className="px-5 py-3 font-semibold">Cliente</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Produto</th>
                    <th className="px-5 py-3 font-semibold hidden lg:table-cell">Número</th>
                    <th className="px-5 py-3 font-semibold hidden lg:table-cell">Vigência</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Arquivo</th>
                    <th className="px-5 py-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-800">{p.policyholderName || "—"}</p>
                        <p className="text-xs text-slate-400 md:hidden">{p.productName || "—"}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">{p.productName || "—"}</td>
                      <td className="px-5 py-3.5 font-mono text-xs text-slate-500 hidden lg:table-cell">{p.policyNumber || "—"}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 hidden lg:table-cell whitespace-nowrap">
                        {p.startDate && p.endDate
                          ? `${p.startDate} → ${p.endDate}`
                          : p.startDate || "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass[p.status]}`}>
                          {statusLabel[p.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        {p.fileUrl ? (
                          <a
                            href={p.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            {p.fileName || "PDF"}
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
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
                {editing ? "Editar Apólice" : "Nova Apólice"}
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Cliente *</label>
                <div className="relative">
                  <select
                    value={form.policyholderId}
                    onChange={(e) => f("policyholderId", e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  >
                    <option value="">Selecione o cliente</option>
                    {policyholders.map((ph) => <option key={ph.id} value={ph.id}>{ph.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Produto</label>
                <div className="relative">
                  <select
                    value={form.productId}
                    onChange={(e) => f("productId", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  >
                    <option value="">Selecione o produto</option>
                    {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Número da Apólice</label>
                <input
                  type="text"
                  value={form.policyNumber}
                  onChange={(e) => f("policyNumber", e.target.value)}
                  placeholder="APL-2025-0001"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) => f("status", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  >
                    {Object.entries(statusLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Início de Vigência</label>
                  <input type="date" value={form.startDate} onChange={(e) => f("startDate", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Fim de Vigência</label>
                  <input type="date" value={form.endDate} onChange={(e) => f("endDate", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Arquivo da Apólice (PDF)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {uploadedFileName || form.fileUrl ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{uploadedFileName || form.fileName || "Arquivo anexado"}</p>
                      {form.fileUrl && (
                        <a href={form.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Visualizar
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-all disabled:opacity-50"
                    >
                      {uploading ? (
                        <span className="flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> Enviando...</span>
                      ) : "Trocar"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-50"
                  >
                    {uploading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Enviando arquivo...</>
                    ) : (
                      <><Upload className="w-5 h-5" /> Clique para enviar PDF (máx. 20MB)</>
                    )}
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button type="submit" disabled={saving || uploading} className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60">
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
