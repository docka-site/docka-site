import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ShieldCheck,
  FileText,
  User,
  LogOut,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Building2,
  Phone,
  Mail,
  Hash,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  portalFetch,
  clearClientToken,
  getClientToken,
  setClientToken,
} from "@/lib/portalApi";

// ── Types ────────────────────────────────────────────────────────────────────

interface Policyholder {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  status: "ativo" | "inativo";
  notes: string | null;
}

interface Apolice {
  id: number;
  policyNumber: string | null;
  status: "ativa" | "vencida" | "cancelada" | "pendente";
  startDate: string | null;
  endDate: string | null;
  fileUrl: string | null;
  fileName: string | null;
  productName: string | null;
  productCategory: string | null;
}

interface ClientMe {
  email: string;
  hasPassword: boolean;
  hasGoogle: boolean;
  policyholder: Policyholder | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(status: Apolice["status"]) {
  const map = {
    ativa: { label: "Ativa", cls: "bg-green-500/15 text-green-400 border-green-500/20", Icon: CheckCircle2 },
    pendente: { label: "Pendente", cls: "bg-amber-500/15 text-amber-400 border-amber-500/20", Icon: Clock },
    vencida: { label: "Vencida", cls: "bg-slate-500/15 text-slate-400 border-slate-500/20", Icon: AlertCircle },
    cancelada: { label: "Cancelada", cls: "bg-red-500/15 text-red-400 border-red-500/20", Icon: XCircle },
  };
  const { label, cls, Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function fmtDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR");
}

// ── Component ─────────────────────────────────────────────────────────────────

type ActiveTab = "apolices" | "perfil" | "seguranca";

export default function PortalDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("apolices");
  const [me, setMe] = useState<ClientMe | null>(null);
  const [apolices, setApolices] = useState<Apolice[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Password set state
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setClientToken(token);
      window.history.replaceState({}, "", "/portal/dashboard");
    }
    if (!getClientToken()) {
      setLocation("/portal");
    }
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [meData, apData] = await Promise.all([
          portalFetch<ClientMe>("/portal/me"),
          portalFetch<{ apolices: Apolice[] }>("/portal/apolices"),
        ]);
        setMe(meData);
        setApolices(apData.apolices);
      } catch {
        // Already redirects to /portal if 401
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleLogout = async () => {
    try {
      await portalFetch("/portal/auth/logout", { method: "POST" });
    } catch {}
    clearClientToken();
    setLocation("/portal");
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);
    if (newPw.length < 8) { setPwError("Senha deve ter no mínimo 8 caracteres."); return; }
    if (newPw !== confirmPw) { setPwError("As senhas não coincidem."); return; }
    setPwLoading(true);
    try {
      await portalFetch("/portal/auth/password/set", {
        method: "POST",
        body: JSON.stringify({ password: newPw }),
      });
      setPwSuccess(true);
      setNewPw("");
      setConfirmPw("");
      setMe((prev) => prev ? { ...prev, hasPassword: true } : prev);
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Erro ao definir senha");
    } finally {
      setPwLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const ph = me?.policyholder;
  const displayName = ph?.name ?? me?.email ?? "Cliente";
  const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center group">
            <img
              src={`${import.meta.env.BASE_URL}images/docka-logo-h.png`}
              alt="Docka Seguros"
              className="h-8 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </a>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 hover:bg-white/5 rounded-xl px-3 py-2 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
              <span className="text-sm font-medium hidden sm:block max-w-[160px] truncate">{displayName}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs text-slate-400">Logado como</p>
                  <p className="text-sm font-medium truncate">{me?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Olá, {ph?.name?.split(" ")[0] ?? "bem-vindo"}!</h1>
          <p className="text-slate-400 mt-1">
            {ph
              ? `${ph.name} · CNPJ ${ph.cnpj}`
              : "Gerencie suas apólices e documentos."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Apólices", value: apolices.length, icon: FileText, color: "text-blue-400" },
            { label: "Ativas", value: apolices.filter((a) => a.status === "ativa").length, icon: CheckCircle2, color: "text-green-400" },
            { label: "Vencidas", value: apolices.filter((a) => a.status === "vencida").length, icon: Clock, color: "text-amber-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <Icon className={`w-5 h-5 mb-2 ${color}`} />
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6 w-fit">
          {([
            { key: "apolices", label: "Apólices", icon: FileText },
            { key: "perfil", label: "Perfil", icon: User },
            { key: "seguranca", label: "Segurança", icon: Lock },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Apólices Tab ── */}
        {activeTab === "apolices" && (
          <div className="space-y-4">
            {apolices.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Nenhuma apólice encontrada</p>
                <p className="text-slate-500 text-sm mt-1">
                  Suas apólices aparecerão aqui assim que forem cadastradas.
                </p>
              </div>
            ) : (
              apolices.map((ap) => (
                <div
                  key={ap.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold text-white">
                          {ap.policyNumber ?? `Apólice #${ap.id}`}
                        </span>
                        {statusBadge(ap.status)}
                      </div>
                      {ap.productName && (
                        <p className="text-slate-400 text-sm mb-3">
                          {ap.productName}
                          {ap.productCategory && (
                            <span className="text-slate-500"> · {ap.productCategory}</span>
                          )}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        {ap.startDate && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Início: {fmtDate(ap.startDate)}
                          </span>
                        )}
                        {ap.endDate && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Vencimento: {fmtDate(ap.endDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    {ap.fileUrl && (
                      <a
                        href={ap.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {ap.fileName ?? "Ver documento"}
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Perfil Tab ── */}
        {activeTab === "perfil" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            {!ph ? (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Perfil ainda não cadastrado</p>
                <p className="text-slate-500 text-sm mt-1">
                  Entre em contato com a Amparo para vincular seus dados à conta.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="font-semibold text-lg">Dados cadastrais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: User, label: "Nome completo", value: ph.name },
                    { icon: Mail, label: "E-mail", value: ph.email },
                    { icon: Phone, label: "Telefone", value: ph.phone },
                    { icon: Hash, label: "CNPJ", value: ph.cnpj },
                    {
                      icon: CheckCircle2,
                      label: "Status",
                      value: ph.status === "ativo" ? "Ativo" : "Inativo",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                      <Icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                        <p className="text-sm font-medium truncate">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {ph.notes && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Observações</p>
                    <p className="text-sm text-slate-300">{ph.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Segurança Tab ── */}
        {activeTab === "seguranca" && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-1">
                {me?.hasPassword ? "Alterar senha" : "Criar senha de acesso"}
              </h2>
              <p className="text-slate-400 text-sm mb-5">
                {me?.hasPassword
                  ? "Redefina sua senha de acesso ao portal."
                  : "Crie uma senha para acessar o portal."}
              </p>
              <form onSubmit={handleSetPassword} className="space-y-4">
                {pwSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Senha definida com sucesso!
                  </div>
                )}
                {pwError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {pwError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Nova senha</label>
                  <div className="relative">
                    <input
                      type={showNewPw ? "text" : "password"}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirmar senha</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={pwLoading}
                  className="py-2.5 px-5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pwLoading ? "Salvando..." : me?.hasPassword ? "Alterar senha" : "Criar senha"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Click outside to close menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}
