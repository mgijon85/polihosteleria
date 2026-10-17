import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SALES_REPS } from '../../data/mockData';
import { formatMoney, formatPercent } from '../../utils/formatters';
import { 
  Briefcase, 
  Target, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  Sparkles,
  Phone
} from 'lucide-react';

export const ComercialesView: React.FC = () => {
  const { addToast } = useApp();

  const [pendingDiscounts, setPendingDiscounts] = useState([
    { id: 'disc-1', rep: 'Antonio Gómez', client: 'Hotel Marisma & Spa', family: 'Desechables y envases', proposedDiscount: 8, baseDiscount: 0, orderVolume: 1450, reason: 'Volumen alto comuniones octubre' },
    { id: 'disc-2', rep: 'Marta Benítez', client: 'Chiringuito El Faro', family: 'Cristalería de caña', proposedDiscount: 10, baseDiscount: 5, orderVolume: 620, reason: 'Compromiso de compra anual exclusiva' },
  ]);

  const weeklySchedule = [
    { day: 'Lunes', rep: 'Antonio Gómez', visits: ['Bar La Ribera (Punta Umbría)', 'Chiringuito El Ancla (Punta Umbría)', 'Hostal Las Palmeras (El Portil)'], objective: 'Ofrecer promo bobinas kraft y cierre de temporada' },
    { day: 'Martes', rep: 'Marta Benítez', visits: ['Marisquería El Puerto (Huelva)', 'Restaurante Azabache (Huelva)'], objective: 'Reposición copas Burdeos y vajilla de diseño' },
    { day: 'Miércoles', rep: 'Carlos Prieto', visits: ['Venta El Cruce (Bollullos)', 'Bodegón El Rocío (Almonte)'], objective: 'Recuperar cliente enfriado y cobrar factura vencida' },
    { day: 'Jueves', rep: 'Laura Méndez', visits: ['Mesón El Rincón (Aracena)', 'Restaurante Sierra Real (Cortegana)'], objective: 'Presentación carta de invierno y estufas de terraza' },
  ];

  const handleApproveDiscount = (id: string, approve: boolean) => {
    setPendingDiscounts(prev => prev.filter(d => d.id !== id));
    addToast({
      type: approve ? 'ok' : 'warn',
      title: approve ? 'Precio especial aprobado' : 'Precio especial rechazado',
      message: approve ? 'El comercial y el cliente han recibido la confirmación automática.' : 'Se ha notificado al comercial para que renegocie.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-brand" />
          <span>Gestión de Comerciales en Calle</span>
        </h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          Objetivos mensuales, visitas registradas, cartera y validación de precios especiales
        </p>
      </div>

      {/* Reps Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SALES_REPS.map((rep) => {
          const percent = Math.round((rep.monthlySales / rep.monthlyTarget) * 100);

          return (
            <div key={rep.id} className="p-5 rounded-panel border border-[var(--line)] bg-[var(--surface)] shadow-resting space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--text)]">{rep.name}</h3>
                  <div className="text-[12px] text-[var(--muted)] flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" />
                    <span>{rep.phone}</span>
                  </div>
                </div>
                <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${percent >= 100 ? 'bg-emerald-500/15 text-emerald-600' : 'bg-brand-soft text-brand'}`}>
                  {percent}% objetivo
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--muted)]">Ventas del mes</span>
                  <span className="font-bold tabular-nums">{formatMoney(rep.monthlySales)} / {formatMoney(rep.monthlyTarget)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${percent >= 100 ? 'bg-emerald-500' : 'bg-brand'}`} style={{ width: `${Math.min(100, percent)}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[var(--line)] text-center">
                <div className="p-2 rounded-card bg-[var(--surface-2)]">
                  <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Visitas hechas</div>
                  <div className="text-[15px] font-bold tabular-nums text-[var(--text)]">{rep.visitsDone}</div>
                </div>
                <div className="p-2 rounded-card bg-[var(--surface-2)]">
                  <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Nuevos clientes</div>
                  <div className="text-[15px] font-bold tabular-nums text-brand">+{rep.newClients}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Special Prices Approval */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-[16px] font-bold">Precios especiales pendientes de aprobación ({pendingDiscounts.length})</h2>
          </div>
          <span className="text-[12px] text-[var(--muted)]">Solo Dirección puede autorizar tarifas por debajo del margen estándar</span>
        </div>

        {pendingDiscounts.length === 0 ? (
          <div className="p-6 text-center text-[13px] text-[var(--muted)]">
            No hay solicitudes de descuento pendientes en este momento.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDiscounts.map((d) => (
              <div key={d.id} className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[var(--text)]">{d.client}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-soft text-brand font-semibold">{d.family}</span>
                  </div>
                  <div className="text-[12px] text-[var(--muted)]">
                    Solicita comercial: <strong>{d.rep}</strong> · Descuento propuesto: <strong className="text-amber-600">{d.proposedDiscount}%</strong> (Tarifa normal: {d.baseDiscount}%)
                  </div>
                  <div className="text-[11px] text-[var(--muted)] italic">
                    Motivo indicado: «{d.reason}» (Volumen previsto: {formatMoney(d.orderVolume)})
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApproveDiscount(d.id, false)}
                    className="px-3 py-1.5 rounded-control text-[12px] font-medium border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors"
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproveDiscount(d.id, true)}
                    className="px-4 py-1.5 rounded-control text-[12px] font-semibold bg-brand text-white hover:opacity-95 transition-all shadow-xs"
                  >
                    Aprobar {d.proposedDiscount}%
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Schedule of Visits */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--line)]">
          <Calendar className="w-4 h-4 text-brand" />
          <h2 className="text-[16px] font-bold">Agenda de visitas de la semana</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklySchedule.map((s, idx) => (
            <div key={idx} className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[var(--text)]">{s.day}</span>
                <span className="text-[11px] font-semibold text-brand">{s.rep.split(' ')[0]}</span>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] text-[var(--muted)] uppercase font-semibold">Clientes a visitar:</div>
                {s.visits.map((v, vIdx) => (
                  <div key={vIdx} className="text-[12px] font-medium p-1.5 rounded-control bg-[var(--surface)] border border-[var(--line)] truncate">
                    {v}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--line)]">
                <strong>Objetivo:</strong> {s.objective}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
