import { useEffect, useState, useCallback } from "react";
import {
  Users,
  FileText,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  ClipboardList,
  Activity,
} from "lucide-react";
import { Link } from "wouter";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AdminLayout from "./layout";
import { adminFetch } from "@/lib/adminApi";

interface DashboardStats {
  totals: {
    leads: number;
    quotes: number;
    clients: number;
    policies: number;
    activeProducts: number;
  };
  period: { leads: number; quotes: number; clients: number; policies: number; activeProducts: number };
  previous: { leads: number; quotes: number; clients: number; policies: number; activeProducts: number };
  leadTimeseries: Array<{ date: string; count: number }>;
  quoteTimeseries: Array<{ date: string; count: number }>;
  funnel: { leads: number; quotes: number; clients: number };
  recentActivity: Array<{
    type: string;
    label: string;
    detail: string;
    createdAt: string;
  }>;
}

const PERIODS = [
  { value: "1d", label: "Hoje" },
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "3m", label: "3 meses" },
  { value: "6m", label: "6 meses" },
  { value: "12m", label: "12 meses" },
] as const;

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 100);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  const fetchStats = useCallback((p: string) => {
    setLoading(true);
    adminFetch<DashboardStats>(`/admin/stats?period=${p}`)
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStats(period);
  }, [period, fetchStats]);

  const kpis = stats
    ? [
        {
          label: "Leads",
          total: stats.totals.leads,
          periodVal: stats.period.leads,
          prevVal: stats.previous.leads,
          icon: Mail,
          color: "text-amber-600 bg-amber-50",
          href: "",
        },
        {
          label: "Cotações",
          total: stats.totals.quotes,
          periodVal: stats.period.quotes,
          prevVal: stats.previous.quotes,
          icon: ClipboardList,
          color: "text-orange-600 bg-orange-50",
          href: "",
        },
        {
          label: "Clientes",
          total: stats.totals.clients,
          periodVal: stats.period.clients,
          prevVal: stats.previous.clients,
          icon: Users,
          color: "text-blue-600 bg-blue-50",
          href: "/admin/clientes",
        },
        {
          label: "Apólices",
          total: stats.totals.policies,
          periodVal: stats.period.policies,
          prevVal: stats.previous.policies,
          icon: FileText,
          color: "text-violet-600 bg-violet-50",
          href: "/admin/apolices",
        },
        {
          label: "Produtos Ativos",
          total: stats.totals.activeProducts,
          periodVal: stats.period.activeProducts,
          prevVal: stats.previous.activeProducts,
          icon: Package,
          color: "text-emerald-600 bg-emerald-50",
          href: "/admin/produtos",
        },
      ]
    : [];

  const mergedTimeseries = stats
    ? (() => {
        const map = new Map<string, { date: string; leads: number; quotes: number }>();
        for (const r of stats.leadTimeseries) {
          const existing = map.get(r.date) || { date: r.date, leads: 0, quotes: 0 };
          existing.leads = r.count;
          map.set(r.date, existing);
        }
        for (const r of stats.quoteTimeseries) {
          const existing = map.get(r.date) || { date: r.date, leads: 0, quotes: 0 };
          existing.quotes = r.count;
          map.set(r.date, existing);
        }
        return Array.from(map.values()).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      })()
    : [];

  const funnelData = stats
    ? [
        { name: "Leads", value: stats.funnel.leads, fill: "#f59e0b" },
        { name: "Cotações", value: stats.funnel.quotes, fill: "#f97316" },
        { name: "Clientes", value: stats.funnel.clients, fill: "#3b82f6" },
      ]
    : [];

  const funnelConversions = stats
    ? {
        leadToQuote:
          stats.funnel.leads > 0
            ? Math.round((stats.funnel.quotes / stats.funnel.leads) * 100)
            : 0,
        quoteToClient:
          stats.funnel.quotes > 0
            ? Math.round((stats.funnel.clients / stats.funnel.quotes) * 100)
            : 0,
      }
    : { leadToQuote: 0, quoteToClient: 0 };

  const activityTypeConfig: Record<string, { label: string; color: string; bg: string }> = {
    lead: { label: "Lead", color: "text-amber-700", bg: "bg-amber-100" },
    quote: { label: "Cotação", color: "text-orange-700", bg: "bg-orange-100" },
    client: { label: "Cliente", color: "text-blue-700", bg: "bg-blue-100" },
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Period selector */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Visão geral
        </h2>
        <div className="flex rounded-xl bg-slate-100 p-1 gap-0.5">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                period === p.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map(({ label, total, periodVal, prevVal, icon: Icon, color, href }) => {
              const change = periodVal != null && prevVal != null ? pctChange(periodVal, prevVal) : null;
              const inner = (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group h-full">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {href && (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-slate-900">{total}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                  {change !== null && (
                    <div className="mt-2 flex items-center gap-1">
                      {change >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          change >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {change >= 0 ? "+" : ""}
                        {change}%
                      </span>
                      <span className="text-xs text-slate-400">vs anterior</span>
                    </div>
                  )}
                </div>
              );
              if (href) {
                return (
                  <Link key={label} href={href} className="block h-full">
                    {inner}
                  </Link>
                );
              }
              return <div key={label}>{inner}</div>;
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leads + Quotes area chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Leads e Cotações no período
              </h3>
              {mergedTimeseries.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                  Sem dados para o período selecionado.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={mergedTimeseries}>
                    <defs>
                      <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradQuotes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      labelFormatter={(v) => formatDate(v as string)}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        fontSize: "13px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      name="Leads"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fill="url(#gradLeads)"
                    />
                    <Area
                      type="monotone"
                      dataKey="quotes"
                      name="Cotações"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#gradQuotes)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Funnel chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Funil de Conversão</h3>
              {funnelData.every((d) => d.value === 0) ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                  Sem dados para o período.
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={funnelData} layout="vertical" barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "#475569" }}
                        axisLine={false}
                        tickLine={false}
                        width={70}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                        }}
                      />
                      <Bar dataKey="value" name="Quantidade" radius={[0, 6, 6, 0]}>
                        {funnelData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Lead → Cotação</span>
                      <span className="font-semibold text-slate-800">
                        {funnelConversions.leadToQuote}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(funnelConversions.leadToQuote, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm mt-3">
                      <span className="text-slate-500">Cotação → Cliente</span>
                      <span className="font-semibold text-slate-800">
                        {funnelConversions.quoteToClient}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(funnelConversions.quoteToClient, 100)}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Atividade Recente</h2>
            </div>
            {!stats?.recentActivity?.length ? (
              <div className="px-5 py-10 text-center text-slate-400 text-sm">
                Nenhuma atividade registrada ainda.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.recentActivity.map((a, i) => {
                  const cfg = activityTypeConfig[a.type] || {
                    label: a.type,
                    color: "text-slate-700",
                    bg: "bg-slate-100",
                  };
                  return (
                    <div
                      key={i}
                      className="px-5 py-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.bg} ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {a.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">{a.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">
                        {formatDateTime(a.createdAt)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
