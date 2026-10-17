import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  X, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  RotateCcw, 
  Star, 
  Check,
  ShoppingBag
} from 'lucide-react';

export const NuevoPedidoModal: React.FC = () => {
  const { 
    isNewOrderModalOpen, 
    setIsNewOrderModalOpen, 
    clients, 
    products, 
    addNewOrder 
  } = useApp();

  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || 'cli-1');
  const [clientSearch, setClientSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [lines, setLines] = useState<any[]>([
    {
      productId: products[0].id,
      sku: products[0].sku,
      name: products[0].name,
      format: products[0].format,
      quantity: 2,
      unitPrice: products[0].generalPrice,
      discountPercent: 0,
      finalPrice: products[0].generalPrice,
      total: products[0].generalPrice * 2,
      taxRate: 21,
      taxAmount: products[0].generalPrice * 2 * 0.21,
      costPrice: products[0].costPrice,
      location: `${products[0].aisle}-${products[0].shelf}-${products[0].bin}`,
    }
  ]);

  if (!isNewOrderModalOpen) return null;

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    c.city.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 8);

  const handleAddProduct = (prod: any) => {
    const existing = lines.find(l => l.productId === prod.id);
    if (existing) {
      setLines(lines.map(l => l.productId === prod.id ? { 
        ...l, 
        quantity: l.quantity + 1, 
        total: Number(((l.quantity + 1) * l.finalPrice).toFixed(2)) 
      } : l));
    } else {
      setLines([...lines, {
        productId: prod.id,
        sku: prod.sku,
        name: prod.name,
        format: prod.format,
        quantity: 1,
        unitPrice: prod.generalPrice,
        discountPercent: 0,
        finalPrice: prod.generalPrice,
        total: prod.generalPrice,
        taxRate: 21,
        taxAmount: Number((prod.generalPrice * 0.21).toFixed(2)),
        costPrice: prod.costPrice,
        location: `${prod.aisle}-${prod.shelf}-${prod.bin}`,
      }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setLines(lines.map(l => {
      if (l.productId === productId) {
        const newQty = Math.max(1, l.quantity + delta);
        return {
          ...l,
          quantity: newQty,
          total: Number((newQty * l.finalPrice).toFixed(2)),
        };
      }
      return l;
    }));
  };

  const removeLine = (productId: string) => {
    setLines(lines.filter(l => l.productId !== productId));
  };

  const loadRepeatLastOrder = () => {
    // Fill with client's typical 3 items
    const sampleItems = [products[0], products[12], products[6]];
    setLines(sampleItems.map((p, idx) => ({
      productId: p.id,
      sku: p.sku,
      name: p.name,
      format: p.format,
      quantity: idx === 0 ? 3 : 2,
      unitPrice: p.generalPrice,
      discountPercent: idx === 0 ? 5 : 0,
      finalPrice: idx === 0 ? Number((p.generalPrice * 0.95).toFixed(2)) : p.generalPrice,
      total: idx === 0 ? Number((p.generalPrice * 0.95 * 3).toFixed(2)) : Number((p.generalPrice * 2).toFixed(2)),
      taxRate: 21,
      taxAmount: 15,
      costPrice: p.costPrice,
      location: `${p.aisle}-${p.shelf}-${p.bin}`,
    })));
  };

  const subtotal = Number(lines.reduce((s, l) => s + l.total, 0).toFixed(2));
  const shippingFee = subtotal >= 80 ? 0 : 6.50;
  const taxTotal = Number((subtotal * 0.21).toFixed(2));
  const total = Number((subtotal + shippingFee + taxTotal).toFixed(2));
  const costTotal = Number(lines.reduce((s, l) => s + (l.costPrice * l.quantity), 0).toFixed(2));
  const marginTotal = Number((subtotal - costTotal).toFixed(2));

  const handleSave = () => {
    if (lines.length === 0) return;
    addNewOrder({
      clientId: currentClient.id,
      clientName: currentClient.name,
      clientZone: currentClient.zone,
      channel: 'oficina',
      lines,
      subtotal,
      shippingFee,
      taxTotal,
      total,
      totalMargin: marginTotal,
      totalMarginPercent: Number(((marginTotal / subtotal) * 100).toFixed(1)),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-control bg-brand text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-semibold">Nuevo pedido manual de oficina</h2>
              <p className="text-[13px] text-[var(--muted)]">Tarifa asignada y cálculo automático de portes</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewOrderModalOpen(false)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              1. Seleccionar cliente
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[14px] text-[var(--text)] font-medium focus:border-brand"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.city} ({c.zone}) · {c.tierName}
                  </option>
                ))}
              </select>

              {/* Quick shortcuts: Repetir último / Habituales */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={loadRepeatLastOrder}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[12px] font-medium transition-colors"
                  title="Cargar artículos del pedido anterior"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-brand" />
                  <span>Repetir último</span>
                </button>
                <button
                  type="button"
                  onClick={loadRepeatLastOrder}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[12px] font-medium transition-colors"
                  title="Añadir artículos habituales"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Habituales</span>
                </button>
              </div>
            </div>

            <div className="text-[12px] text-[var(--muted)]">
              Zona: <strong>{currentClient.zone}</strong> · Saldo actual: {formatMoney(currentClient.currentBalance)} / Límite: {formatMoney(currentClient.creditLimit)}
            </div>
          </div>

          {/* Product Search & Quick Add */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              2. Añadir artículos del catálogo
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por nombre, familia o referencia..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] text-[var(--text)] placeholder-[var(--muted)] focus:border-brand"
              />
            </div>

            {/* Quick search results picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pt-1">
              {filteredProducts.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => handleAddProduct(prod)}
                  className="p-2.5 rounded-card border border-[var(--line)] bg-[var(--surface)] hover:border-brand cursor-pointer flex items-center justify-between text-left transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-[12px] font-semibold truncate text-[var(--text)]">{prod.name}</div>
                    <div className="text-[11px] text-[var(--muted)]">{prod.format} · Stock: {prod.availableStock}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[12px] font-bold tabular-nums">{formatMoney(prod.generalPrice)}</div>
                    <span className="text-[10px] text-brand font-bold">+ Añadir</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Order Lines */}
          <div className="space-y-2">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex justify-between">
              <span>Líneas del pedido ({lines.length})</span>
              <span>Subtotal</span>
            </div>

            {lines.length === 0 ? (
              <div className="p-8 text-center text-[13px] text-[var(--muted)] border border-dashed border-[var(--line)] rounded-card">
                No hay artículos añadidos. Busca arriba o pulsa «Repetir último».
              </div>
            ) : (
              <div className="space-y-2">
                {lines.map((l) => (
                  <div
                    key={l.productId}
                    className="p-3 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">{l.name}</div>
                      <div className="text-[11px] text-[var(--muted)]">{l.format} · {formatMoney(l.finalPrice)}/ud</div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center rounded-control border border-[var(--line)] bg-[var(--surface)]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(l.productId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-[13px] font-bold tabular-nums">
                          {l.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(l.productId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-20 text-right font-bold text-[13px] tabular-nums">
                        {formatMoney(l.total)}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeLine(l.productId)}
                        className="text-[var(--muted)] hover:text-rose-500 p-1 transition-colors"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1.5 text-[13px]">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Portes (Gratis a partir de 80,00 €)</span>
              <span className="tabular-nums">
                {shippingFee === 0 ? <span className="text-emerald-600 font-semibold">Gratis</span> : formatMoney(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>IVA (21%)</span>
              <span className="tabular-nums">{formatMoney(taxTotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-[16px] pt-2 border-t border-[var(--line)]">
              <span>Total Pedido</span>
              <span className="tabular-nums text-brand">{formatMoney(total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsNewOrderModalOpen(false)}
            className="px-4 py-2 rounded-control border border-[var(--line)] text-[13px] font-medium hover:bg-[var(--surface-2)] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-control bg-brand text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all disabled:opacity-40 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar y registrar pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
