import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileCheck, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const XgestEvoWizardModal: React.FC = () => {
  const { isXgestEvoModalOpen, setIsXgestEvoModalOpen, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isXgestEvoModalOpen) return null;

  const steps = [
    { num: 1, title: '1. Clientes y Fichas', desc: 'Migración de fichas, direcciones y comerciales' },
    { num: 2, title: '2. Artículos y Tarifas', desc: 'Familias, formatos, precios y precios especiales' },
    { num: 3, title: '3. Saldos y Vencimientos', desc: 'Deuda viva, recibos pendientes y límites de crédito' },
    { num: 4, title: '4. Revisión Final', desc: 'Validación e inicio de sincronización en tiempo real' },
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(s => s + 1);
      }, 600);
    } else {
      setIsXgestEvoModalOpen(false);
      addToast({
        type: 'ok',
        title: '¡Migración de XgestEvo completada con éxito!',
        message: '1.240 clientes y 3.860 artículos importados. Polihostelería ya opera 100% en la nube.',
        duration: 6000,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-2xl w-full overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-white border border-[var(--line)] shadow-xs flex items-center justify-center p-1">
              <img src="/logo.png" alt="Polihostelería" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-bold text-[var(--text)]">
                  Migración desde XgestEvo
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                  Hacia Polihostelería Cloud
                </span>
              </div>
              <p className="text-[13px] text-[var(--muted)]">
                Pasa de la base de datos local de Windows a Polihostelería en 4 sencillos pasos
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsXgestEvoModalOpen(false)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="px-6 py-3 border-b border-[var(--line)] bg-[var(--surface-2)]/60 flex items-center justify-between">
          {steps.map((st) => (
            <div key={st.num} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-[12px] font-bold flex items-center justify-center tabular-nums ${
                st.num === currentStep
                  ? 'bg-brand text-white'
                  : st.num < currentStep
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[var(--line)] text-[var(--muted)]'
              }`}>
                {st.num < currentStep ? '✓' : st.num}
              </span>
              <span className={`text-[12px] font-medium hidden sm:inline ${
                st.num === currentStep ? 'text-brand font-bold' : 'text-[var(--muted)]'
              }`}>
                {st.title.split('. ')[1]}
              </span>
            </div>
          ))}
        </div>

        {/* Content Body per step */}
        <div className="p-6 space-y-5 text-[13px] min-h-[260px] flex flex-col justify-center">
          {isProcessing ? (
            <div className="text-center py-8 space-y-3">
              <RefreshCw className="w-8 h-8 text-brand animate-spin mx-auto" />
              <div className="font-semibold text-[15px]">Procesando tablas de XgestEvo...</div>
              <div className="text-[12px] text-[var(--muted)]">Comprobando integridad de claves y codificación UTF-8</div>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[14px] text-[var(--text)]">Base de datos de Clientes localizada</h4>
                      <p className="text-[12px] text-[var(--muted)] mt-0.5">
                        Fichero: <code className="font-mono">C:\XgestEvo\Empresas\001\CLIENTES.FDB</code>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Clientes activos</div>
                      <div className="text-[18px] font-bold tabular-nums text-brand mt-0.5">1.240</div>
                    </div>
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Direcciones entrega</div>
                      <div className="text-[18px] font-bold tabular-nums text-[var(--text)] mt-0.5">1.412</div>
                    </div>
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Comerciales asignados</div>
                      <div className="text-[18px] font-bold tabular-nums text-[var(--text)] mt-0.5">4</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[14px] text-[var(--text)]">Artículos y Condiciones de Precio</h4>
                      <p className="text-[12px] text-[var(--muted)] mt-0.5">
                        Mapeo de unidades, envases y packs hosteleros completado.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Referencias catálogo</div>
                      <div className="text-[18px] font-bold tabular-nums text-brand mt-0.5">3.860</div>
                    </div>
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Familias vinculadas</div>
                      <div className="text-[18px] font-bold tabular-nums text-[var(--text)] mt-0.5">9</div>
                    </div>
                    <div className="p-3 rounded-control border border-[var(--line)] bg-[var(--surface-2)]">
                      <div className="text-[11px] text-[var(--muted)]">Precios especiales</div>
                      <div className="text-[18px] font-bold tabular-nums text-amber-600 mt-0.5">212 pactados</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[14px] text-[var(--text)]">Saldos pendientes y Cartera viva</h4>
                      <p className="text-[12px] text-[var(--muted)] mt-0.5">
                        Se importarán los saldos para que los cobros en ruta sigan cuadrando desde el minuto cero.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-control bg-brand-soft/40 border border-brand/20 flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-brand">Total deuda viva a traspasar:</span>
                    <span className="font-bold tabular-nums text-[16px] text-brand">14.300,00 €</span>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[var(--text)]">Todo listo para el cambio de era</h4>
                    <p className="text-[13px] text-[var(--muted)] max-w-md mx-auto mt-1">
                      XgestEvo quedará en modo consulta y Polihostelería activará las apps de comerciales, repartidores y pedidos por WhatsApp en directo.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1 || isProcessing}
            onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-control border border-[var(--line)] text-[13px] font-medium hover:bg-[var(--surface-2)] transition-colors disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleNextStep}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs"
          >
            <span>{currentStep === 4 ? 'Confirmar migración e iniciar' : 'Siguiente paso'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
