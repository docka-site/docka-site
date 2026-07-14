import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, AlertCircle, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";
import AdminLayout from "./layout";
import { adminFetch } from "@/lib/adminApi";

interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  active: boolean;
  createdAt: string;
}

const emptyForm = { name: "", description: "", category: "" };

export default function AdminProdutos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categories = ["RC Profissional", "RC Geral", "D&O", "E&O", "RC Empregador", "RC Produtos", "Outro"];

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminFetch<{ products: Product[] }>("/admin/products");
      setProducts(data.products);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setError("");
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || "", category: p.category || "" });
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await adminFetch(`/admin/products/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await adminFetch("/admin/products", { method: "POST", body: JSON.stringify(form) });
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (p: Product) => {
    try {
      await adminFetch(`/admin/products/${p.id}`, {
        method: "PUT",
        body: JSON.stringify({ active: !p.active }),
      });
      await load();
    } catch { /* ignore */ }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir este produto? Apólices associadas não serão afetadas.")) return;
    try {
      await adminFetch(`/admin/products/${id}`, { method: "DELETE" });
      await load();
    } catch { /* ignore */ }
  };

  const f = (field: keyof typeof form, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <AdminLayout title="Produtos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500">{products.filter((p) => p.active).length} produtos ativos</p>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-7 h-7 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              Nenhum produto cadastrado.{" "}
              <button onClick={openNew} className="text-primary font-medium hover:underline">Adicionar produto</button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {products.map((p) => (
                <div key={p.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-medium text-sm ${!p.active ? "text-slate-400 line-through" : "text-slate-800"}`}>
                        {p.name}
                      </p>
                      {p.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {p.category}
                        </span>
                      )}
                      {!p.active && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">
                          Inativo
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{p.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`p-1.5 rounded-lg transition-all ${
                        p.active ? "text-primary hover:bg-primary/10" : "text-slate-400 hover:bg-slate-100"
                      }`}
                      title={p.active ? "Desativar" : "Ativar"}
                    >
                      {p.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
              <h2 className="text-lg font-semibold text-slate-900">
                {editing ? "Editar Produto" : "Novo Produto"}
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome do Produto *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  required
                  placeholder="RC Profissional"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoria</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => f("category", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
                <textarea
                  value={form.description}
                  onChange={(e) => f("description", e.target.value)}
                  rows={3}
                  placeholder="Descreva as coberturas e características do produto..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60">
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
