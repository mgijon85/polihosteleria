import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney, formatPercent } from '../../utils/formatters';
import { 
  BarChart3, 
  FileSpreadsheet, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  PieChart,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const InformesView: React.FC = () => {
  const { clients, products, addToast } = useApp();

  const handleExportExcel = () => {
    addToast({
      type: 'ok',
      title: 'Informe exportado a Excel',
      message: 'Fichero Polihosteleria_Informe_Directivo_2026.xlsx descargado con éxito.',
    });
  };

  // Sales and margin by category
  const familyData = [
    { familia: 'Celulosa', ventas: 64200, margen: 39.4, vsAñoPasado: '+14.2%' },
    { familia: 'Limpieza', ventas: 48900, margen: 42.1, vsAñoPasado: '+8.6%' },
    { familia: 'Cristalería', ventas: 39500, margen: 36.8, vsAñoPasado: '+11.5%' },
    { familia: 'Menaje', ventas: 32100, margen: 38.0, vsAñoPasado: '+5.2%' },
    { familia: 'Desechables', ventas: 28400, margen: 34.5, vsAñoPasado: '+22.1%' },
  ];

  // Sales by zone chart
  const zoneChartData = [
    { zona: 'Costa oeste', ventas: 74200, añoPasado: 62000 },
    { zona: 'Huelva centro', ventas: 58900, añoPasado: 51200 },
    { zona: 'Condado', ventas: 42100, añoPasado: 38900 },
    { zona: 'Costa este', ventas: 36500, añoPasado: 31000 },
    { zona: 'Huelva norte', ventas: 28400, añoPasado: 26500 },
    { zona: 'Sierra', ventas: 21800, añoPasado: 19800 },
  ];

  const topItems = products.slice(0, 5);
  const churnRiskClients = clients.filter(c => c.health === 'cooling' || c.health === 'debt_risk').slice(0, 5);

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand" />
            <span>Informes y Cuadro de Mando Estratégico</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Análisis de rentabilidad, evolución interanual por zonas y detección de riesgo de fuga
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Exportar a Excel</span>
        </button>
      </div>

      {/* Decision-oriented Chart: "¿Qué zonas generan mayor facturación frente al año anterior?" */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div>
          <h3 className="text-[16px] font-bold text-[var(--text)]">
            ¿Qué zonas de reparto generan mayor facturación frente al año anterior?
          </h3>
          <p className="text-[13px] text-[var(--muted)]">
            Comparativa de volumen de ventas acumulado 2026 vs 2025
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
              <XAxis dataKey="zona" stroke="var(--muted)" fontSize={12} tickLine={false} />
              <YAxis 
                stroke="var(--muted)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`}
              />
              <Tooltip 
                formatter={(val: any) => [formatMoney(val), '']}
                contentStyle={{ 
                  backgroundColor: 'var(--surface)', 
                  borderColor: 'var(--line)', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <Bar dataKey="ventas" name="Ventas 2026" fill="var(--brand)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="añoPasado" name="Ventas 2025" fill="var(--muted)" opacity={0.3} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two columns: Sales by Family with Margins & Top Churn Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1: Rentabilidad por familia */}
        <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <h3 className="text-[15px] font-bold">¿Qué familias dejan mayor margen neto?</h3>
            <span className="text-[11px] text-[var(--muted)]">Yoy %</span>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {familyData.map((f, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-[13px]">
                <div>
                  <div className="font-semibold text-[var(--text)]">{f.familia}</div>
                  <div className="text-[11px] text-[var(--muted)]">Ventas: {formatMoney(f.ventas)}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold tabular-nums text-brand">{f.margen}% margen</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">{f.vsAñoPasado} vs 2025</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table 2: Clientes en riesgo (Churn Alert) */}
        <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-[15px] font-bold">Clientes con mayor riesgo de fuga o impago</h3>
            </div>
            <span className="text-[11px] text-[var(--muted)]">Atención prioritaria</span>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {churnRiskClients.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-[13px]">
                <div>
                  <div className="font-semibold text-[var(--text)]">{c.name}</div>
                  <div className="text-[11px] text-[var(--muted)]">{c.city} · {c.salesRepName}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-amber-600 tabular-nums">
                    {c.daysSinceLastOrder} días sin pedir
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Ventas año: {formatMoney(c.annualSales)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
