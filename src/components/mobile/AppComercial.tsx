import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { MobileContainer } from './MobileContainer';
import { TapToPayModal } from './TapToPayModal';
import { SignaturePad } from '../common/SignaturePad';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  User, 
  MapPin, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  WifiOff, 
  RotateCcw, 
  Star, 
  Search, 
  Barcode, 
  PenTool, 
  AlertTriangle,
  Phone,
  ChevronRight
} from 'lucide-react';

export const AppComercial: React.FC = () => {
  const { clients, products, addNewOrder, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'hoy' | 'clientes' | 'pedido' | 'cobros' | 'yo'>('hoy');
  const [isOffline, setIsOffline] = useState(false);

  // Pedido state
  const [selectedClientId, setSelectedClientId] = useState<string>('cli-1');
  const [orderLines, setOrderLines] = useState<any[]>([
    {
      productId: products[0].id,
      name: products[0].name,
      format: products[0].format,
      quantity: 2,
      price: products[0].generalPrice,
      total: products[0].generalPrice * 2,
    },
    {
      productId: products[12].id,
      name: products[12].name,
      format: products[12].format,
      quantity: 1,
      price: products[12].generalPrice,
      total: products[12].generalPrice,
    }
  ]);
  const [isTapToPayOpen, setIsTapToPayOpen] = useState(false);
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [signedData, setSignedData] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  // Registered visit state
  const [visitsDoneCount, setVisitsDoneCount] = useState(3);

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const visits = [
    { id: 'v-1', client: 'Bar La Ribera', town: 'Punta Umbría', time: '10:00', obj: 'Ofrecer promo bobinas kraft y cierre de temporada', done: true },
    { id: 'v-2', client: 'Chiringuito El Ancla', town: 'Punta Umbría', time: '11:15', obj: 'Cobrar factura pendiente 142,50 €', done: true },
    { id: 'v-3', client: 'Hostal Las Palmeras', town: 'El Portil', time: '12:30', obj: 'Revisión catálogo menaje terraza', done: true },
    { id: 'v-4', client: 'Restaurante La Plazuela', town: 'Huelva centro', time: '13:30', obj: 'URGENTE: Cliente enfriado (19 días sin pedir)', done: false, isUrgent: true },
    { id: 'v-5', client: 'Cafetería Gran Vía', town: 'Huelva centro', time: '16:00', obj: 'Presentación vajilla porcelana', done: false },
    { id: 'v-6', client: 'Cervecería Bonilla', town: 'Huelva centro', time: '17:15', obj: 'Reposición vasos de caña', done: false },
    { id: 'v-7', client: 'Bar El Puerto', town: 'Isla Cristina', time: '18:30', obj: 'Negociar regularización de deuda', done: false, isUrgent: true },
  ];

  const updateQuantity = (productId: string, delta: number) => {
    setOrderLines(lines => lines.map(l => {
      if (l.productId === productId) {
        const newQty = Math.max(1, l.quantity + delta);
        return { ...l, quantity: newQty, total: Number((newQty * l.price).toFixed(2)) };
      }
      return l;
    }));
  };

  const handleRepeatLast = () => {
    setOrderLines([
      { productId: products[0].id, name: products[0].name, format: products[0].format, quantity: 3, price: products[0].generalPrice, total: products[0].generalPrice * 3 },
      { productId: products[12].id, name: products[12].name, format: products[12].format, quantity: 2, price: products[12].generalPrice, total: products[12].generalPrice * 2 },
    ]);
    addToast({ type: 'info', title: 'Último pedido cargado', message: 'Líneas habituales añadidas al pedido.' });
  };

  const subtotal = Number(orderLines.reduce((s, l) => s + l.total, 0).toFixed(2));
  const shippingFee = subtotal >= 80 ? 0 : 6.50;
  const total = Number((subtotal + shippingFee).toFixed(2));

  const handleCompleteOrder = () => {
    addNewOrder({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      clientZone: selectedClient.zone,
      channel: 'comercial',
      subtotal,
      shippingFee,
      taxTotal: Number((subtotal * 0.21).toFixed(2)),
      total: Number((total * 1.21).toFixed(2)),
    });
    setSignedData(null);
    setIsPaid(false);
    setActiveTab('hoy');
  };

  return (
    <MobileContainer title="App Comercial">
      {/* Offline banner simulation */}
      {isOffline && (
        <div className="bg-amber-500 text-white text-[11px] font-semibold px-4 py-1.5 flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5" />
            Sin conexión: el pedido se enviará al recuperarla
          </span>
          <button onClick={() => setIsOffline(false)} className="underline text-[10px]">Reconectar</button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto">
        {/* TAB 1: HOY */}
        {activeTab === 'hoy' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Greeting & punchline */}
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1">
              <div className="text-[12px] text-[var(--muted)]">Jueves, 17 de octubre</div>
              <h2 className="text-[17px] font-bold text-[var(--text)]">Hola, Antonio</h2>
              <p className="text-[13px] font-medium text-amber-600 dark:text-amber-400">
                Tienes 7 visitas programadas hoy. 2 clientes se están enfriando.
              </p>
            </div>

            {/* Visits list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                <span>Ruta de visitas hoy ({visitsDoneCount}/7)</span>
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className="text-[10px] text-brand hover:underline capitalize"
                >
                  {isOffline ? 'Online' : 'Simular sin conexión'}
                </button>
              </div>

              {visits.map((v) => (
                <div
                  key={v.id}
                  className={`p-3.5 rounded-card border transition-all ${
                    v.done
                      ? 'bg-emerald-500/[0.04] border-emerald-500/25 opacity-75'
                      : v.isUrgent
                      ? 'bg-amber-500/[0.04] border-amber-500/30'
                      : 'bg-[var(--surface-2)] border-[var(--line)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-[var(--text)]">{v.client}</span>
                        <span className="text-[11px] text-[var(--muted)] tabular-nums">{v.time}</span>
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">{v.town}</div>
                      <div className="text-[12px] text-[var(--text)] font-medium mt-1">
                        🎯 {v.obj}
                      </div>
                    </div>

                    {v.done ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" /> Hecha
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedClientId(v.id === 'v-4' ? 'cli-5' : 'cli-1');
                          setActiveTab('pedido');
                        }}
                        className="px-3 py-1.5 rounded-control text-[12px] font-semibold bg-brand text-white hover:opacity-95 flex-shrink-0"
                      >
                        Abrir pedido
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PEDIDO EN EL BAR */}
        {activeTab === 'pedido' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Client Picker */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Cliente en visita:</label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-semibold text-[13px]"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                ))}
              </select>
            </div>

            {/* Quick shortcuts */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleRepeatLast}
                className="flex items-center justify-center gap-1.5 p-2 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[12px] font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand" />
                <span>Repetir último</span>
              </button>
              <button
                type="button"
                onClick={handleRepeatLast}
                className="flex items-center justify-center gap-1.5 p-2 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[12px] font-medium"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Habituales</span>
              </button>
            </div>

            {/* Lines */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-[var(--muted)] uppercase">Artículos del pedido:</div>
              {orderLines.map(l => (
                <div key={l.productId} className="p-3 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-[13px] font-semibold truncate">{l.name}</div>
                    <div className="text-[11px] text-[var(--muted)]">{l.format} · {formatMoney(l.price)}/ud</div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(l.productId, -1)}
                      className="w-8 h-8 rounded-control bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold tabular-nums text-[13px]">{l.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(l.productId, 1)}
                      className="w-8 h-8 rounded-control bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1 text-[12px]">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Subtotal tarifa:</span>
                <span className="tabular-nums">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>Portes:</span>
                <span className="tabular-nums">{shippingFee === 0 ? 'Gratis' : formatMoney(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-[15px] pt-1 border-t border-[var(--line)]">
                <span>Total:</span>
                <span className="tabular-nums text-brand">{formatMoney(total)}</span>
              </div>
            </div>

            {/* Tap to Pay & Signature buttons */}
            <div className="space-y-2 pt-2">
              {!isPaid ? (
                <button
                  type="button"
                  onClick={() => setIsTapToPayOpen(true)}
                  className="w-full min-h-[46px] rounded-control bg-emerald-600 text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cobrar ahora con Tap to Pay ({formatMoney(total)})</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-control bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-[12px] flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" /> Cobro completado con tarjeta
                </div>
              )}

              {/* Signature section */}
              {signedData ? (
                <div className="p-2.5 rounded-control bg-brand-soft border border-brand/20 text-brand font-semibold text-[12px] flex items-center justify-between">
                  <span>✓ Firma del cliente recogida</span>
                  <button onClick={() => setSignedData(null)} className="underline text-[11px]">Cambiar</button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSigningOpen(true)}
                  className="w-full min-h-[44px] rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-semibold flex items-center justify-center gap-1.5"
                >
                  <PenTool className="w-4 h-4 text-brand" />
                  <span>Recoger firma del cliente con el dedo</span>
                </button>
              )}

              {/* Final Submit Order */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full min-h-[48px] rounded-control bg-brand text-white text-[14px] font-bold hover:opacity-95 shadow-md mt-2"
              >
                Enviar pedido a almacén
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CLIENTES */}
        {activeTab === 'clientes' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Mi cartera ({clients.slice(0, 15).length} clientes)
            </div>

            {clients.slice(0, 15).map(c => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedClientId(c.id);
                  setActiveTab('pedido');
                }}
                className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.health === 'normal' ? 'bg-emerald-500' : c.health === 'cooling' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                    <span className="text-[13px] font-bold text-[var(--text)]">{c.name}</span>
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">{c.city} · Saldo: {formatMoney(c.currentBalance)}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: COBROS */}
        {activeTab === 'cobros' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="p-3.5 rounded-card bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <div className="text-[11px] uppercase font-bold">Cobrado hoy en visitas</div>
              <div className="text-[20px] font-extrabold tabular-nums">486,20 €</div>
            </div>

            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Recibos pendientes de mis clientes
            </div>

            {clients.filter(c => c.overdueBalance > 0).slice(0, 4).map(c => (
              <div key={c.id} className="p-3 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold">{c.name}</div>
                  <div className="text-[11px] text-rose-600 font-bold">{formatMoney(c.overdueBalance)} vencido</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedClientId(c.id);
                    setIsTapToPayOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-control text-[12px] font-bold bg-emerald-600 text-white"
                >
                  Cobrar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: YO */}
        {activeTab === 'yo' && (
          <div className="space-y-4 animate-in fade-in text-[13px]">
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] text-center space-y-2">
              <div className="w-16 h-16 bg-white rounded-control border border-[var(--line)] shadow-xs flex items-center justify-center p-2 mx-auto">
                <img src="/logo.png" alt="Polihostelería" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[16px]">Antonio Gómez</h3>
                <p className="text-[12px] text-[var(--muted)]">Comercial Oficial · Polihostelería Huelva</p>
                <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-soft text-brand">
                  Ruta Costa & Huelva Centro
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Ventas del mes:</span>
                <span className="font-bold tabular-nums">48.600 € / 52.000 € (93%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Clientes en cartera:</span>
                <span className="font-bold tabular-nums">34 clientes</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Modal */}
      {isSigningOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--surface)] p-5 rounded-panel max-w-sm w-full space-y-3">
            <h4 className="font-bold text-[15px]">Firma de conformidad de {selectedClient.name}</h4>
            <SignaturePad
              onSave={(data) => {
                setSignedData(data);
                setIsSigningOpen(false);
                addToast({ type: 'ok', title: 'Firma guardada', message: 'Firma vinculada al albarán del pedido.' });
              }}
              onCancel={() => setIsSigningOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Tap to Pay Modal */}
      {isTapToPayOpen && (
        <TapToPayModal
          amount={total}
          clientName={selectedClient.name}
          onSuccess={() => {
            setIsTapToPayOpen(false);
            setIsPaid(true);
            addToast({ type: 'ok', title: 'Cobro completado', message: `Cobrado ${formatMoney(total)} con Tap to Pay.` });
          }}
          onCancel={() => setIsTapToPayOpen(false)}
        />
      )}

      {/* Bottom Navigation Bar: Hoy · Clientes · Pedido · Cobros · Yo */}
      <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--surface)]/90 backdrop-blur-md border-t border-[var(--line)] flex items-center justify-around px-2 z-40 select-none">
        {[
          { id: 'hoy', label: 'Hoy', icon: Home },
          { id: 'clientes', label: 'Clientes', icon: Users },
          { id: 'pedido', label: 'Pedido', icon: ShoppingBag },
          { id: 'cobros', label: 'Cobros', icon: CreditCard },
          { id: 'yo', label: 'Yo', icon: User },
        ].map(item => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-control transition-all ${
                isActive ? 'text-brand font-bold' : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              <IconComp className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </MobileContainer>
  );
};
