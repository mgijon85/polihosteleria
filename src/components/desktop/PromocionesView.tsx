import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  Tag, 
  Calendar, 
  Smartphone, 
  MessageSquare, 
  Check, 
  Sparkles, 
  Users,
  Eye,
  Send
} from 'lucide-react';

export const PromocionesView: React.FC = () => {
  const { addToast } = useApp();

  const promos = [
    {
      id: 'promo-1',
      title: 'Quincena de la Celulosa Ecológica',
      startDate: '15 oct',
      endDate: '31 oct',
      targetGroup: 'Bares y Restaurantes (Costa y Huelva Centro)',
      discountText: '15 % de descuento por la compra de 3 o más cajas',
      featuredProduct: 'Servilleta 2 capas 33x33 blanca punta punta',
      promoPrice: 20.82,
      regularPrice: 24.50,
      active: true,
      whatsappTemplate: '«¡Hola Manuel! Esta quincena tienes un 15% de descuento en tus servilletas 33x33 de siempre si pides 3 cajas o más (te salen a 20,82 €/caja). Te lo llevamos el jueves sin portes. ¿Te las apunto?»',
    },
    {
      id: 'promo-2',
      title: 'Pack Brillo Cristalería Caña',
      startDate: '01 oct',
      endDate: '30 oct',
      targetGroup: 'Todos los clientes',
      discountText: 'Por 2 cajas de vasos caña 22 cl, 1 abrillantador 5L a mitad de precio',
      featuredProduct: 'Vaso caña cortado 22 cl (Caja 24 ud)',
      promoPrice: 17.80,
      regularPrice: 17.80,
      active: true,
      whatsappTemplate: '«Buenas! Aprovecha este mes: por cada 2 cajas de vasos de caña te llevas la garrafa de abrillantador a mitad de precio (8,25 €). Ideal para renovar cristalería.»',
    },
  ];

  const [selectedPromo, setSelectedPromo] = useState(promos[0]);

  const handleSendTestWhatsApp = () => {
    addToast({
      type: 'ok',
      title: 'WhatsApp de prueba enviado',
      message: 'Se ha enviado la vista previa a tu teléfono de demostración.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
          <Tag className="w-5 h-5 text-brand" />
          <span>Campañas y Promociones Activas</span>
        </h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          Ofertas automáticas en catálogo del cliente y lanzamientos segmentados por WhatsApp
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Promos List (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
            Promociones configuradas ({promos.length})
          </div>

          <div className="space-y-3">
            {promos.map((p) => {
              const isSelected = p.id === selectedPromo.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPromo(p)}
                  className={`p-5 rounded-panel border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand bg-[var(--surface)] shadow-elevated'
                      : 'border-[var(--line)] bg-[var(--surface)] hover:border-brand/40 shadow-resting'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[var(--text)]">{p.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                          ACTIVA
                        </span>
                      </div>
                      <div className="text-[12px] text-[var(--muted)] flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Vigencia: {p.startDate} al {p.endDate}</span>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-brand tabular-nums">
                      {p.discountText.split(' ')[0]} {p.discountText.split(' ')[1]}
                    </span>
                  </div>

                  <div className="mt-3 p-3 rounded-card bg-[var(--surface-2)] text-[12px] space-y-1">
                    <div><strong>A quién se aplica:</strong> {p.targetGroup}</div>
                    <div><strong>Artículo destacado:</strong> {p.featuredProduct}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Previews: Portal & WhatsApp (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Preview en Portal del Cliente */}
          <div className="bg-[var(--surface)] p-5 rounded-panel border border-[var(--line)] shadow-resting space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-brand" />
                Cómo lo ve el cliente en su móvil (Portal web)
              </span>
              <span className="text-[11px] text-[var(--muted)]">Vista previa en tiempo real</span>
            </div>

            <div className="p-4 rounded-card bg-gradient-to-r from-brand-soft to-indigo-500/10 border border-brand/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                  🔥 OFERTA EXCLUSIVA PARA TU BAR
                </span>
                <span className="text-[11px] text-[var(--muted)]">Hasta el {selectedPromo.endDate}</span>
              </div>
              <h4 className="text-[16px] font-bold text-[var(--text)]">{selectedPromo.title}</h4>
              <p className="text-[13px] text-[var(--muted)]">{selectedPromo.discountText}</p>

              <div className="p-3 rounded-control bg-[var(--surface)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold">{selectedPromo.featuredProduct}</div>
                  <div className="text-[11px] text-[var(--muted)]">Precio especial promo:</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-bold text-brand tabular-nums">{formatMoney(selectedPromo.promoPrice)}</div>
                  <div className="text-[11px] text-[var(--muted)] line-through tabular-nums">{formatMoney(selectedPromo.regularPrice)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Preview del WhatsApp que recibiría el cliente */}
          <div className="bg-[var(--surface)] p-5 rounded-panel border border-[var(--line)] shadow-resting space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Mensaje de WhatsApp automático que recibe
              </span>
              <button
                type="button"
                onClick={handleSendTestWhatsApp}
                className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Enviar prueba</span>
              </button>
            </div>

            <div className="p-4 rounded-card bg-[#E7F8E8] dark:bg-[#1A3828] border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
                <span>Polihostelería WhatsApp Business</span>
                <span>Hoy 10:15</span>
              </div>
              <p className="text-[13px] text-neutral-800 dark:text-neutral-100 leading-relaxed font-sans">
                {selectedPromo.whatsappTemplate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
