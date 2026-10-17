import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  X, 
  Package, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Eye, 
  Truck, 
  Layers,
  Building
} from 'lucide-react';

export const FichaArticuloModal: React.FC = () => {
  const { selectedProductId, setSelectedProductId, products, role } = useApp();

  const product = products.find(p => p.id === selectedProductId);
  if (!selectedProductId || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full bg-brand-soft text-brand">
                {product.categoryName}
              </span>
              <span className="text-[12px] text-[var(--muted)] tabular-nums">Ref: {product.sku}</span>
            </div>
            <h2 className="text-[18px] font-bold text-[var(--text)] mt-1">{product.name}</h2>
            <div className="text-[13px] text-[var(--muted)]">EAN: {product.ean} · Formato: {product.format}</div>
          </div>

          <button
            onClick={() => setSelectedProductId(null)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-[13px]">
          {/* Precios y Coste (Coste solo para Dirección) */}
          <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-3">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Precios y Márgenes
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">PVP Tarifa General</div>
                <div className="text-[16px] font-bold text-brand tabular-nums mt-0.5">
                  {formatMoney(product.generalPrice)}
                </div>
                <div className="text-[10px] text-[var(--muted)]">+21% IVA ({formatMoney(product.generalPrice * 1.21)})</div>
              </div>

              {role === 'direccion' && (
                <div className="p-3 rounded-control bg-brand-soft/40 border border-brand/20">
                  <div className="text-[11px] text-brand font-semibold">Coste compra (Dirección)</div>
                  <div className="text-[16px] font-bold tabular-nums mt-0.5">
                    {formatMoney(product.costPrice)}
                  </div>
                  <div className="text-[10px] text-brand">
                    Margen: {formatMoney(product.generalPrice - product.costPrice)} ({Math.round(((product.generalPrice - product.costPrice) / product.generalPrice) * 100)}%)
                  </div>
                </div>
              )}

              <div className="p-3 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Visible en portal</div>
                <div className="text-[14px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Sí, publicado
                </div>
              </div>
            </div>
          </div>

          {/* Stock y Almacén */}
          <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-3">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex justify-between">
              <span>Niveles de Stock y Ubicación</span>
              <span className="text-brand font-bold">Pasillo {product.aisle} · Estantería {product.shelf} · Hueco {product.bin}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Físico</div>
                <div className="text-[15px] font-bold tabular-nums mt-0.5">{product.stock}</div>
              </div>
              <div className="p-2.5 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Mínimo</div>
                <div className="text-[15px] font-bold tabular-nums mt-0.5">{product.minStock}</div>
              </div>
              <div className="p-2.5 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Reservado</div>
                <div className="text-[15px] font-bold tabular-nums mt-0.5 text-amber-600">{product.reservedStock}</div>
              </div>
              <div className="p-2.5 rounded-control bg-[var(--surface)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Disponible</div>
                <div className="text-[15px] font-bold tabular-nums mt-0.5 text-emerald-600">{product.availableStock}</div>
              </div>
            </div>
          </div>

          {/* Proveedor habitual */}
          <div className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building className="w-4 h-4 text-brand" />
              <div>
                <span className="font-semibold">Proveedor habitual:</span>
                <span className="ml-1.5 text-[var(--muted)]">{product.supplierName}</span>
              </div>
            </div>
          </div>

          {/* Descripción para el portal */}
          <div className="space-y-1">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Descripción para el portal del cliente
            </div>
            <p className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] text-[var(--text)] leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedProductId(null)}
            className="px-5 py-2 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
