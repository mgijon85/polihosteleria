import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { MobileContainer } from './MobileContainer';
import { TapToPayModal } from './TapToPayModal';
import { SignaturePad } from '../common/SignaturePad';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  Camera, 
  Check, 
  AlertTriangle, 
  Wallet, 
  User, 
  CreditCard, 
  Banknote, 
  PenTool, 
  ChevronRight,
  Clock
} from 'lucide-react';

export const AppRepartidor: React.FC = () => {
  const { routes, deliverStopAndCollect, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'ruta' | 'parada' | 'caja' | 'yo'>('ruta');
  const route = routes[0]; // Costa oeste (José Romero)

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const currentStop = route.stops[currentStopIndex] || route.stops[0];

  const [isTapToPayOpen, setIsTapToPayOpen] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isIncidenceOpen, setIsIncidenceOpen] = useState(false);

  const handleCompleteDelivery = () => {
    deliverStopAndCollect(route.id, currentStop.id, currentStop.pendingAmount, currentStop.paymentMethod === 'efectivo' ? 'efectivo' : 'tarjeta');
    setHasSigned(false);
    setHasPhoto(false);
    setPaymentDone(false);

    // Advance to next stop
    if (currentStopIndex < route.stops.length - 1) {
      setCurrentStopIndex(i => i + 1);
      setActiveTab('parada');
    } else {
      setActiveTab('caja');
    }
  };

  const handleCloseCashDrawer = () => {
    addToast({
      type: 'ok',
      title: 'Caja del día cerrada y cuadrada',
      message: 'Parte de liquidación remitido a administración de Polihostelería.',
    });
  };

  return (
    <MobileContainer title="App Repartidor">
      <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto">
        {/* TAB 1: RUTA */}
        {activeTab === 'ruta' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Route summary card */}
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-brand uppercase tracking-wider">
                  Ruta activa: Costa oeste
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                  EN RUTA
                </span>
              </div>
              <h2 className="text-[17px] font-bold text-[var(--text)]">José Romero</h2>
              <div className="text-[12px] text-[var(--muted)]">
                Mercedes Sprinter (4120-JLM) · {route.completedStops} de {route.totalStops} paradas hechas
              </div>
            </div>

            {/* Stops list in delivery order */}
            <div className="space-y-2">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                Paradas de hoy en orden
              </div>

              {route.stops.map((s, idx) => {
                const isDelivered = s.status === 'entregado';
                const isCurrent = idx === currentStopIndex && !isDelivered;

                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setCurrentStopIndex(idx);
                      setActiveTab('parada');
                    }}
                    className={`p-3.5 rounded-card border transition-all cursor-pointer ${
                      isDelivered
                        ? 'bg-emerald-500/[0.04] border-emerald-500/25 opacity-70'
                        : isCurrent
                        ? 'border-brand bg-brand-soft/20 shadow-xs'
                        : 'bg-[var(--surface-2)] border-[var(--line)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--line)] font-bold text-[12px] flex items-center justify-center tabular-nums flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-[14px] font-bold text-[var(--text)]">{s.clientName}</div>
                          <div className="text-[11px] text-[var(--muted)]">{s.address}, {s.city}</div>
                          <div className="text-[11px] text-[var(--muted)] mt-1">
                            {s.packages} bultos · ETA: <strong className="text-[var(--text)]">{s.eta}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        {isDelivered ? (
                          <span className="text-[11px] font-bold text-emerald-600">✓ Entregado</span>
                        ) : (
                          <>
                            <div className="text-[13px] font-bold tabular-nums">
                              {s.pendingAmount > 0 ? formatMoney(s.pendingAmount) : 'Sin cobro'}
                            </div>
                            <span className="text-[10px] uppercase font-semibold text-[var(--muted)]">{s.paymentMethod}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PARADA ACTUAL */}
        {activeTab === 'parada' && currentStop && (
          <div className="space-y-4 animate-in fade-in">
            {/* Header of stop */}
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand uppercase">
                    Parada {currentStopIndex + 1} de {route.stops.length}
                  </span>
                  <h3 className="text-[17px] font-bold mt-0.5">{currentStop.clientName}</h3>
                  <div className="text-[12px] text-[var(--muted)]">{currentStop.contact} ({currentStop.phone})</div>
                </div>

                <button
                  type="button"
                  onClick={() => addToast({ type: 'info', title: 'Abriendo navegador GPS', message: 'Ruta trazada hacia ' + currentStop.address })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-control bg-brand text-white text-[12px] font-semibold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navegar</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[12px] text-[var(--text)] font-medium pt-2 border-t border-[var(--line)]">
                <MapPin className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                <span>{currentStop.address}, {currentStop.city}</span>
              </div>

              {currentStop.notes && (
                <div className="p-2.5 rounded-control bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-200">
                  <strong>Nota del cliente:</strong> {currentStop.notes}
                </div>
              )}
            </div>

            {/* Goods check */}
            <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2">
              <div className="flex justify-between text-[12px] font-semibold uppercase text-[var(--muted)]">
                <span>Mercancía a descargar</span>
                <span>{currentStop.packages} bultos</span>
              </div>
              <div className="text-[13px] font-medium text-[var(--text)]">
                ✓ 2 cajas Servilletas 33x33 blanca punta punta<br />
                ✓ 1 caja Vasos de sidra 50 cl (12 ud)<br />
                ✓ 1 garrafa Detergente lavavajillas 5 L
              </div>
            </div>

            {/* Actions: Photo + Signature + Payment */}
            <div className="space-y-2.5">
              {/* Photo */}
              <button
                type="button"
                onClick={() => {
                  setHasPhoto(true);
                  addToast({ type: 'ok', title: 'Foto de albarán capturada', message: 'Adjuntada al archivo de entrega.' });
                }}
                className={`w-full py-2.5 rounded-control border text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors ${
                  hasPhoto
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                    : 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{hasPhoto ? '✓ Foto de entrega adjunta' : 'Hacer foto del albarán firmado'}</span>
              </button>

              {/* Signature */}
              <button
                type="button"
                onClick={() => setIsSignatureOpen(true)}
                className={`w-full py-2.5 rounded-control border text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors ${
                  hasSigned
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                    : 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)]'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>{hasSigned ? '✓ Firma del receptor recogida' : 'Recoger firma del cliente'}</span>
              </button>

              {/* Payment if pending */}
              {currentStop.pendingAmount > 0 && !paymentDone && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTapToPayOpen(true)}
                    className="py-3 rounded-control bg-emerald-600 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Tap to Pay ({formatMoney(currentStop.pendingAmount)})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentDone(true);
                      addToast({ type: 'ok', title: 'Cobro en efectivo anotado', message: `${formatMoney(currentStop.pendingAmount)} guardados en caja.` });
                    }}
                    className="py-3 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[12px] font-bold flex items-center justify-center gap-1.5"
                  >
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Efectivo</span>
                  </button>
                </div>
              )}

              {/* Incidence button */}
              <button
                type="button"
                onClick={() => setIsIncidenceOpen(true)}
                className="w-full py-2 text-[12px] font-medium text-amber-600 hover:underline flex items-center justify-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Notificar incidencia (Cerrado / Rechaza / Dirección errónea)</span>
              </button>

              {/* Complete Delivery button */}
              <button
                type="button"
                onClick={handleCompleteDelivery}
                className="w-full min-h-[48px] rounded-control bg-brand text-white text-[14px] font-bold hover:opacity-95 shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Completar entrega y avisar al cliente</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CAJA DEL DIA */}
        {activeTab === 'caja' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-brand" />
                <h3 className="text-[16px] font-bold">Cierre de Caja del Día</h3>
              </div>

              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between p-2 rounded-control bg-[var(--surface)]">
                  <span className="text-[var(--muted)]">Efectivo cobrado:</span>
                  <span className="font-bold tabular-nums">{formatMoney(route.collectedCash)}</span>
                </div>
                <div className="flex justify-between p-2 rounded-control bg-[var(--surface)]">
                  <span className="text-[var(--muted)]">Tarjeta cobrada (Tap to Pay):</span>
                  <span className="font-bold tabular-nums">{formatMoney(route.collectedCard)}</span>
                </div>
                <div className="flex justify-between p-3 rounded-control bg-brand-soft text-brand font-bold text-[15px]">
                  <span>Total en furgoneta:</span>
                  <span className="tabular-nums">{formatMoney(route.collectedCash + route.collectedCard)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseCashDrawer}
                className="w-full min-h-[46px] rounded-control bg-brand text-white font-bold text-[13px] shadow-sm"
              >
                Cerrar caja y liquidar en almacén
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: YO */}
        {activeTab === 'yo' && (
          <div className="p-5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] text-center space-y-3">
            <div className="w-16 h-16 bg-white rounded-control border border-[var(--line)] shadow-xs flex items-center justify-center p-2 mx-auto">
              <img src="/logo.png" alt="Polihostelería" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[16px]">José Romero</h3>
              <div className="text-[12px] text-[var(--muted)]">Repartidor Oficial · Polihostelería Huelva</div>
              <div className="text-[12px] font-semibold text-emerald-600 mt-1">Mercedes Sprinter (4120-JLM)</div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Modal */}
      {isSignatureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--surface)] p-5 rounded-panel max-w-sm w-full space-y-3">
            <h4 className="font-bold text-[15px]">Firma de entrega: {currentStop.clientName}</h4>
            <SignaturePad
              onSave={() => {
                setHasSigned(true);
                setIsSignatureOpen(false);
                addToast({ type: 'ok', title: 'Firma registrada', message: 'Firma del albarán guardada.' });
              }}
              onCancel={() => setIsSignatureOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Tap to Pay Modal */}
      {isTapToPayOpen && (
        <TapToPayModal
          amount={currentStop.pendingAmount}
          clientName={currentStop.clientName}
          onSuccess={() => {
            setIsTapToPayOpen(false);
            setPaymentDone(true);
            addToast({ type: 'ok', title: 'Cobro Tap to Pay realizado', message: `${formatMoney(currentStop.pendingAmount)} cobrados con tarjeta.` });
          }}
          onCancel={() => setIsTapToPayOpen(false)}
        />
      )}

      {/* Incidence Modal */}
      {isIncidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--surface)] p-5 rounded-panel max-w-sm w-full space-y-3">
            <h4 className="font-bold text-[15px] text-amber-600">Registrar Incidencia de Reparto</h4>
            <div className="space-y-2 text-[13px]">
              <button
                type="button"
                onClick={() => {
                  setIsIncidenceOpen(false);
                  addToast({ type: 'warn', title: 'Incidencia guardada: Cliente cerrado', message: 'Oficina avisada para reprogramar entrega.' });
                }}
                className="w-full p-2.5 rounded-control border border-[var(--line)] text-left hover:bg-[var(--surface-2)]"
              >
                1. Local cerrado (fuera de horario)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsIncidenceOpen(false);
                  addToast({ type: 'warn', title: 'Incidencia guardada: Rechaza mercancía', message: 'Albarán marcado como devolución parcial.' });
                }}
                className="w-full p-2.5 rounded-control border border-[var(--line)] text-left hover:bg-[var(--surface-2)]"
              >
                2. Cliente rechaza mercancía
              </button>
            </div>
            <button onClick={() => setIsIncidenceOpen(false)} className="w-full py-2 text-[12px] border rounded-control">Cancelar</button>
          </div>
        </div>
      )}

      {/* Bottom Bar: Ruta · Parada · Caja · Yo */}
      <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--surface)]/90 backdrop-blur-md border-t border-[var(--line)] flex items-center justify-around px-2 z-40 select-none">
        {[
          { id: 'ruta', label: 'Ruta', icon: Truck },
          { id: 'parada', label: 'Parada', icon: MapPin },
          { id: 'caja', label: 'Caja', icon: Wallet },
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
