import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  Settings, 
  Building, 
  Clock, 
  Truck, 
  CreditCard, 
  Database, 
  Check, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { XgestEvoWizardModal } from './XgestEvoWizardModal';

export const AjustesView: React.FC = () => {
  const { isXgestEvoModalOpen, setIsXgestEvoModalOpen, addToast } = useApp();

  const [cutoffTime, setCutoffTime] = useState('22:00');
  const [minOrder, setMinOrder] = useState(80);
  const [shippingFee, setShippingFee] = useState(6.50);

  const [integrations, setIntegrations] = useState([
    { id: 'stripe', name: 'Stripe Tap to Pay', desc: 'Cobro contactless en el móvil de repartidores y comerciales', connected: true },
    { id: 'whatsapp', name: 'WhatsApp Business API (Meta)', desc: 'Recepción de audios, envío de pedidos y facturas', connected: true },
    { id: 'bank', name: 'Banca Online SEPA (CaixaBank)', desc: 'Emisión de cuadernos 19.14 y conciliación de remesas', connected: true },
    { id: 'accounting', name: 'Contabilidad A3 / ContaPlus', desc: 'Exportación periódica de asientos de ventas y compras', connected: true },
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'ok',
      title: 'Ajustes guardados correctamente',
      message: 'Los parámetros operativos se han actualizado en todo el sistema.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand" />
            <span>Ajustes Generales y Configuración</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Parámetros operativos, corte de pedidos, integraciones y asistente de migración
          </p>
        </div>

        {/* Migrar desde XgestEvo CTA */}
        <button
          type="button"
          onClick={() => setIsXgestEvoModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-amber-500 text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <Database className="w-4 h-4" />
          <span>Importar desde XgestEvo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSaveSettings} className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-5">
            {/* Logotipo Oficial */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-control border border-[var(--line)] shadow-xs flex items-center justify-center p-1.5 flex-shrink-0">
                  <img src="/logo.png" alt="Logotipo Polihostelería" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[var(--text)]">Logotipo oficial de Polihostelería</div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">
                    Aplicado en la barra superior, albaranes, facturas Veri*factu, catálogo y apps móviles.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToast({ type: 'ok', title: 'Logotipo actualizado', message: 'El logo oficial se ha cargado correctamente en todos los canales.' })}
                className="px-3.5 py-1.5 rounded-control text-[12px] font-bold bg-brand text-white hover:opacity-90 transition-opacity self-start sm:self-auto"
              >
                Logotipo cargado ✓
              </button>
            </div>

            <h3 className="text-[16px] font-bold text-[var(--text)] flex items-center gap-2">
              <Building className="w-4 h-4 text-brand" />
              <span>Datos fiscales de la empresa</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div>
                <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Razón Social</label>
                <input type="text" defaultValue="Polihostelería S.L." className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-medium" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">CIF</label>
                <input type="text" defaultValue="B-21448899" className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-mono font-medium" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Domicilio almacén central</label>
                <input type="text" defaultValue="Polígono Pesquero Norte, Nave 14" className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-medium" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Población</label>
                <input type="text" defaultValue="21001 Huelva" className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-medium" />
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] space-y-4">
              <h3 className="text-[16px] font-bold text-[var(--text)] flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" />
                <span>Horario de corte y logística</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
                <div>
                  <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Hora de corte pedidos</label>
                  <input
                    type="time"
                    value={cutoffTime}
                    onChange={(e) => setCutoffTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-bold tabular-nums"
                  />
                  <span className="text-[10px] text-[var(--muted)]">Lo pedido antes sale mañana</span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Pedido mínimo portes gratis</label>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-bold tabular-nums"
                    />
                    <span className="font-bold">€</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[var(--muted)] uppercase">Portes pedidos inferiores</label>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      step="0.5"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-control border border-[var(--line)] bg-[var(--surface-2)] font-bold tabular-nums"
                    />
                    <span className="font-bold">€</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 shadow-sm"
              >
                Guardar ajustes
              </button>
            </div>
          </form>
        </div>

        {/* Integrations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
            <h3 className="text-[16px] font-bold text-[var(--text)] flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-brand" />
              <span>Integraciones activas</span>
            </h3>

            <div className="space-y-3">
              {integrations.map((it) => (
                <div key={it.id} className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[var(--text)]">{it.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                        CONECTADO
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)] leading-snug">{it.desc}</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <XgestEvoWizardModal />
    </div>
  );
};
