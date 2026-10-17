import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { MobileContainer } from './MobileContainer';
import { 
  ShoppingBag, 
  RotateCcw, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  Clock, 
  MessageSquare, 
  FileText, 
  Truck, 
  Sparkles, 
  Star,
  MapPin,
  CreditCard,
  Download
} from 'lucide-react';

export const PortalCliente: React.FC = () => {
  const { products, addNewOrder, addToast, invoices } = useApp();

  const [activeSection, setActiveSection] = useState<'inicio' | 'catalogo' | 'pedidos' | 'facturas'>('inicio');

  // Cart
  const [cartItems, setCartItems] = useState<any[]>([
    {
      productId: products[0].id,
      name: products[0].name,
      format: products[0].format,
      quantity: 2,
      price: 23.28, // Custom price for Bar La Ribera
    },
    {
      productId: products[12].id,
      name: products[12].name,
      format: products[12].format,
      quantity: 1,
      price: 13.50,
    }
  ]);

  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const subtotal = Number(cartItems.reduce((s, it) => s + (it.price * it.quantity), 0).toFixed(2));
  const freeShippingThreshold = 80.00;
  const progressShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, Number((freeShippingThreshold - subtotal).toFixed(2)));

  const handleRepeatLastOrder = () => {
    setIsConfirming(true);
    setTimeout(() => {
      addNewOrder({
        clientId: 'cli-1',
        clientName: 'Bar La Ribera',
        clientZone: 'Costa oeste',
        channel: 'portal',
        subtotal: 96.64,
        shippingFee: 0,
        taxTotal: 20.29,
        total: 116.93,
        lines: [
          { id: 'l1', productId: products[0].id, sku: products[0].sku, name: products[0].name, format: products[0].format, quantity: 2, unitPrice: 24.50, discountPercent: 5, finalPrice: 23.28, total: 46.56, taxRate: 21, taxAmount: 9.78, costPrice: products[0].costPrice, location: 'P01-E01-H01' },
          { id: 'l2', productId: products[12].id, sku: products[12].sku, name: products[12].name, format: products[12].format, quantity: 1, unitPrice: 13.50, discountPercent: 0, finalPrice: 13.50, total: 13.50, taxRate: 21, taxAmount: 2.84, costPrice: products[12].costPrice, location: 'P03-E01-H01' },
        ],
      });
      setIsConfirming(false);
      setActiveSection('pedidos');
      addToast({
        type: 'ok',
        title: '¡Pedido repetido con éxito!',
        message: 'Entregaremos el jueves antes de las 11:00 en Paseo de la Ría, 14.',
      });
    }, 800);
  };

  const handleAddHabitual = (prod: any) => {
    const existing = cartItems.find(it => it.productId === prod.id);
    if (existing) {
      setCartItems(cartItems.map(it => it.productId === prod.id ? { ...it, quantity: it.quantity + 1 } : it));
    } else {
      setCartItems([...cartItems, {
        productId: prod.id,
        name: prod.name,
        format: prod.format,
        quantity: 1,
        price: Number((prod.generalPrice * 0.95).toFixed(2)),
      }]);
    }
    addToast({
      type: 'ok',
      title: 'Añadido al carrito',
      message: `${prod.name} (${prod.format})`,
    });
  };

  return (
    <MobileContainer title="Portal de Cliente · Bar La Ribera">
      <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto">
        {/* Brand Bar */}
        <div className="flex items-center justify-between pb-1 pt-0.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 p-1 bg-white rounded-control border border-[var(--line)] shadow-xs flex items-center justify-center flex-shrink-0">
              <img src="/logo.png" alt="Polihostelería" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-[var(--text)] leading-tight">Polihostelería B2B</div>
              <div className="text-[11px] text-[var(--muted)]">Bar La Ribera · Huelva Costa</div>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-soft text-brand">Tarifa A</span>
        </div>

        {/* Navigation tabs at top for portal */}
        <div className="flex items-center gap-1 p-1 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[12px] font-semibold">
          {[
            { id: 'inicio', label: 'Inicio' },
            { id: 'catalogo', label: 'Catálogo' },
            { id: 'pedidos', label: 'Mis Pedidos' },
            { id: 'facturas', label: 'Facturas' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSection(t.id as any)}
              className={`flex-1 py-1.5 rounded-control transition-all ${
                activeSection === t.id ? 'bg-[var(--surface)] text-brand shadow-xs' : 'text-[var(--muted)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: INICIO */}
        {activeSection === 'inicio' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Delivery alert badge */}
            <div className="p-4 rounded-card bg-brand-soft border border-brand/20 space-y-1">
              <div className="flex items-center gap-1.5 text-brand font-bold text-[13px]">
                <Clock className="w-4 h-4" />
                <span>Próximo reparto de Polihostelería</span>
              </div>
              <p className="text-[14px] font-semibold text-[var(--text)] leading-snug">
                Hola, Bar La Ribera. Tu próximo reparto es el <strong>jueves antes de las 11:00</strong>. Pide antes de las <strong>22:00 del miércoles</strong>.
              </p>
            </div>

            {/* BIG BUTTON: «Repetir mi último pedido» */}
            <button
              type="button"
              disabled={isConfirming}
              onClick={handleRepeatLastOrder}
              className="w-full min-h-[56px] rounded-card bg-brand text-white p-4 font-bold text-[16px] flex items-center justify-between shadow-elevated hover:opacity-95 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div>Repetir mi último pedido</div>
                  <div className="text-[12px] font-normal text-white/80">2 cajas servilletas + 1 caja vasos + lavavajillas</div>
                </div>
              </div>
              <span className="text-[14px] bg-white text-brand px-2.5 py-1 rounded-control font-bold">
                1 toque
              </span>
            </button>

            {/* Mis Habituales */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                <span>Mis artículos habituales</span>
                <span className="text-brand text-[11px] font-bold">Tus precios pactados</span>
              </div>

              <div className="space-y-2">
                {products.slice(0, 4).map(p => (
                  <div key={p.id} className="p-3 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <div className="text-[13px] font-semibold truncate">{p.name}</div>
                      <div className="text-[11px] text-[var(--muted)]">{p.format}</div>
                      <div className="text-[13px] font-bold text-brand tabular-nums mt-0.5">
                        {formatMoney(p.generalPrice * 0.95)} <span className="text-[10px] text-[var(--muted)] font-normal">+IVA</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddHabitual(p)}
                      className="px-3 py-1.5 rounded-control bg-brand text-white text-[12px] font-bold flex items-center gap-1 shadow-xs hover:opacity-95 active:scale-95 transition-all flex-shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Promo banner */}
            <div className="p-4 rounded-card bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[12px] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Oferta de la semana para Punta Umbría</span>
              </div>
              <div className="text-[14px] font-bold text-[var(--text)]">
                Quincena de la Celulosa: -15% en cajas de 2.400 servilletas
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: CATALOGO CON PRECIOS PROPIOS */}
        {activeSection === 'catalogo' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar en el catálogo de Polihostelería..."
                className="w-full pl-9 pr-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px]"
              />
            </div>

            <div className="space-y-2">
              {products.slice(0, 10).map(p => (
                <div key={p.id} className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-[13px] font-semibold">{p.name}</div>
                    <div className="text-[11px] text-[var(--muted)]">{p.format} · Ref: {p.sku}</div>
                    <div className="text-[13px] font-bold text-brand tabular-nums mt-0.5">
                      {formatMoney(p.generalPrice * 0.95)} <span className="text-[10px] text-[var(--muted)] font-normal">+IVA</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddHabitual(p)}
                    className="w-9 h-9 rounded-control bg-brand text-white flex items-center justify-center font-bold shadow-xs hover:opacity-95"
                    aria-label="Añadir al carrito"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: MIS PEDIDOS (CON SEGUIMIENTO EN VIVO) */}
        {activeSection === 'pedidos' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Live tracking banner */}
            <div className="p-4 rounded-card bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  Seguimiento en directo del repartidor
                </span>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">EN RUTA</span>
              </div>
              <div className="text-[15px] font-bold text-[var(--text)]">
                Tu repartidor José está a 3 paradas de Bar La Ribera
              </div>
              <div className="text-[12px] text-[var(--muted)]">
                Hora aproximada de entrega: <strong>10:45</strong> en Paseo de la Ría, 14
              </div>
            </div>

            {/* Past orders list */}
            <div className="space-y-2">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Pedidos recientes
              </div>

              {[
                { number: 'PED-2026-0841', date: 'Hoy', total: 96.64, status: 'En reparto' },
                { number: 'PED-2026-0792', date: '10 oct', total: 245.50, status: 'Entregado' },
                { number: 'PED-2026-0710', date: '03 oct', total: 180.20, status: 'Entregado' },
              ].map((po, idx) => (
                <div key={idx} className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-bold">{po.number}</div>
                    <div className="text-[11px] text-[var(--muted)]">Fecha: {po.date} · Estado: <strong className="text-emerald-600">{po.status}</strong></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-bold tabular-nums">{formatMoney(po.total)}</div>
                    <button
                      onClick={handleRepeatLastOrder}
                      className="text-[11px] text-brand font-bold hover:underline"
                    >
                      Repetir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: FACTURAS */}
        {activeSection === 'facturas' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
              Mis facturas y justificantes
            </div>

            <div className="space-y-2">
              {invoices.filter(i => i.clientId === 'cli-1' || i.id === 'inv-4').map(inv => (
                <div key={inv.id} className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-bold">{inv.invoiceNumber}</div>
                    <div className="text-[11px] text-[var(--muted)]">Fecha: {inv.date} · Con QR Veri*factu</div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-bold tabular-nums text-[13px]">{formatMoney(inv.total)}</span>
                    <button
                      type="button"
                      onClick={() => addToast({ type: 'ok', title: 'Descargando factura', message: 'PDF oficial de Polihostelería descargado.' })}
                      className="p-1.5 rounded-control bg-[var(--surface)] border border-[var(--line)] text-brand"
                      title="Descargar PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Floating WhatsApp Button: «Pedir por WhatsApp» */}
      <a
        href="#whatsapp"
        onClick={(e) => {
          e.preventDefault();
          addToast({
            type: 'ok',
            title: 'Abriendo WhatsApp Business Polihostelería',
            message: 'Escribe o envía una nota de voz; la IA creará tu pedido automáticamente.',
          });
        }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold text-[13px] shadow-elevated hover:opacity-95 active:scale-95 transition-all select-none"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span>Pedir por WhatsApp</span>
      </a>
    </MobileContainer>
  );
};
