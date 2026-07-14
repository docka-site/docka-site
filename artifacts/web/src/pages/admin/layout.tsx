import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  UserCog,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { adminFetch, clearAdminToken, getAdminToken } from "@/lib/adminApi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/apolices", label: "Apólices", icon: FileText },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/usuarios", label: "Usuários", icon: UserCog },
];

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [adminName, setAdminName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) { setLocation("/admin/login"); return; }
    adminFetch<{ admin: { name: string } }>("/admin/me")
      .then((d) => setAdminName(d.admin.name))
      .catch(() => { clearAdminToken(); setLocation("/admin/login"); });
  }, []);

  const handleLogout = async () => {
    try { await adminFetch("/admin/logout", { method: "POST" }); } catch { /* ignore */ }
    clearAdminToken();
    setLocation("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? location === href : location.startsWith(href);

  const Sidebar = () => (
    <aside className="flex flex-col w-64 bg-slate-900 text-white h-full">
      <div className="px-5 py-5 border-b border-slate-800">
        <img
          src={`${import.meta.env.BASE_URL}images/docka-logo-h.png`}
          alt="Docka Seguros"
          className="h-8 w-auto brightness-0 invert opacity-90"
        />
        <span className="block text-[10px] text-slate-400 uppercase tracking-widest mt-1">Admin</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              isActive(href, exact)
                ? "bg-primary text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            {label}
            {isActive(href, exact) && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs text-slate-400">Conectado como</p>
          <p className="text-sm font-medium text-white truncate">{adminName || "..."}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4.5 h-4.5" />
          Sair
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
