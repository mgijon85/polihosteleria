import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  Warehouse, 
  Sparkles, 
  Search, 
  ShoppingCart, 
  Check, 
  AlertTriangle, 
  ArrowUpDown,
  Building,
  RefreshCw
} from 'lucide-react';

export const StockView: React.FC = () => {
  const { products, addToast, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  // AI Purchase Proposals grouped by supplier
  const aiPurchaseProposals = [
    {
      supplier: 'Celulosas del Sur S.A.',
      minSupplierOrder: 450,
      items: [
        { sku: 'CEL-001', name: 'Servilleta 2 capas 33x33 blanca punta punta', qtyToOrder: 40, unitCost: 14.80, reason: 'Stock bajo (142 ud vs 32 reservadas + pico fines de semana)' },
        { sku: 'CEL-004', name: 'Mantel individual papel kraft 30x40 cm', qtyToOrder: 20, unitCost: 11.20, reason: 'Consumo acelerado en Costa oeste' },
      ],
      totalEstimate: 816.00,
    },
    {
      supplier: 'Químicas Tartessos S.L.',
      minSupplierOrder: 300,
      items: [
        { sku: 'LIM-101', name: 'Detergente lavavajillas automático aguas duras 5L', qtyToOrder: 25, unitCost: 11.50, reason: 'Rotura inminente en 4 días según ritmo actual' },
      ],
      totalEstimate: 287.50,
    },
  ];

  const filteredProducts = products.filter(p => {
    if (onlyLowStock && p.availableStock > p.minStock) return false;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term) || p.aisle.toLowerCase().includes(term);
    }
    return true;
  });

  const handleCreatePOs = (supplierName: string) => {
    addToast({
      type: 'ok',
      title: `Pedido de compra generado a ${supplierName}`,
      message: 'Borrador creado en Compras con optimización de portes.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-brand" />
            <span>Gestión de Stock y Almacén Central</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Control de roturas, stock reservado para rutas y ubicaciones pasillo-estantería
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('compras')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Ver pedidos de compra</span>
        </button>
      </div>

      {/* AI Purchase Proposal Card: «Según lo que vendes y la temporada...» */}
      <div className="bg-gradient-to-br from-brand-soft to-indigo-500/10 p-6 rounded-panel border border-brand/20 shadow-resting space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[var(--text)]">
                Propuesta inteligente de compra con IA
              </h2>
              <p className="text-[13px] text-[var(--muted)]">
                «Según lo que vendes habitualmente y la temporada de otoño en Huelva, compra esto esta semana»
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand text-white self-start sm:self-center">
            Optimiza portes gratis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {aiPurchaseProposals.map((prop, idx) => (
            <div key={idx} className="p-4 rounded-card bg-[var(--surface)] border border-[var(--line)] shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-[var(--text)] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-brand" />
                    <span>{prop.supplier}</span>
                  </h3>
                  <div className="text-[11px] text-[var(--muted)]">
                    Pedido mínimo proveedor: {formatMoney(prop.minSupplierOrder)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-bold text-brand tabular-nums">{formatMoney(prop.totalEstimate)}</div>
                  <span className="text-[10px] text-emerald-600 font-bold">Portes 0,00 € alcanzados</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[12px] pt-2 border-t border-[var(--line)]">
                {prop.items.map((it, iIdx) => (
                  <div key={iIdx} className="p-2 rounded-control bg-[var(--surface-2)] space-y-0.5">
                    <div className="flex justify-between font-semibold">
                      <span>{it.qtyToOrder} cajas × {it.name}</span>
                      <span className="tabular-nums">{formatMoney(it.qtyToOrder * it.unitCost)}</span>
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">{it.reason}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleCreatePOs(prop.supplier)}
                className="w-full py-2 rounded-control bg-brand text-white text-[12px] font-semibold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Crear pedido a {prop.supplier.split(' ')[0]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Table & Search */}
      <div className="bg-[var(--surface)] p-4 rounded-card border border-[var(--line)] shadow-resting space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyLowStock(false)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                !onlyLowStock ? 'bg-brand text-white font-semibold' : 'bg-[var(--surface-2)] text-[var(--muted)]'
              }`}
            >
              Todos los artículos ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setOnlyLowStock(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                onlyLowStock ? 'bg-amber-500 text-white font-semibold' : 'bg-amber-500/10 text-amber-600'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Bajo mínimos ({products.filter(p => p.availableStock <= p.minStock).length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por artículo, SKU o pasillo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Ref / SKU</th>
                <th className="py-3 px-4">Artículo</th>
                <th className="py-3 px-4 text-center">Físico</th>
                <th className="py-3 px-4 text-center">Mínimo</th>
                <th className="py-3 px-4 text-center text-amber-600">Reservado</th>
                <th className="py-3 px-4 text-center text-emerald-600">Disponible</th>
                <th className="py-3 px-4 text-center">Ubicación</th>
                <th className="py-3 px-4">Proveedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredProducts.slice(0, 100).map((p) => {
                const isUnderMin = p.availableStock <= p.minStock;

                return (
                  <tr key={p.id} className="hover:bg-[var(--surface-2)] transition-colors">
                    <td className="py-3.5 px-4 font-bold tabular-nums text-[var(--muted)]">{p.sku}</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--text)]">{p.name}</td>
                    <td className="py-3.5 px-4 text-center tabular-nums">{p.stock}</td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-[var(--muted)]">{p.minStock}</td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-amber-600 font-medium">{p.reservedStock}</td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold">
                      <span className={isUnderMin ? 'text-amber-600' : 'text-emerald-600'}>
                        {p.availableStock}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)]">
                        {p.aisle}-{p.shelf}-{p.bin}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[var(--muted)]">{p.supplierName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
