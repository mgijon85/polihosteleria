import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { formatMoney, formatTime, formatDate } from '../../utils/formatters';
import { 
  Search, 
  Filter, 
  Plus, 
  Moon, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  PhoneCall, 
  Globe, 
  Mail, 
  Briefcase, 
  Building,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { RevisarPedidoModal } from './RevisarPedidoModal';
import { DetallePedidoDrawer } from './DetallePedidoDrawer';
import { NuevoPedidoModal } from './NuevoPedidoModal';

export const PedidosView: React.FC = () => {
  const { 
    orders, 
    reviewingOrderId, 
    setReviewingOrderId, 
    selectedOrderId, 
    setSelectedOrderId, 
    setIsNewOrderModalOpen 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'todos' | 'por_revisar' | 'de_noche'>('todos');
  const [selectedChannel, setSelectedChannel] = useState<string>('todos');
  const [selectedRoute, setSelectedRoute] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Counts for filter chips
  const countPorRevisar = orders.filter(o => o.status === 'por_revisar').length;
  const countDeNoche = orders.filter(o => o.isNightOrder).length;

  const routes = ['Huelva centro', 'Huelva norte', 'Costa oeste', 'Costa este', 'Condado', 'Sierra'];

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      // Main chip
      if (activeFilter === 'por_revisar' && o.status !== 'por_revisar') return false;
      if (activeFilter === 'de_noche' && !o.isNightOrder) return false;

      // Channel filter
      if (selectedChannel !== 'todos' && o.channel !== selectedChannel) return false;

      // Route filter
      if (selectedRoute !== 'todos' && !o.routeName.toLowerCase().includes(selectedRoute.toLowerCase())) return false;

      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesClient = o.clientName.toLowerCase().includes(term);
        const matchesNumber = o.orderNumber.toLowerCase().includes(term);
        if (!matchesClient && !matchesNumber) return false;
      }

      return true;
    });
  }, [orders, activeFilter, selectedChannel, selectedRoute, searchTerm]);

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'whatsapp':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'telefono_ia':
        return <PhoneCall className="w-3.5 h-3.5 text-brand" />;
      case 'portal':
        return <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
      case 'correo':
        return <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case 'comercial':
        return <Briefcase className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      default:
        return <Building className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const getChannelLabel = (ch: string) => {
    switch (ch) {
      case 'whatsapp': return 'WhatsApp';
      case 'telefono_ia': return 'Teléfono IA';
      case 'portal': return 'Portal web';
      case 'correo': return 'Correo';
      case 'comercial': return 'Comercial';
      default: return 'Oficina';
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'por_revisar':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-3 h-3" /> Por revisar
          </span>
        );
      case 'confirmado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Confirmado
          </span>
        );
      case 'en_preparacion':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
            En preparación
          </span>
        );
      case 'preparado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            Preparado
          </span>
        );
      case 'en_reparto':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
            En reparto
          </span>
        );
      case 'entregado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Entregado
          </span>
        );
      case 'facturado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-500/10 text-neutral-600 dark:text-neutral-400">
            Facturado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Top Banner: Hora de corte + Header action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--surface)] p-5 rounded-card border border-[var(--line)] shadow-resting">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-bold text-[var(--text)]">
              Bandeja unificada de pedidos
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-brand-soft text-brand tabular-nums">
              {orders.length} hoy
            </span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[var(--muted)]">
            <Clock className="w-3.5 h-3.5 text-brand" />
            <span>Lo pedido antes de las <strong>22:00</strong> sale mañana en ruta</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsNewOrderModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo pedido manual</span>
        </button>
      </div>

      {/* Filter bar: Chips + Channel + Route + Search */}
      <div className="bg-[var(--surface)] p-4 rounded-card border border-[var(--line)] shadow-resting space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Main chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveFilter('todos')}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === 'todos'
                  ? 'bg-brand text-white font-semibold'
                  : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              Todos ({orders.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('por_revisar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === 'por_revisar'
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Por revisar ({countPorRevisar})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('de_noche')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === 'de_noche'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/20'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>De noche ({countDeNoche})</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar cliente o pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] text-[var(--text)] placeholder-[var(--muted)] focus:border-brand"
            />
          </div>
        </div>

        {/* Secondary filters row: Channel & Route dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--line)] text-[12px]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--muted)] font-medium">Canal:</span>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-2.5 py-1 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] text-[12px] font-medium"
            >
              <option value="todos">Todos los canales</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telefono_ia">Teléfono IA</option>
              <option value="portal">Portal web</option>
              <option value="correo">Correo</option>
              <option value="comercial">Comercial</option>
              <option value="oficina">Oficina</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[var(--muted)] font-medium">Ruta:</span>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-2.5 py-1 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] text-[12px] font-medium"
            >
              <option value="todos">Todas las rutas</option>
              {routes.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {(selectedChannel !== 'todos' || selectedRoute !== 'todos' || searchTerm !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedChannel('todos');
                setSelectedRoute('todos');
                setSearchTerm('');
              }}
              className="text-brand hover:underline font-medium text-[11px]"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] text-[var(--muted)] flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <div className="text-[15px] font-semibold text-[var(--text)]">No se encontraron pedidos</div>
            <p className="text-[13px] text-[var(--muted)] max-w-sm mx-auto">
              No hay pedidos que coincidan con los filtros seleccionados. Intenta cambiar el filtro o el término de búsqueda.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Hora</th>
                  <th className="py-3 px-4">Canal</th>
                  <th className="py-3 px-4">Pedido / Cliente</th>
                  <th className="py-3 px-4">Ruta</th>
                  <th className="py-3 px-4 text-center">Líneas</th>
                  <th className="py-3 px-4 text-right">Importe</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredOrders.map((ord) => {
                  const isReview = ord.status === 'por_revisar';

                  return (
                    <tr
                      key={ord.id}
                      onClick={() => setSelectedOrderId(ord.id)}
                      className={`hover:bg-[var(--surface-2)] cursor-pointer transition-colors ${
                        isReview ? 'bg-amber-500/[0.03]' : ''
                      }`}
                    >
                      {/* Hora + Noche badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold tabular-nums text-[var(--text)]">
                            {formatTime(ord.createdAt)}
                          </span>
                          {ord.isNightOrder && (
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                              title="Pedido entrado fuera de horario (22:00 - 07:00)"
                            >
                              🌙 Noche
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Canal */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[12px] font-medium">
                          {getChannelIcon(ord.channel)}
                          <span>{getChannelLabel(ord.channel)}</span>
                        </div>
                      </td>

                      {/* Cliente */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[var(--text)]">{ord.clientName}</div>
                        <div className="text-[11px] text-[var(--muted)]">{ord.orderNumber}</div>
                      </td>

                      {/* Ruta */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[var(--muted)]">
                        {ord.routeName}
                      </td>

                      {/* Líneas */}
                      <td className="py-3.5 px-4 text-center tabular-nums text-[var(--muted)]">
                        {ord.lines.length}
                      </td>

                      {/* Importe */}
                      <td className="py-3.5 px-4 text-right font-bold tabular-nums text-[var(--text)]">
                        {formatMoney(ord.total)}
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(ord.status)}
                      </td>

                      {/* Acción */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        {isReview ? (
                          <button
                            type="button"
                            onClick={() => setReviewingOrderId(ord.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-control bg-amber-500 text-white text-[12px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs ml-auto"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Revisar IA</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedOrderId(ord.id)}
                            className="p-1.5 rounded-control text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors inline-block"
                            title="Ver detalle completo"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals and Drawers */}
      <RevisarPedidoModal />
      <DetallePedidoDrawer />
      <NuevoPedidoModal />
    </div>
  );
};
