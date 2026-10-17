import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  Truck, 
  MapPin, 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  CreditCard, 
  Banknote,
  MoveUp,
  MoveDown,
  Navigation
} from 'lucide-react';

export const RepartoView: React.FC = () => {
  const { routes, reorderRouteStops, deliverStopAndCollect, addToast } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('rt-costa-o');

  const currentRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const handleMoveStop = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentRoute.stops.length) return;
    reorderRouteStops(currentRoute.id, idx, targetIdx);
  };

  const handleSimulateDelivery = (stop: any) => {
    deliverStopAndCollect(currentRoute.id, stop.id, stop.pendingAmount || 96.64, stop.paymentMethod === 'efectivo' ? 'efectivo' : 'tarjeta');
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand" />
            <span>Control de Rutas y Reparto</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)]">
            6 rutas activas en Huelva capital, Costa, Condado y Sierra
          </p>
        </div>

        {/* Global cash summary pill */}
        <div className="flex items-center gap-4 bg-[var(--surface-2)] p-3 rounded-card border border-[var(--line)] text-[13px]">
          <div>
            <div className="text-[11px] text-[var(--muted)]">Caja recaudada hoy (Todas las rutas)</div>
            <div className="font-bold text-[16px] tabular-nums text-emerald-600">
              {formatMoney(routes.reduce((s, r) => s + r.collectedCash + r.collectedCard, 0))}
            </div>
          </div>
          <div className="border-l border-[var(--line)] pl-4">
            <div className="text-[11px] text-[var(--muted)]">Pendiente de cobro</div>
            <div className="font-bold text-[16px] tabular-nums text-[var(--muted)]">
              {formatMoney(routes.reduce((s, r) => s + (r.expectedCash + r.expectedCard - (r.collectedCash + r.collectedCard)), 0))}
            </div>
          </div>
        </div>
      </div>

      {/* Routes Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((rt) => {
          const isSelected = rt.id === currentRoute.id;
          const percent = Math.round((rt.completedStops / Math.max(1, rt.totalStops)) * 100);

          return (
            <div
              key={rt.id}
              onClick={() => setSelectedRouteId(rt.id)}
              className={`p-5 rounded-panel border cursor-pointer transition-all ${
                isSelected
                  ? 'border-brand bg-[var(--surface)] shadow-elevated'
                  : 'border-[var(--line)] bg-[var(--surface)] hover:border-brand/40 shadow-resting'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--text)]">{rt.name}</h3>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">
                    {rt.driverName} · {rt.vehicle}
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-soft text-brand">
                  {rt.totalKg} kg
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[var(--muted)]">Progreso de entregas</span>
                  <span className="font-semibold tabular-nums">{rt.completedStops} / {rt.totalStops} ({percent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div
                    className="h-full bg-brand transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Cash drawer preview */}
              <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[12px]">
                <span className="text-[var(--muted)]">Cobrado / Esperado:</span>
                <span className="font-bold tabular-nums">
                  {formatMoney(rt.collectedCash + rt.collectedCard)} / {formatMoney(rt.expectedCash + rt.expectedCard)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail of selected Route: Stylized Map + Stops list + Driver Cash drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stops list with reordering (8 cols) */}
        <div className="lg:col-span-8 bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div>
              <h2 className="text-[17px] font-bold">
                Paradas de {currentRoute.name}
              </h2>
              <p className="text-[13px] text-[var(--muted)]">
                Usa las flechas para reordenar la secuencia o simular una entrega
              </p>
            </div>
            <span className="text-[12px] text-[var(--muted)] flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-4 h-4 text-brand" />
              <span>Reorganizable</span>
            </span>
          </div>

          <div className="space-y-3">
            {currentRoute.stops.length === 0 ? (
              <div className="p-8 text-center text-[13px] text-[var(--muted)]">
                No hay paradas generadas en esta ruta para hoy.
              </div>
            ) : (
              currentRoute.stops.map((stop, idx) => {
                const isDelivered = stop.status === 'entregado';

                return (
                  <div
                    key={stop.id}
                    className={`p-4 rounded-card border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDelivered
                        ? 'bg-emerald-500/[0.04] border-emerald-500/25 opacity-80'
                        : 'bg-[var(--surface-2)] border-[var(--line)]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--line)] text-[13px] font-bold flex items-center justify-center tabular-nums flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-[var(--text)]">
                            {stop.clientName}
                          </span>
                          <span className="text-[11px] text-[var(--muted)] tabular-nums">
                            ETA: {stop.eta}
                          </span>
                        </div>
                        <div className="text-[12px] text-[var(--muted)] flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          <span>{stop.address}, {stop.city}</span>
                        </div>
                        {stop.notes && (
                          <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                            Nota: {stop.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                      {/* Cobro pendiente */}
                      <div className="text-right">
                        <div className="text-[13px] font-bold tabular-nums">
                          {stop.pendingAmount > 0 ? formatMoney(stop.pendingAmount) : 'Sin cobro'}
                        </div>
                        <span className="text-[10px] uppercase font-bold text-[var(--muted)]">
                          {stop.paymentMethod}
                        </span>
                      </div>

                      {/* Reorder buttons */}
                      <div className="flex items-center border border-[var(--line)] rounded-control bg-[var(--surface)]">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveStop(idx, 'up')}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-30"
                          title="Subir parada"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentRoute.stops.length - 1}
                          onClick={() => handleMoveStop(idx, 'down')}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-30"
                          title="Bajar parada"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Simulate Delivery Button */}
                      {!isDelivered ? (
                        <button
                          type="button"
                          onClick={() => handleSimulateDelivery(stop)}
                          className="px-3.5 py-1.5 rounded-control text-[12px] font-semibold bg-emerald-600 text-white hover:opacity-95 active:scale-95 transition-all shadow-xs"
                        >
                          Entregar y cobrar
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" /> Entregado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Caja del día por repartidor + Mapa estilizado (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Caja del día por repartidor */}
          <div className="bg-[var(--surface)] p-5 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-brand" />
              <h3 className="text-[15px] font-bold">Caja del día: {currentRoute.driverName}</h3>
            </div>

            <div className="space-y-2.5 text-[13px]">
              <div className="p-3 rounded-card bg-[var(--surface-2)] flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  Efectivo cobrado:
                </span>
                <span className="font-bold tabular-nums">
                  {formatMoney(currentRoute.collectedCash)} / {formatMoney(currentRoute.expectedCash)}
                </span>
              </div>

              <div className="p-3 rounded-card bg-[var(--surface-2)] flex items-center justify-between">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <CreditCard className="w-4 h-4 text-brand" />
                  Tarjeta cobrada:
                </span>
                <span className="font-bold tabular-nums">
                  {formatMoney(currentRoute.collectedCard)} / {formatMoney(currentRoute.expectedCard)}
                </span>
              </div>

              <div className="p-3.5 rounded-card bg-brand-soft border border-brand/20 flex items-center justify-between font-bold text-[14px] text-brand">
                <span>Total recaudado hoy:</span>
                <span className="tabular-nums">
                  {formatMoney(currentRoute.collectedCash + currentRoute.collectedCard)}
                </span>
              </div>
            </div>
          </div>

          {/* Stylized Map View (No external map library, sleek points representation) */}
          <div className="bg-[var(--surface)] p-5 rounded-panel border border-[var(--line)] shadow-resting space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-brand" />
                Mapa esquemático de ruta
              </span>
              <span className="text-[11px] text-[var(--muted)]">Provincia de Huelva</span>
            </div>

            {/* Stylized schematic canvas representation */}
            <div className="h-56 rounded-card bg-[var(--surface-2)] border border-[var(--line)] relative overflow-hidden flex items-center justify-center p-4">
              {/* Subtle background grid lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0A63C9_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Ría de Huelva stylization */}
              <div className="absolute left-6 right-6 top-1/2 h-1 bg-brand/20 rounded-full" />

              {/* Points */}
              <div className="relative z-10 w-full flex justify-between items-center px-4">
                {currentRoute.stops.slice(0, 4).map((s, i) => (
                  <div key={s.id} className="flex flex-col items-center gap-1 text-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-[12px] shadow-sm ${
                      s.status === 'entregado'
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-brand border-brand text-white animate-pulse'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[11px] font-semibold truncate max-w-[70px]">
                      {s.clientName.split(' ')[0]} {s.clientName.split(' ')[1] || ''}
                    </span>
                    <span className="text-[10px] text-[var(--muted)] tabular-nums">{s.eta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
