import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  ShoppingBag, 
  Boxes, 
  Truck, 
  Users, 
  Briefcase, 
  Tag, 
  Package, 
  Receipt, 
  Warehouse, 
  ShoppingCart, 
  FileText, 
  CreditCard, 
  Bot, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Settings,
  AlertCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    orders, 
    invoices, 
    role, 
    decisions 
  } = useApp();

  // Badges counts
  const pendingReviewOrdersCount = orders.filter(o => o.status === 'por_revisar').length;
  const overdueInvoicesCount = invoices.filter(i => i.status === 'vencida').length;
  const pendingDecisionsCount = decisions.length;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: 'brand' | 'warn' | 'danger';
    hideFor?: string[];
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      title: 'Principal',
      items: [
        { 
          id: 'inicio', 
          label: 'Inicio', 
          icon: Home, 
          badge: role === 'direccion' && pendingDecisionsCount > 0 ? pendingDecisionsCount : undefined,
          badgeColor: 'warn'
        },
      ]
    },
    {
      title: 'Día a día',
      items: [
        { 
          id: 'pedidos', 
          label: 'Pedidos', 
          icon: ShoppingBag, 
          badge: pendingReviewOrdersCount > 0 ? pendingReviewOrdersCount : undefined,
          badgeColor: 'brand'
        },
        { id: 'preparacion', label: 'Preparación', icon: Boxes },
        { id: 'reparto', label: 'Reparto', icon: Truck },
      ]
    },
    {
      title: 'Ventas',
      items: [
        { id: 'clientes', label: 'Clientes', icon: Users },
        { id: 'comerciales', label: 'Comerciales', icon: Briefcase },
        { id: 'promociones', label: 'Promociones', icon: Tag },
      ]
    },
    {
      title: 'Catálogo y almacén',
      items: [
        { id: 'articulos', label: 'Artículos', icon: Package },
        { id: 'tarifas', label: 'Tarifas', icon: Receipt },
        { id: 'stock', label: 'Stock', icon: Warehouse },
        { id: 'compras', label: 'Compras y proveedores', icon: ShoppingCart },
      ]
    },
    {
      title: 'Dinero',
      items: [
        { id: 'facturas', label: 'Facturas', icon: FileText },
        { 
          id: 'cobros', 
          label: 'Cobros', 
          icon: CreditCard, 
          badge: overdueInvoicesCount > 0 ? overdueInvoicesCount : undefined,
          badgeColor: 'danger'
        },
      ]
    },
    {
      title: 'Inteligencia artificial',
      items: [
        { id: 'asistentes', label: 'Asistentes', icon: Bot },
        { id: 'conversaciones', label: 'Conversaciones', icon: MessageSquare },
      ]
    },
    {
      title: 'Empresa',
      items: [
        { id: 'informes', label: 'Informes', icon: BarChart3 },
        { id: 'equipo', label: 'Equipo y permisos', icon: ShieldCheck },
        { id: 'ajustes', label: 'Ajustes', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[var(--surface)] border-r border-[var(--line)] flex flex-col justify-between overflow-y-auto select-none py-4 px-3">
      <div className="space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 text-[11px] font-semibold text-[var(--muted)] tracking-wider uppercase">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-control text-[13px] font-medium transition-all ${
                      isActive
                        ? 'bg-brand-soft text-brand font-semibold shadow-xs'
                        : 'text-[var(--text)] hover:bg-[var(--surface-2)] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-brand' : 'text-[var(--muted)]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-full tabular-nums ${
                          item.badgeColor === 'danger'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                            : item.badgeColor === 'warn'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-brand text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User profile card at bottom */}
      <div className="mt-6 pt-4 border-t border-[var(--line)] px-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[13px] flex-shrink-0">
            {role === 'direccion' ? 'JL' : role === 'oficina' ? 'RC' : 'PQ'}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[13px] font-semibold truncate text-[var(--text)]">
              {role === 'direccion' ? 'Juanlu García' : role === 'oficina' ? 'Rocío Santos' : 'Paco Almacén'}
            </div>
            <div className="text-[11px] text-[var(--muted)] capitalize">
              {role === 'direccion' ? 'Dirección general' : role === 'oficina' ? 'Oficina y clientes' : 'Jefe de almacén'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
