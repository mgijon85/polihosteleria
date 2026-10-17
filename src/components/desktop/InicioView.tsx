import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney, formatNumber } from '../../utils/formatters';
import { 
  ArrowRight, 
  Moon, 
  AlertTriangle, 
  TrendingUp, 
  Send, 
  Check, 
  X, 
  Clock, 
  ShieldAlert,
  ShoppingCart,
  MessageSquare,
  PhoneCall,
  Globe,
  Briefcase,
  Mail,
  Building
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const InicioView: React.FC = () => {
  const { 
    role, 
    orders, 
    clients, 
    decisions, 
    resolveDecision, 
    notifySalesRep, 
    setActiveTab, 
    addToast 
  } = useApp();

  // Metrics for today
  const totalOrdersToday = orders.length;
  const totalAmountToday = orders.reduce((sum, o) => sum + o.total, 0);
  const nightOrdersCount = orders.filter(o => o.isNightOrder).length;

  // Debt metrics from clients
  const totalDebt = clients.reduce((sum, c) => sum + c.currentBalance, 0);
  const overdueDebt = clients.reduce((sum, c) => sum + c.overdueBalance, 0);

  // Cooling clients (8-10 items)
  const coolingClients = clients.filter(c => c.health === 'cooling');

  // Chart data: 12 weeks sales vs last year
  const chartData = [
    { semana: 'Sem 32', esteAño: 38500, añoPasado: 34200 },
    { semana: 'Sem 33', esteAño: 41200, añoPasado: 36100 },
    { semana: 'Sem 34', esteAño: 44800, añoPasado: 39000 },
    { semana: 'Sem 35', esteAño: 42100, añoPasado: 37500 },
    { semana: 'Sem 36', esteAño: 39600, añoPasado: 36000 },
    { semana: 'Sem 37', esteAño: 43400, añoPasado: 38800 },
    { semana: 'Sem 38', esteAño: 46200, añoPasado: 40200 },
    { semana: 'Sem 39', esteAño: 45100, añoPasado: 41000 },
    { semana: 'Sem 40', esteAño: 47900, añoPasado: 42300 },
    { semana: 'Sem 41', esteAño: 49500, añoPasado: 43100 },
    { semana: 'Sem 42', esteAño: 52100, añoPasado: 44200 },
    { semana: 'Sem 43', esteAño: 54300, añoPasado: 45800 },
  ];

  // Channel breakdown counts for today
  const channelBreakdown = [
    { channel: 'portal', label: 'Portal web', icon: Globe, count: orders.filter(o => o.channel === 'portal').length, color: 'text-indigo-600 dark:text-indigo-400' },
    { channel: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, count: orders.filter(o => o.channel === 'whatsapp').length, color: 'text-emerald-600 dark:text-emerald-400' },
    { channel: 'telefono_ia', label: 'Teléfono IA', icon: PhoneCall, count: orders.filter(o => o.channel === 'telefono_ia').length, color: 'text-brand' },
    { channel: 'correo', label: 'Correo', icon: Mail, count: orders.filter(o => o.channel === 'correo').length, color: 'text-amber-600 dark:text-amber-400' },
    { channel: 'comercial', label: 'Comercial', icon: Briefcase, count: orders.filter(o => o.channel === 'comercial').length, color: 'text-purple-600 dark:text-purple-400' },
    { channel: 'oficina', label: 'Oficina', icon: Building, count: orders.filter(o => o.channel === 'oficina').length, color: 'text-neutral-600 dark:text-neutral-400' },
  ];

  const userName = role === 'direccion' ? 'Juanlu' : 'Rocío';

  return (
    <div className="max-w-[1360px] mx-auto p-6 space-y-8 animate-in fade-in">
      {/* 1. Saludo y frase con números + Acción principal */}
      <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-panel border border-[var(--line)] shadow-resting flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-brand-soft text-brand">
            <span>Buenos días, {userName}</span>
            <span className="w-1 h-1 rounded-full bg-brand" />
            <span>Jueves, 17 de octubre</span>
          </div>

          <p className="text-[19px] sm:text-[22px] font-medium leading-relaxed tracking-tight text-[var(--text)]">
            Hoy salen <strong className="text-brand font-bold tabular-nums">{totalOrdersToday} pedidos</strong> por{' '}
            <strong className="text-brand font-bold tabular-nums">{formatMoney(totalAmountToday)}</strong>;{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
              <Moon className="w-4 h-4 inline" /> {nightOrdersCount} entraron de noche
            </span>{' '}
            sin que nadie cogiera el teléfono.
            {role === 'direccion' && (
              <>
                {' '}Te deben <span className="font-bold tabular-nums">{formatMoney(totalDebt)}</span>, de los que{' '}
                <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">{formatMoney(overdueDebt)}</span> están vencidos.
              </>
            )}
          </p>
        </div>

        {/* Solo una acción principal rellena */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-control bg-brand text-white text-[15px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-elevated"
          >
            <span>Ver pedidos de hoy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Asuntos para decidir (Una línea por asunto con botones en la misma línea) */}
      {role === 'direccion' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Para decidir ahora ({decisions.length})</span>
            </h3>
            <span className="text-[12px] text-[var(--muted)]">Tu aprobación desbloquea la preparación y ruta</span>
          </div>

          {decisions.length === 0 ? (
            <div className="p-6 rounded-card border border-[var(--line)] bg-[var(--surface)] text-center text-[14px] text-[var(--muted)]">
              ✨ No hay decisiones pendientes en este momento. Todos los pedidos y compras están al día.
            </div>
          ) : (
            <div className="space-y-2">
              {decisions.map((dec) => (
                <div
                  key={dec.id}
                  className="bg-[var(--surface)] p-4 sm:px-5 sm:py-3.5 rounded-card border border-[var(--line)] shadow-resting flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--text)]">{dec.title}</div>
                      <div className="text-[13px] text-[var(--muted)] leading-snug">{dec.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => resolveDecision(dec.id, 'reject')}
                      className="px-3.5 py-1.5 rounded-control text-[13px] font-medium border border-[var(--line)] hover:bg-[var(--surface-2)] text-[var(--text)] transition-all"
                    >
                      {dec.secondaryActionLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => resolveDecision(dec.id, 'approve')}
                      className="px-4 py-1.5 rounded-control text-[13px] font-medium bg-brand text-white hover:opacity-95 active:scale-95 transition-all shadow-xs"
                    >
                      {dec.primaryActionLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Clientes que se enfrían (Alerta de fuga) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Clientes que se enfrían ({coolingClients.length})</span>
          </h3>
          <button
            type="button"
            onClick={() => setActiveTab('clientes')}
            className="text-[13px] text-brand hover:underline font-medium"
          >
            Ver todos en Clientes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {coolingClients.slice(0, 4).map((c) => (
            <div
              key={c.id}
              className="bg-[var(--surface)] p-4 rounded-card border border-[var(--line)] shadow-resting flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold truncate">{c.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold flex-shrink-0">
                    {c.daysSinceLastOrder} días sin pedir
                  </span>
                </div>
                <div className="text-[12px] text-[var(--muted)]">
                  Pedía cada {c.orderFrequencyDays} días unos {formatMoney(c.averageTicket)} · {c.salesRepName}
                </div>
              </div>

              <button
                type="button"
                onClick={() => notifySalesRep(c.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[12px] font-medium border border-brand/30 text-brand bg-brand-soft hover:bg-brand hover:text-white transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Avisar comercial</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Gráfico: Ventas últimas 12 semanas frente al año pasado + Reparto de hoy por canal */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-6">
        <div>
          <h3 className="text-[15px] font-semibold">
            ¿Cómo evolucionan las ventas frente al año anterior?
          </h3>
          <p className="text-[13px] text-[var(--muted)]">
            Comparativa semanal acumulada (últimas 12 semanas)
          </p>
        </div>

        {/* 12-week chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrentYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--brand)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
              <XAxis dataKey="semana" stroke="var(--muted)" fontSize={12} tickLine={false} />
              <YAxis 
                stroke="var(--muted)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`}
              />
              <Tooltip 
                formatter={(value: any) => [formatMoney(value), '']}
                contentStyle={{ 
                  backgroundColor: 'var(--surface)', 
                  borderColor: 'var(--line)', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="esteAño" 
                name="2026 (Este año)" 
                stroke="var(--brand)" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorCurrentYear)" 
              />
              <Area 
                type="monotone" 
                dataKey="añoPasado" 
                name="2025 (Año pasado)" 
                stroke="var(--muted)" 
                strokeWidth={1.5} 
                strokeDasharray="4 4" 
                fillOpacity={0} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Reparto de hoy por canal en una sola línea */}
        <div className="pt-4 border-t border-[var(--line)]">
          <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
            Reparto de hoy por canal de entrada ({totalOrdersToday} pedidos)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {channelBreakdown.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.channel}
                  className="p-3 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${item.color}`} />
                    <span className="text-[13px] font-medium">{item.label}</span>
                  </div>
                  <span className="text-[15px] font-bold tabular-nums text-[var(--text)]">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
