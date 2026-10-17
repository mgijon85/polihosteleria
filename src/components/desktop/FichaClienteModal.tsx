import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney, formatDate } from '../../utils/formatters';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CreditCard, 
  Tag, 
  ShoppingBag, 
  Receipt, 
  MessageSquare, 
  Briefcase, 
  User, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';

export const FichaClienteModal: React.FC = () => {
  const { 
    selectedClientId, 
    setSelectedClientId, 
    clients, 
    orders, 
    invoices, 
    conversations, 
    products 
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'resumen' | 'condiciones' | 'pedidos' | 'habituales' | 'facturas' | 'conversaciones' | 'visitas' | 'contactos'
  >('resumen');

  const client = clients.find(c => c.id === selectedClientId);
  if (!selectedClientId || !client) return null;

  // Filter client's orders
  const clientOrders = orders.filter(o => o.clientId === client.id);
  const clientInvoices = invoices.filter(i => i.clientId === client.id);
  const clientConv = conversations.find(c => c.clientId === client.id);

  // Sample habitual items
  const habitualItems = products.slice(0, 5);

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'condiciones', label: 'Condiciones' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'habituales', label: 'Artículos habituales' },
    { id: 'facturas', label: 'Facturas y cobros' },
    { id: 'conversaciones', label: 'Conversaciones' },
    { id: 'visitas', label: 'Visitas comercial' },
    { id: 'contactos', label: 'Contactos y notas' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span
              className={`w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 ${
                client.health === 'normal'
                  ? 'bg-emerald-500'
                  : client.health === 'cooling'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[19px] font-bold text-[var(--text)]">{client.name}</h2>
                <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] font-medium capitalize">
                  {client.type}
                </span>
              </div>
              <div className="text-[13px] text-[var(--muted)] mt-0.5 flex items-center gap-3">
                <span>{client.cif}</span>
                <span>·</span>
                <span>{client.city} ({client.zone})</span>
                <span>·</span>
                <span>Comercial: {client.salesRepName}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedClientId(null)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-[var(--line)] flex items-center gap-1 overflow-x-auto bg-[var(--surface-2)]/60 text-[13px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2.5 font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-brand text-brand font-semibold'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: RESUMEN */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              {/* Summary punchline */}
              <div className="p-5 rounded-card bg-brand-soft border border-brand/20">
                <div className="text-[12px] font-semibold text-brand uppercase tracking-wider mb-1">
                  Diagnóstico automático del cliente
                </div>
                <p className="text-[16px] font-semibold text-[var(--text)] leading-relaxed">
                  «Pide cada {client.orderFrequencyDays} días unos {formatMoney(client.averageTicket)}. {client.health === 'cooling' ? 'Lleva 19 días sin pedir, un 20 % menos este mes.' : client.health === 'debt_risk' ? 'Superó su límite de crédito con deuda vencida pendiente.' : 'Consumo estable y pago al corriente.'}»
                </p>
              </div>

              {/* KPI metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                  <div className="text-[11px] text-[var(--muted)]">Ventas 12 meses</div>
                  <div className="text-[16px] font-bold tabular-nums mt-0.5">{formatMoney(client.annualSales)}</div>
                </div>
                <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                  <div className="text-[11px] text-[var(--muted)]">Ticket medio</div>
                  <div className="text-[16px] font-bold tabular-nums mt-0.5">{formatMoney(client.averageTicket)}</div>
                </div>
                <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                  <div className="text-[11px] text-[var(--muted)]">Saldo pendiente</div>
                  <div className={`text-[16px] font-bold tabular-nums mt-0.5 ${client.overdueBalance > 0 ? 'text-rose-600' : ''}`}>
                    {formatMoney(client.currentBalance)}
                  </div>
                </div>
                <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                  <div className="text-[11px] text-[var(--muted)]">Último pedido</div>
                  <div className="text-[16px] font-bold tabular-nums mt-0.5">Hace {client.daysSinceLastOrder} días</div>
                </div>
              </div>

              {/* Recent activity snippet */}
              <div className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] space-y-2">
                <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                  Días de entrega asignados
                </div>
                <div className="flex gap-2">
                  {client.deliveryDays.map(d => (
                    <span key={d} className="px-2.5 py-1 rounded-control bg-[var(--surface)] border border-[var(--line)] text-[12px] font-semibold text-brand">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONDICIONES */}
          {activeTab === 'condiciones' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1">
                <span className="text-[11px] text-[var(--muted)]">Tarifa de precios:</span>
                <div className="text-[15px] font-bold text-brand">{client.tierName}</div>
                <p className="text-[12px] text-[var(--muted)]">Descuento general aplicado automáticamente en catálogo.</p>
              </div>

              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1">
                <span className="text-[11px] text-[var(--muted)]">Límite de crédito:</span>
                <div className="text-[15px] font-bold tabular-nums">{formatMoney(client.creditLimit)}</div>
                <p className="text-[12px] text-[var(--muted)]">Saldo actual: {formatMoney(client.currentBalance)}</p>
              </div>

              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1">
                <span className="text-[11px] text-[var(--muted)]">Forma de pago:</span>
                <div className="text-[15px] font-bold capitalize">{client.paymentTerm.replace('_', ' ')}</div>
                <p className="text-[12px] text-[var(--muted)]">Facturación mensual agrupada con giro SEPA.</p>
              </div>

              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1">
                <span className="text-[11px] text-[var(--muted)]">Pedido mínimo / Portes gratis:</span>
                <div className="text-[15px] font-bold tabular-nums">{formatMoney(client.minOrder)} / 80,00 €</div>
                <p className="text-[12px] text-[var(--muted)]">Portes de 6,50 € si el pedido es inferior a 80 €.</p>
              </div>
            </div>
          )}

          {/* TAB 3: PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Historial de pedidos ({clientOrders.length})
              </div>
              {clientOrders.length === 0 ? (
                <div className="p-6 text-center text-[13px] text-[var(--muted)]">No hay pedidos registrados hoy.</div>
              ) : (
                <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-card overflow-hidden">
                  {clientOrders.map(o => (
                    <div key={o.id} className="p-3.5 bg-[var(--surface)] flex items-center justify-between text-[13px]">
                      <div>
                        <div className="font-semibold">{o.orderNumber} · {formatDate(o.createdAt)}</div>
                        <div className="text-[11px] text-[var(--muted)]">{o.lines.length} artículos · Canal: {o.channel}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold tabular-nums">{formatMoney(o.total)}</div>
                        <span className="text-[11px] font-medium text-emerald-600 capitalize">{o.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HABITUALES */}
          {activeTab === 'habituales' && (
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Artículos que pide con más frecuencia
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {habitualItems.map(p => (
                  <div key={p.id} className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-semibold">{p.name}</div>
                      <div className="text-[11px] text-[var(--muted)]">{p.format} · Ref: {p.sku}</div>
                    </div>
                    <span className="text-[13px] font-bold tabular-nums text-brand">{formatMoney(p.generalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FACTURAS */}
          {activeTab === 'facturas' && (
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Facturas emitidas y saldos
              </div>
              {clientInvoices.length === 0 ? (
                <div className="p-6 text-center text-[13px] text-[var(--muted)]">No hay facturas pendientes.</div>
              ) : (
                <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-card overflow-hidden">
                  {clientInvoices.map(inv => (
                    <div key={inv.id} className="p-3.5 bg-[var(--surface)] flex items-center justify-between text-[13px]">
                      <div>
                        <div className="font-semibold">{inv.invoiceNumber} ({inv.series})</div>
                        <div className="text-[11px] text-[var(--muted)]">Fecha: {inv.date} · Vencimiento: {inv.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold tabular-nums">{formatMoney(inv.total)}</div>
                        <span className={`text-[11px] font-bold ${inv.status === 'cobrada' ? 'text-emerald-600' : inv.status === 'vencida' ? 'text-rose-600' : 'text-amber-600'}`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CONVERSACIONES */}
          {activeTab === 'conversaciones' && (
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Hilo unificado de mensajes (WhatsApp, Teléfono, Correo)
              </div>
              {clientConv ? (
                <div className="space-y-2 max-h-72 overflow-y-auto p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                  {clientConv.messages.map(m => (
                    <div key={m.id} className={`p-3 rounded-card text-[13px] max-w-[85%] ${m.sender === 'client' ? 'bg-[var(--surface)] border border-[var(--line)]' : 'bg-brand text-white ml-auto'}`}>
                      <div className="text-[10px] font-bold opacity-75 mb-1">{m.senderName} · {m.timestamp}</div>
                      <p>{m.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-[13px] text-[var(--muted)]">Sin conversaciones registradas esta semana.</div>
              )}
            </div>
          )}

          {/* TAB 7: VISITAS */}
          {activeTab === 'visitas' && (
            <div className="space-y-3 text-[13px]">
              <div className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] space-y-1">
                <div className="font-semibold text-brand">Próxima visita programada:</div>
                <div>Lunes 21 de octubre a las 11:30 con {client.salesRepName}.</div>
                <div className="text-[11px] text-[var(--muted)]">Objetivo: Presentar promoción de celulosa ecológica y negociar reposición de vajilla.</div>
              </div>
              <div className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface)] space-y-1 text-[12px] text-[var(--muted)]">
                <strong>Última visita registrada:</strong> 02 de octubre. Pedido cerrado de 310,00 €. Cobrado con tarjeta Tap to Pay.
              </div>
            </div>
          )}

          {/* TAB 8: CONTACTOS Y NOTAS */}
          {activeTab === 'contactos' && (
            <div className="space-y-4 text-[13px]">
              <div className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] space-y-2">
                <div className="font-semibold text-[14px]">{client.contactPerson}</div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <Phone className="w-4 h-4 text-brand" /> {client.phone}
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <Mail className="w-4 h-4 text-brand" /> {client.email}
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <MapPin className="w-4 h-4 text-brand" /> {client.address}, {client.city}
                </div>
              </div>

              <div className="p-4 rounded-card border border-amber-500/20 bg-amber-500/10 space-y-1 text-amber-900 dark:text-amber-200">
                <div className="font-semibold">Notas para reparto:</div>
                <p>{client.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedClientId(null)}
            className="px-5 py-2 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
