import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Client, ClientHealth } from '../../types';
import { formatMoney, formatDate } from '../../utils/formatters';
import { 
  Users, 
  Search, 
  Plus, 
  ChevronRight, 
  Send, 
  Filter, 
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { FichaClienteModal } from './FichaClienteModal';

export const ClientesView: React.FC = () => {
  const { clients, setSelectedClientId, notifySalesRep } = useApp();

  const [filterHealth, setFilterHealth] = useState<'todos' | 'normal' | 'cooling' | 'debt_risk'>('todos');
  const [selectedZone, setSelectedZone] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);

  const zones = ['Huelva centro', 'Huelva norte', 'Costa oeste', 'Costa este', 'Condado', 'Sierra'];

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      if (filterHealth !== 'todos' && c.health !== filterHealth) return false;
      if (selectedZone !== 'todos' && c.zone !== selectedZone) return false;
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(term);
        const matchesCity = c.city.toLowerCase().includes(term);
        const matchesRep = c.salesRepName.toLowerCase().includes(term);
        if (!matchesName && !matchesCity && !matchesRep) return false;
      }
      return true;
    });
  }, [clients, filterHealth, selectedZone, searchTerm]);

  const coolingCount = clients.filter(c => c.health === 'cooling').length;
  const debtCount = clients.filter(c => c.health === 'debt_risk').length;

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-bold text-[var(--text)]">
              Cartera de Clientes B2B
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-brand-soft text-brand tabular-nums">
              {clients.length} clientes
            </span>
          </div>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Hostelería, restauración, hoteles y colectividades de Huelva y provincia
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewClientOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo cliente</span>
        </button>
      </div>

      {/* Filter Chips & Search */}
      <div className="bg-[var(--surface)] p-4 rounded-card border border-[var(--line)] shadow-resting space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setFilterHealth('todos')}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                filterHealth === 'todos'
                  ? 'bg-brand text-white font-semibold'
                  : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              Todos ({clients.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterHealth('normal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                filterHealth === 'normal'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Piden normal ({clients.length - coolingCount - debtCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterHealth('cooling')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                filterHealth === 'cooling'
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Se enfrían ({coolingCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterHealth('debt_risk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                filterHealth === 'debt_risk'
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Deuda o límite ({debtCount})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, pueblo o comercial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] text-[var(--text)] placeholder-[var(--muted)] focus:border-brand"
            />
          </div>
        </div>

        {/* Zone select */}
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--line)] text-[12px]">
          <span className="text-[var(--muted)] font-medium">Zona de reparto:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-2.5 py-1 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] font-medium"
          >
            <option value="todos">Todas las zonas</option>
            {zones.map(z => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 w-8 text-center">Estado</th>
                <th className="py-3 px-4">Cliente / Tipo</th>
                <th className="py-3 px-4">Zona / Ciudad</th>
                <th className="py-3 px-4">Comercial</th>
                <th className="py-3 px-4 text-center">Último pedido</th>
                <th className="py-3 px-4 text-center">Frecuencia</th>
                <th className="py-3 px-4 text-right">Ventas 12m</th>
                <th className="py-3 px-4 text-right">Saldo pendiente</th>
                <th className="py-3 px-4 text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredClients.map((c) => {
                const isCooling = c.health === 'cooling';
                const isDebt = c.health === 'debt_risk';

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedClientId(c.id)}
                    className="hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
                  >
                    {/* Status traffic light light */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          c.health === 'normal'
                            ? 'bg-emerald-500'
                            : isCooling
                            ? 'bg-amber-500 animate-pulse'
                            : 'bg-rose-500'
                        }`}
                        title={
                          c.health === 'normal'
                            ? 'Pide con normalidad'
                            : isCooling
                            ? 'Se enfría: más de 2 semanas sin pedir'
                            : 'Riesgo: Deuda vencida o límite superado'
                        }
                      />
                    </td>

                    {/* Nombre + Tipo */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[var(--text)]">{c.name}</div>
                      <div className="text-[11px] text-[var(--muted)] capitalize">{c.type}</div>
                    </td>

                    {/* Zona + Ciudad */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-[var(--text)] font-medium">{c.city}</div>
                      <div className="text-[11px] text-[var(--muted)]">{c.zone}</div>
                    </td>

                    {/* Comercial */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[var(--muted)]">
                      {c.salesRepName}
                    </td>

                    {/* Último pedido */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap tabular-nums">
                      <span className={isCooling ? 'text-amber-600 font-bold' : 'text-[var(--muted)]'}>
                        Hace {c.daysSinceLastOrder} días
                      </span>
                    </td>

                    {/* Frecuencia */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap tabular-nums text-[var(--muted)]">
                      Cada {c.orderFrequencyDays} días
                    </td>

                    {/* Ventas 12 meses */}
                    <td className="py-3.5 px-4 text-right font-semibold tabular-nums text-[var(--text)] whitespace-nowrap">
                      {formatMoney(c.annualSales)}
                    </td>

                    {/* Saldo pendiente */}
                    <td className="py-3.5 px-4 text-right tabular-nums whitespace-nowrap">
                      <span className={`font-bold ${isDebt ? 'text-rose-600' : 'text-[var(--text)]'}`}>
                        {formatMoney(c.currentBalance)}
                      </span>
                      {c.overdueBalance > 0 && (
                        <div className="text-[10px] text-rose-500 font-bold">
                          {formatMoney(c.overdueBalance)} vencido
                        </div>
                      )}
                    </td>

                    {/* Ficha button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClientId(c.id);
                        }}
                        className="p-1.5 rounded-control text-[var(--muted)] hover:text-brand hover:bg-[var(--surface-2)] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal with 8 tabs */}
      <FichaClienteModal />

      {/* Simple New Client Simulation Modal */}
      {isNewClientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-lg w-full p-6 space-y-4 shadow-elevated">
            <h3 className="text-[17px] font-bold">Añadir nuevo cliente</h3>
            <p className="text-[13px] text-[var(--muted)]">Introduce los datos fiscales y la tarifa asignada.</p>
            <div className="space-y-3">
              <input type="text" placeholder="Nombre comercial (ej: Bar El Muelle)" className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]" defaultValue="Chiringuito La Pérgola" />
              <input type="text" placeholder="CIF / NIF" className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]" defaultValue="B-21449911" />
              <input type="text" placeholder="Dirección completa" className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]" defaultValue="Paseo Marítimo, 8, Punta Umbría" />
              <select className="w-full px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]">
                <option>Zona: Costa oeste</option>
                <option>Zona: Huelva centro</option>
                <option>Zona: Condado</option>
                <option>Zona: Sierra</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-[var(--line)]">
              <button onClick={() => setIsNewClientOpen(false)} className="px-4 py-2 text-[13px] rounded-control border border-[var(--line)]">Cancelar</button>
              <button onClick={() => setIsNewClientOpen(false)} className="px-4 py-2 text-[13px] font-semibold rounded-control bg-brand text-white">Guardar cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
