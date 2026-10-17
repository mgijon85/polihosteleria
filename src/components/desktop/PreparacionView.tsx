import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  Boxes, 
  Check, 
  Printer, 
  AlertTriangle, 
  Truck, 
  Package, 
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const PreparacionView: React.FC = () => {
  const { orders, updateOrderStatus, addToast } = useApp();

  const [selectedRoute, setSelectedRoute] = useState<string>('Costa oeste');
  const [activeOrderId, setActiveOrderId] = useState<string>('ord-101');
  const [missingModalLine, setMissingModalLine] = useState<any | null>(null);
  const [substituteChoice, setSubstituteChoice] = useState<string>('');
  const [labelPrintedOrderId, setLabelPrintedOrderId] = useState<string | null>(null);

  // Orders needing preparation or in preparation
  const routeOrders = orders.filter(o => 
    o.routeName.toLowerCase().includes(selectedRoute.toLowerCase()) &&
    (o.status === 'confirmado' || o.status === 'en_preparacion' || o.status === 'preparado')
  );

  const currentOrder = routeOrders.find(o => o.id === activeOrderId) || routeOrders[0] || orders[0];

  const [pickedLines, setPickedLines] = useState<Record<string, boolean>>({});

  const toggleLinePicked = (lineId: string) => {
    setPickedLines(prev => ({
      ...prev,
      [lineId]: !prev[lineId]
    }));
  };

  const handleReportMissing = (line: any) => {
    setMissingModalLine(line);
    setSubstituteChoice(line.substituteName || 'Servilleta 2 capas 40x40');
  };

  const confirmSubstitute = () => {
    if (!missingModalLine) return;
    addToast({
      type: 'warn',
      title: 'Falta notificada y sustituto asignado',
      message: `Se ha avisado por WhatsApp a ${currentOrder.clientName} proponiendo el sustituto.`,
    });
    setMissingModalLine(null);
  };

  const handlePrintLabel = (orderId: string) => {
    setLabelPrintedOrderId(orderId);
    updateOrderStatus(orderId, 'preparado');
    addToast({
      type: 'ok',
      title: 'Etiqueta térmica generada',
      message: `Imprimiendo etiqueta de ${currentOrder.packagesCount || 3} bultos para ruta ${selectedRoute}. Pedido marcado como PREPARADO.`,
    });
    setTimeout(() => {
      setLabelPrintedOrderId(null);
    }, 2500);
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Route Selector Tabs (Tablet-friendly buttons) */}
      <div className="bg-[var(--surface)] p-4 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <Boxes className="w-5 h-5 text-brand" />
            <span>Preparación de pedidos (Picking de almacén)</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)]">
            Ordenado por pasillo, estantería y hueco para carga eficiente de furgonetas
          </p>
        </div>

        {/* Route picker */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['Costa oeste', 'Huelva centro', 'Huelva norte', 'Costa este', 'Condado', 'Sierra'].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setSelectedRoute(r);
                const first = orders.find(o => o.routeName.includes(r));
                if (first) setActiveOrderId(first.id);
              }}
              className={`min-h-[44px] px-4 py-2 rounded-control text-[13px] font-semibold whitespace-nowrap transition-all ${
                selectedRoute === r
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-[var(--surface-2)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main split: Order queue (left) and Picking list (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Orders in loading order (4 cols) */}
        <div className="lg:col-span-4 bg-[var(--surface)] p-4 rounded-panel border border-[var(--line)] shadow-resting space-y-3">
          <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex justify-between">
            <span>Orden de carga ({routeOrders.length} pedidos)</span>
            <span>Ruta {selectedRoute}</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {routeOrders.map((ord, idx) => {
              const isSelected = ord.id === currentOrder?.id;
              const isDone = ord.status === 'preparado';

              return (
                <div
                  key={ord.id}
                  onClick={() => setActiveOrderId(ord.id)}
                  className={`p-3.5 rounded-card border min-h-[50px] cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-brand bg-brand-soft/30 shadow-xs'
                      : 'border-[var(--line)] bg-[var(--surface-2)] hover:border-brand/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--line)] font-bold text-[12px] flex items-center justify-center tabular-nums">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold truncate text-[var(--text)]">
                        {ord.clientName}
                      </div>
                      <div className="text-[12px] text-[var(--muted)]">
                        {ord.orderNumber} · {ord.lines.length} líneas
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isDone
                        ? 'bg-emerald-500/15 text-emerald-600'
                        : 'bg-amber-500/15 text-amber-600'
                    }`}
                  >
                    {isDone ? 'Preparado' : 'Pendiente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Order Picking List with 44px+ touch targets (8 cols) */}
        <div className="lg:col-span-8 bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-6">
          {currentOrder ? (
            <>
              {/* Order summary bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold text-[var(--text)]">
                      {currentOrder.clientName}
                    </h2>
                    <span className="text-[12px] text-[var(--muted)]">
                      ({currentOrder.orderNumber})
                    </span>
                  </div>
                  <div className="text-[13px] text-[var(--muted)] mt-0.5">
                    Ruta: <strong>{currentOrder.routeName}</strong> · Bultos estimados: <strong>{currentOrder.packagesCount || 2}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePrintLabel(currentOrder.id)}
                  className="min-h-[48px] px-5 py-2.5 rounded-control bg-brand text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-sm"
                >
                  <Printer className="w-5 h-5" />
                  <span>Imprimir etiqueta térmica</span>
                </button>
              </div>

              {/* Lines list ordered by warehouse location */}
              <div className="space-y-3">
                <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex justify-between">
                  <span>Lista de picking ({currentOrder.lines.length} artículos)</span>
                  <span>Ubicación en almacén</span>
                </div>

                <div className="space-y-2.5">
                  {currentOrder.lines.map((line) => {
                    const isChecked = pickedLines[line.id] || line.picked;

                    return (
                      <div
                        key={line.id}
                        className={`p-4 rounded-card border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isChecked
                            ? 'bg-emerald-500/5 border-emerald-500/30 opacity-75'
                            : 'bg-[var(--surface-2)] border-[var(--line)]'
                        }`}
                      >
                        {/* Checkbox button (44px min for tablet touch) */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => toggleLinePicked(line.id)}
                            className={`w-11 h-11 rounded-control flex items-center justify-center flex-shrink-0 transition-all ${
                              isChecked
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'border-2 border-[var(--line)] bg-[var(--surface)] text-transparent hover:border-brand'
                            }`}
                            aria-label="Marcar línea recogida"
                          >
                            <Check className="w-6 h-6 stroke-[3]" />
                          </button>

                          <div className="min-w-0">
                            <div className={`text-[15px] font-semibold ${isChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'}`}>
                              <span className="font-bold text-brand tabular-nums">{line.quantity}×</span> {line.name}
                            </div>
                            <div className="text-[12px] text-[var(--muted)] mt-0.5">
                              {line.format} · Ref: {line.sku}
                            </div>
                          </div>
                        </div>

                        {/* Location badge + Falta button */}
                        <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                          <div className="px-3 py-1.5 rounded-control bg-[var(--surface)] border border-[var(--line)] text-center">
                            <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Ubicación</div>
                            <div className="text-[13px] font-bold tabular-nums text-[var(--text)]">
                              {line.location}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleReportMissing(line)}
                            className="min-h-[44px] px-3.5 py-2 rounded-control border border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-[12px] font-semibold transition-colors flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            <span>Falta</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-[14px] text-[var(--muted)]">
              No hay pedidos en preparación para esta ruta.
            </div>
          )}
        </div>
      </div>

      {/* Missing items & substitute modal */}
      {missingModalLine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-md w-full p-6 space-y-4 shadow-elevated">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-[17px] font-semibold text-[var(--text)]">Notificar falta de producto</h3>
            </div>

            <p className="text-[13px] text-[var(--muted)]">
              Falta stock de: <strong>{missingModalLine.name}</strong> ({missingModalLine.format}).
            </p>

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[var(--muted)] uppercase">
                Sustituto propuesto para {currentOrder.clientName}:
              </label>
              <input
                type="text"
                value={substituteChoice}
                onChange={(e) => setSubstituteChoice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMissingModalLine(null)}
                className="px-4 py-2 text-[13px] font-medium rounded-control border border-[var(--line)] hover:bg-[var(--surface-2)]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmSubstitute}
                className="px-4 py-2 text-[13px] font-semibold rounded-control bg-amber-500 text-white hover:opacity-90"
              >
                Avisar al cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
