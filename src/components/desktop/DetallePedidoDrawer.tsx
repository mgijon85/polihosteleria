import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney, formatTime, formatDate } from '../../utils/formatters';
import { 
  X, 
  Copy, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  CreditCard, 
  AlertCircle,
  FileText,
  TrendingUp,
  Package
} from 'lucide-react';

export const DetallePedidoDrawer: React.FC = () => {
  const { 
    selectedOrderId, 
    setSelectedOrderId, 
    orders, 
    duplicateOrder, 
    updateOrderStatus, 
    role 
  } = useApp();

  const order = orders.find(o => o.id === selectedOrderId);
  if (!selectedOrderId || !order) return null;

  const statuses = [
    { key: 'confirmado', label: 'Confirmado' },
    { key: 'en_preparacion', label: 'En preparación' },
    { key: 'preparado', label: 'Preparado' },
    { key: 'en_reparto', label: 'En reparto' },
    { key: 'entregado', label: 'Entregado' },
    { key: 'facturado', label: 'Facturado' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[var(--surface)] border-l border-[var(--line)] w-full max-w-xl h-full flex flex-col shadow-elevated animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-bold">{order.orderNumber}</span>
              {order.isNightOrder && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                  🌙 Noche
                </span>
              )}
            </div>
            <div className="text-[13px] text-[var(--muted)] mt-0.5">
              {order.clientName} · Entrada: {formatTime(order.createdAt)} ({formatDate(order.createdAt)})
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => duplicateOrder(order.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-control border border-[var(--line)] hover:bg-[var(--surface-2)] text-[12px] font-medium transition-colors"
              title="Crear un nuevo pedido con estas mismas líneas"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicar</span>
            </button>
            <button
              onClick={() => setSelectedOrderId(null)}
              className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Status Tracker */}
          <div className="space-y-2">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Estado del pedido
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {statuses.map((st) => {
                const isCurrent = order.status === st.key;
                return (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => updateOrderStatus(order.id, st.key)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      isCurrent
                        ? 'bg-brand text-white font-semibold shadow-xs'
                        : 'bg-[var(--surface-2)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery & Route info */}
          <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-brand" />
              <div>
                <span className="font-semibold">Ruta: {order.routeName}</span>
                <span className="text-[var(--muted)] ml-2">· Entrega estimada: {formatDate(order.deliveryDate)}</span>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-emerald-600">
              {order.packagesCount || 2} bultos
            </span>
          </div>

          {/* Order Lines */}
          <div className="space-y-2">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex justify-between">
              <span>Líneas de pedido ({order.lines.length})</span>
              <span>Ubicación</span>
            </div>

            <div className="space-y-2">
              {order.lines.map((line, idx) => (
                <div
                  key={line.id || idx}
                  className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface)] flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-[13px] font-semibold text-[var(--text)]">
                      {line.quantity}× {line.name}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      {line.format} · Ref: {line.sku} · Tarifa: {formatMoney(line.unitPrice)}
                      {line.discountPercent > 0 && (
                        <span className="ml-1 text-emerald-600 font-semibold">
                          (-{line.discountPercent}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[13px] font-bold tabular-nums">
                      {formatMoney(line.total)}
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-[var(--muted)] tabular-nums">
                      {line.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & Fees */}
          <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2 text-[13px]">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal artículos</span>
              <span className="tabular-nums">{formatMoney(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Portes (Envío gratis a partir de 80,00 €)</span>
              <span className="tabular-nums">
                {order.shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                ) : (
                  formatMoney(order.shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>IVA general (21%)</span>
              <span className="tabular-nums">{formatMoney(order.taxTotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-[16px] pt-2 border-t border-[var(--line)]">
              <span>Total con IVA</span>
              <span className="tabular-nums text-brand">{formatMoney(order.total)}</span>
            </div>

            {/* Margin - only for Dirección */}
            {role === 'direccion' && order.totalMargin !== undefined && (
              <div className="mt-3 pt-3 border-t border-dashed border-[var(--line)] flex items-center justify-between text-[12px] bg-brand-soft/50 p-2.5 rounded-control text-brand">
                <span className="flex items-center gap-1.5 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Margen neto beneficio (Dirección):
                </span>
                <span className="font-bold tabular-nums">
                  {formatMoney(order.totalMargin)} ({order.totalMarginPercent || 38} %)
                </span>
              </div>
            )}
          </div>

          {/* Payment & Notes */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[var(--muted)]" />
                <span className="font-medium">Forma de cobro:</span>
              </div>
              <span className="font-semibold text-[var(--text)]">
                {order.paymentMethod}
              </span>
            </div>

            {order.notes && (
              <div className="p-3 rounded-card bg-amber-500/10 border border-amber-500/20 text-[12px] text-amber-900 dark:text-amber-200">
                <strong>Nota para entrega:</strong> {order.notes}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
          <span className="text-[12px] text-[var(--muted)]">
            Canal: <strong>{order.channel}</strong>
          </span>
          <button
            type="button"
            onClick={() => setSelectedOrderId(null)}
            className="px-5 py-2 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all"
          >
            Cerrar detalle
          </button>
        </div>
      </div>
    </div>
  );
};
