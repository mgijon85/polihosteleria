import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney, formatPercent } from '../../utils/formatters';
import { 
  Receipt, 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Building, 
  Users, 
  Percent, 
  HelpCircle,
  Check
} from 'lucide-react';

export const TarifasView: React.FC = () => {
  const { clients, products, role, addToast } = useApp();

  const [simClientId, setSimClientId] = useState<string>(clients[0]?.id || 'cli-1');
  const [simProductId, setSimProductId] = useState<string>(products[0]?.id || 'prod-1');

  // Bulk price increase state
  const [bulkFamily, setBulkFamily] = useState<string>('celulosa');
  const [bulkPercent, setBulkPercent] = useState<number>(3.5);
  const [isBulkPreviewActive, setIsBulkPreviewActive] = useState<boolean>(false);

  const selectedClient = clients.find(c => c.id === simClientId) || clients[0];
  const selectedProduct = products.find(p => p.id === simProductId) || products[0];

  // Pricing rules calculation simulation
  const pvpBase = selectedProduct.generalPrice;
  const cost = selectedProduct.costPrice;

  // Rule 1: Tier discount
  let tierDiscountPercent = 0;
  if (selectedClient.tierId === 'hoteles') tierDiscountPercent = 12;
  else if (selectedClient.tierId === 'restauracion') tierDiscountPercent = 8;
  else if (selectedClient.tierId === 'colectividades') tierDiscountPercent = 10;
  else tierDiscountPercent = 5;

  const priceAfterTier = Number((pvpBase * (1 - tierDiscountPercent / 100)).toFixed(2));

  // Rule 2: Special client negotiated price (if any)
  const hasSpecialPrice = selectedClient.id === 'cli-1' && selectedProduct.id === 'prod-1';
  const finalPrice = hasSpecialPrice ? 22.50 : priceAfterTier;
  const marginNet = Number((finalPrice - cost).toFixed(2));
  const marginPercent = Number(((marginNet / finalPrice) * 100).toFixed(1));

  const handleApplyBulkIncrease = () => {
    addToast({
      type: 'ok',
      title: `Subida del +${bulkPercent}% aplicada en ${bulkFamily.toUpperCase()}`,
      message: 'Las tarifas y el portal del cliente se han actualizado correctamente.',
    });
    setIsBulkPreviewActive(false);
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
          <Receipt className="w-5 h-5 text-brand" />
          <span>Gestión de Tarifas y Precios Especiales</span>
        </h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          Tarifa general, 4 grupos de clientes, 40 precios pactados y motor de cálculo de márgenes
        </p>
      </div>

      {/* 4 Tiers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Tarifa General PVP', clientsCount: 14, defaultDisc: '0 %', note: 'Base de catálogo' },
          { name: 'Tarifa Bares', clientsCount: 38, defaultDisc: '5 %', note: 'Hostelería diurna y barras' },
          { name: 'Tarifa Restauración', clientsCount: 22, defaultDisc: '8 %', note: 'Restaurantes y marisquerías' },
          { name: 'Tarifa Hoteles', clientsCount: 11, defaultDisc: '12 %', note: 'Grandes cuentas y resorts Costa' },
        ].map((t, idx) => (
          <div key={idx} className="p-5 rounded-panel border border-[var(--line)] bg-[var(--surface)] shadow-resting space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{t.note}</span>
              <span className="text-[12px] font-bold text-brand bg-brand-soft px-2 py-0.5 rounded-full">{t.defaultDisc}</span>
            </div>
            <h3 className="text-[15px] font-bold text-[var(--text)]">{t.name}</h3>
            <div className="text-[12px] text-[var(--muted)] pt-2 border-t border-[var(--line)]">
              <strong>{t.clientsCount} clientes</strong> asignados
            </div>
          </div>
        ))}
      </div>

      {/* Simulator Section: "¿Cuánto paga Bar La Ribera y por qué?" */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand" />
            <h2 className="text-[17px] font-bold">
              Simulador de Precios: ¿Cuánto paga este cliente y por qué?
            </h2>
          </div>
          <span className="text-[12px] text-[var(--muted)]">Cadena secuencial de reglas tarifarias</span>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Cliente
            </label>
            <select
              value={simClientId}
              onChange={(e) => setSimClientId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-medium"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} — {c.tierName}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Artículo a simular
            </label>
            <select
              value={simProductId}
              onChange={(e) => setSimProductId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-medium"
            >
              {products.slice(0, 30).map(p => (
                <option key={p.id} value={p.id}>{p.name} ({formatMoney(p.generalPrice)})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rule Chain breakdown */}
        <div className="p-5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-4">
          <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
            Desglose de la regla aplicada paso a paso
          </div>

          <div className="space-y-3 text-[13px]">
            <div className="flex items-center justify-between p-3 rounded-control bg-[var(--surface)] border border-[var(--line)]">
              <div>
                <span className="font-semibold">1. Precio Base de Tarifa General (PVP)</span>
                <div className="text-[11px] text-[var(--muted)]">{selectedProduct.name} ({selectedProduct.format})</div>
              </div>
              <span className="font-bold tabular-nums text-[14px]">{formatMoney(pvpBase)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-control bg-[var(--surface)] border border-[var(--line)]">
              <div>
                <span className="font-semibold">2. Descuento por Grupo: {selectedClient.tierName}</span>
                <div className="text-[11px] text-[var(--muted)]">Aplica -{tierDiscountPercent}% directo sobre PVP</div>
              </div>
              <span className="font-bold tabular-nums text-emerald-600">-{formatPercent(tierDiscountPercent)} → {formatMoney(priceAfterTier)}</span>
            </div>

            {hasSpecialPrice && (
              <div className="flex items-center justify-between p-3 rounded-control bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                <div>
                  <span className="font-semibold">3. Precio Especial Pactado por Comercial</span>
                  <div className="text-[11px] opacity-80">Condición fija aprobada por Juanlu el 12 de septiembre</div>
                </div>
                <span className="font-bold tabular-nums text-[14px] text-amber-700 dark:text-amber-300">
                  {formatMoney(finalPrice)} (Precio pactado)
                </span>
              </div>
            )}
          </div>

          {/* Result row */}
          <div className="pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-[var(--muted)] uppercase font-semibold">Precio final que paga {selectedClient.name}:</div>
              <div className="text-[22px] font-extrabold text-brand tabular-nums mt-0.5">
                {formatMoney(finalPrice)} <span className="text-[13px] font-normal text-[var(--muted)]">+21% IVA</span>
              </div>
            </div>

            {/* Margin - only for Dirección */}
            {role === 'direccion' && (
              <div className="p-3.5 rounded-control bg-brand-soft border border-brand/20 text-brand text-right">
                <div className="text-[11px] font-semibold uppercase">Margen resultante (Solo Dirección):</div>
                <div className="text-[17px] font-bold tabular-nums mt-0.5">
                  {formatMoney(marginNet)} ({marginPercent} %)
                </div>
                <div className="text-[10px] text-[var(--muted)]">Coste compra: {formatMoney(cost)}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subida masiva de precios simulator */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand" />
            <h2 className="text-[16px] font-bold">Subida masiva de precios por familia o proveedor</h2>
          </div>
          <span className="text-[12px] text-[var(--muted)]">Simula el impacto en facturación y margen antes de aplicar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase">Familia de artículos</label>
            <select
              value={bulkFamily}
              onChange={(e) => setBulkFamily(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]"
            >
              <option value="celulosa">Celulosa (servilletas, manteles, bobinas)</option>
              <option value="limpieza">Limpieza e higiene</option>
              <option value="cristaleria">Cristalería</option>
              <option value="menaje">Menaje y vajilla</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[var(--muted)] uppercase">Porcentaje de subida</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                step="0.5"
                value={bulkPercent}
                onChange={(e) => setBulkPercent(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-bold tabular-nums"
              />
              <span className="text-[13px] font-bold">%</span>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setIsBulkPreviewActive(true)}
              className="w-full py-2.5 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[13px] font-semibold hover:border-brand/40 transition-colors"
            >
              Previsualizar impacto
            </button>
          </div>
        </div>

        {isBulkPreviewActive && (
          <div className="p-4 rounded-card bg-brand-soft/40 border border-brand/20 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-[13px]">
              <div>
                <span className="font-bold">Impacto estimado en {bulkFamily.toUpperCase()}:</span>
                <p className="text-[12px] text-[var(--muted)]">Afecta a 48 artículos y 85 clientes activos.</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600 tabular-nums">+1.420 € / mes facturación</div>
                <div className="text-[11px] text-[var(--muted)]">Margen medio aumenta de 36,2% a 38,1%</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-brand/20">
              <button
                type="button"
                onClick={() => setIsBulkPreviewActive(false)}
                className="px-3 py-1.5 rounded-control text-[12px] border border-[var(--line)] bg-[var(--surface)]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApplyBulkIncrease}
                className="px-4 py-1.5 rounded-control text-[12px] font-semibold bg-brand text-white shadow-xs"
              >
                Aplicar subida de precios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
