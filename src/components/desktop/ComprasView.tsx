import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  ShoppingCart, 
  Building, 
  CheckCircle2, 
  AlertTriangle, 
  PackageCheck, 
  FileText, 
  Phone, 
  Mail, 
  Calendar,
  Check
} from 'lucide-react';

export const ComprasView: React.FC = () => {
  const { suppliers, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'proveedores' | 'pedidos' | 'recepcion'>('recepcion');

  // Purchase orders
  const purchaseOrders = [
    { id: 'oc-1', number: 'OC-2026-0182', supplier: 'Celulosas del Sur S.A.', date: '16 oct', expectedDate: '18 oct', itemsCount: 40, total: 592.00, status: 'en_camino' },
    { id: 'oc-2', number: 'OC-2026-0181', supplier: 'Químicas Tartessos S.L.', date: '15 oct', expectedDate: '17 oct', itemsCount: 25, total: 287.50, status: 'recibido_parcial' },
    { id: 'oc-3', number: 'OC-2026-0180', supplier: 'Vidrieras de Andalucía', date: '12 oct', expectedDate: '15 oct', itemsCount: 60, total: 840.00, status: 'completado' },
  ];

  // Goods receipt simulation (reception vs ordered differences)
  const [goodsReceiptLines, setGoodsReceiptLines] = useState([
    { id: 'gr-1', sku: 'LIM-101', name: 'Detergente lavavajillas automático 5L', orderedQty: 25, receivedQty: 25, unitCost: 11.50, status: 'ok' },
    { id: 'gr-2', sku: 'LIM-102', name: 'Abrillantador secante máquinas 5L', orderedQty: 15, receivedQty: 12, unitCost: 9.80, status: 'discrepancia', note: 'Faltan 3 garrafas por rotura en transporte' },
    { id: 'gr-3', sku: 'LIM-103', name: 'Desengrasante alcalino hornos 5L', orderedQty: 10, receivedQty: 10, unitCost: 13.20, status: 'ok' },
  ]);

  const handleConfirmReception = () => {
    addToast({
      type: 'ok',
      title: 'Recepción de mercancía registrada',
      message: 'Stock actualizado en almacén y albarán de compra conciliado con contabilidad.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-brand" />
            <span>Compras y Proveedores</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            12 proveedores homologados, pedidos de reposición y control de recepción con incidencias
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-control bg-[var(--surface-2)] border border-[var(--line)] self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveTab('recepcion')}
            className={`px-3 py-1.5 rounded-control text-[12px] font-semibold transition-all ${
              activeTab === 'recepcion' ? 'bg-[var(--surface)] text-brand shadow-xs' : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Recepción de mercancía
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`px-3 py-1.5 rounded-control text-[12px] font-semibold transition-all ${
              activeTab === 'pedidos' ? 'bg-[var(--surface)] text-brand shadow-xs' : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Pedidos de compra
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('proveedores')}
            className={`px-3 py-1.5 rounded-control text-[12px] font-semibold transition-all ${
              activeTab === 'proveedores' ? 'bg-[var(--surface)] text-brand shadow-xs' : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Proveedores ({suppliers.length})
          </button>
        </div>
      </div>

      {/* TAB 1: RECEPCION DE MERCANCIA CON DISCREPANCIAS */}
      {activeTab === 'recepcion' && (
        <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--line)]">
            <div>
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-brand" />
                <h2 className="text-[17px] font-bold">
                  Recepción de mercancía: Albarán Químicas Tartessos S.L. (OC-2026-0181)
                </h2>
              </div>
              <p className="text-[13px] text-[var(--muted)]">
                Compara lo pedido con lo que realmente ha bajado del camión para generar la reclamación automática
              </p>
            </div>
            <span className="text-[12px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold">
              1 incidencia detectada
            </span>
          </div>

          <div className="space-y-3">
            {goodsReceiptLines.map((line) => {
              const hasDiff = line.receivedQty !== line.orderedQty;

              return (
                <div
                  key={line.id}
                  className={`p-4 rounded-card border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    hasDiff
                      ? 'border-amber-400 bg-amber-500/5'
                      : 'border-[var(--line)] bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[var(--text)]">{line.name}</span>
                      <span className="text-[11px] text-[var(--muted)] tabular-nums font-mono">{line.sku}</span>
                    </div>
                    {line.note && (
                      <div className="text-[12px] text-amber-700 dark:text-amber-300 font-medium">
                        ⚠️ {line.note}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right text-[13px]">
                      <div className="text-[var(--muted)]">Pedido: <strong>{line.orderedQty}</strong></div>
                      <div className="font-bold tabular-nums">
                        Recibido:{' '}
                        <span className={hasDiff ? 'text-amber-600 font-extrabold text-[15px]' : 'text-emerald-600'}>
                          {line.receivedQty}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-bold tabular-nums text-[14px]">
                      {formatMoney(line.receivedQty * line.unitCost)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
            <div className="text-[13px] text-[var(--muted)]">
              Total validado albarán: <strong className="text-[var(--text)]">{formatMoney(goodsReceiptLines.reduce((s, l) => s + l.receivedQty * l.unitCost, 0))}</strong>
            </div>

            <button
              type="button"
              onClick={handleConfirmReception}
              className="flex items-center gap-2 px-6 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Aceptar recepción e ingresar stock</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PEDIDOS DE COMPRA */}
      {activeTab === 'pedidos' && (
        <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">N° Orden</th>
                <th className="py-3 px-4">Proveedor</th>
                <th className="py-3 px-4">Fecha emisión</th>
                <th className="py-3 px-4">Fecha prevista</th>
                <th className="py-3 px-4 text-center">Bultos</th>
                <th className="py-3 px-4 text-right">Importe</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <td className="py-3.5 px-4 font-bold tabular-nums">{po.number}</td>
                  <td className="py-3.5 px-4 font-semibold">{po.supplier}</td>
                  <td className="py-3.5 px-4 text-[var(--muted)]">{po.date}</td>
                  <td className="py-3.5 px-4 text-[var(--muted)]">{po.expectedDate}</td>
                  <td className="py-3.5 px-4 text-center tabular-nums">{po.itemsCount}</td>
                  <td className="py-3.5 px-4 text-right font-bold tabular-nums">{formatMoney(po.total)}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-soft text-brand capitalize">
                      {po.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PROVEEDORES */}
      {activeTab === 'proveedores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="p-5 rounded-panel border border-[var(--line)] bg-[var(--surface)] shadow-resting space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--text)]">{s.name}</h3>
                  <div className="text-[12px] text-[var(--muted)]">{s.city} · CIF: {s.cif}</div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-soft text-brand capitalize">
                  {s.categories[0]}
                </span>
              </div>

              <div className="space-y-1 text-[12px] text-[var(--muted)] pt-2 border-t border-[var(--line)]">
                <div>Contacto: <strong>{s.contact}</strong> ({s.phone})</div>
                <div>Email: {s.email}</div>
                <div>Plazo de entrega medio: <strong>{s.leadTimeDays} días</strong></div>
                <div>Pedido mínimo: <strong>{formatMoney(s.minOrderAmount)}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
