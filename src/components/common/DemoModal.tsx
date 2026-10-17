import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const DemoModal: React.FC = () => {
  const { 
    isDemoModalOpen, 
    setIsDemoModalOpen, 
    setRole, 
    setActiveTab, 
    setDeviceMode,
    triggerSimulation,
    setReviewingOrderId,
    addToast
  } = useApp();

  if (!isDemoModalOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Entra un pedido por WhatsApp a medianoche',
      description: 'Un bar manda una nota de voz a las 23:40. La IA la transcribe y crea el pedido con la marca 🌙 Noche sin despertar a nadie.',
      actionLabel: 'Simular audio WhatsApp',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('direccion');
        triggerSimulation('whatsapp_night');
      }
    },
    {
      num: 2,
      title: 'Inicio de Dirección (Juanlu abre el día)',
      description: 'Frase con números: 63 pedidos hoy, los de noche, los 3 asuntos urgentes que decidir y los clientes que se enfrían.',
      actionLabel: 'Ir al Inicio de Juanlu',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('direccion');
        setActiveTab('inicio');
        addToast({ type: 'info', title: 'Paso 2: Inicio de Juanlu', message: 'Observa la frase de resumen y las 3 decisiones de la mañana.' });
      }
    },
    {
      num: 3,
      title: 'Oficina revisa los pedidos con dudas en 1 min',
      description: 'Bandeja única de pedidos. Rocío abre el pedido con audio y confirma la interpretación de la IA.',
      actionLabel: 'Abrir bandeja y revisar',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('oficina');
        setActiveTab('pedidos');
        setReviewingOrderId('ord-101');
        addToast({ type: 'info', title: 'Paso 3: Revisión de pedidos', message: 'Revisa el audio original a la izquierda y las líneas a la derecha.' });
      }
    },
    {
      num: 4,
      title: 'Almacén prepara la ruta de la Costa en tablet',
      description: 'Paco, en su tablet, ve la lista ordenada por pasillo/estantería y marca líneas con botones grandes de 44px.',
      actionLabel: 'Abrir tablet de almacén',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('almacen');
        setActiveTab('preparacion');
        addToast({ type: 'info', title: 'Paso 4: Picking en Tablet', message: 'Botones táctiles grandes de 44px preparados para guantes.' });
      }
    },
    {
      num: 5,
      title: 'Comercial en la calle: pedido y cobro Tap to Pay',
      description: 'Antonio visita Bar La Ribera, repite el último pedido en 1 toque, firma con el dedo y cobra con tarjeta.',
      actionLabel: 'Abrir App Comercial móvil',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('comercial');
        setDeviceMode('mobile');
        addToast({ type: 'info', title: 'Paso 5: App Móvil Comercial', message: 'Pulsa en "Pedido" para hacer un pedido y probar Tap to Pay.' });
      }
    },
    {
      num: 6,
      title: 'Repartidor entrega, cobra y cuadra caja',
      description: 'José llega a la parada, marca la entrega, cobra y la caja del día cuadra automáticamente con oficina.',
      actionLabel: 'Abrir App Repartidor móvil',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('repartidor');
        setDeviceMode('mobile');
        addToast({ type: 'info', title: 'Paso 6: App Móvil Repartidor', message: 'Entra en la primera parada y pulsa "Completar entrega y cobro".' });
      }
    },
    {
      num: 7,
      title: 'Facturación automática con Veri*factu y cobros',
      description: 'Albaranes agrupados quincenales, factura con código QR Veri*factu y recordatorio de impago por WhatsApp.',
      actionLabel: 'Ver Facturas y Cobros',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('direccion');
        setActiveTab('facturas');
        addToast({ type: 'info', title: 'Paso 7: Facturas Veri*factu', message: 'Inspecciona los albaranes agrupados y el QR fiscal.' });
      }
    },
    {
      num: 8,
      title: 'Portal del cliente: repetir pedido en 10 segundos',
      description: 'El dueño del Bar La Ribera entra desde su móvil y repite su pedido habitual con un solo toque.',
      actionLabel: 'Abrir Portal de Bar La Ribera',
      run: () => {
        setIsDemoModalOpen(false);
        setRole('cliente');
        setDeviceMode('mobile');
        addToast({ type: 'info', title: 'Paso 8: Portal del Cliente', message: 'Pulsa el botón "Repetir mi último pedido".' });
      }
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-white border border-[var(--line)] shadow-xs flex items-center justify-center p-1">
              <img src="/logo.png" alt="Polihostelería" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-bold leading-tight">Guion de la Demo (5 minutos)</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-soft text-brand">Polihostelería</span>
              </div>
              <p className="text-[13px] text-[var(--muted)]">Recorrido completo sin pantallas vacías ni esperas</p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-brand text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                  {st.num}
                </span>
                <div>
                  <h4 className="text-[14px] font-semibold">{st.title}</h4>
                  <p className="text-[13px] text-[var(--muted)] mt-0.5 leading-snug">{st.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={st.run}
                className="self-end sm:self-center flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-control bg-brand text-white text-[13px] font-medium hover:opacity-95 active:scale-95 transition-all shadow-sm"
              >
                <span>{st.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-[12px] text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Prototipo interactivo 100% navegable con datos de Huelva</span>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="px-4 py-2 text-[13px] font-medium rounded-control border border-[var(--line)] hover:bg-[var(--surface-2)] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
