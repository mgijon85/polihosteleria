import React, { useState, useEffect } from 'react';
import { formatMoney } from '../../utils/formatters';
import { Smartphone, CheckCircle2, Wifi, X, CreditCard } from 'lucide-react';

interface TapToPayModalProps {
  amount: number;
  clientName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TapToPayModal: React.FC<TapToPayModalProps> = ({ 
  amount, 
  clientName, 
  onSuccess, 
  onCancel 
}) => {
  const [phase, setPhase] = useState<'waiting' | 'reading' | 'success'>('waiting');

  useEffect(() => {
    // Simulate card tap after 1.8 seconds
    const timer1 = setTimeout(() => {
      setPhase('reading');
    }, 1800);

    const timer2 = setTimeout(() => {
      setPhase('success');
    }, 3200);

    const timer3 = setTimeout(() => {
      onSuccess();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#1C1C1E] text-white border border-white/10 rounded-panel max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {phase === 'waiting' && (
          <div className="space-y-4 py-4 animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-brand/20 border-2 border-brand text-brand flex items-center justify-center mx-auto animate-pulse">
              <Wifi className="w-10 h-10 rotate-90" />
            </div>

            <div>
              <div className="text-[13px] text-white/60 uppercase font-semibold tracking-wider">
                Tap to Pay on iPhone
              </div>
              <h3 className="text-[22px] font-bold mt-1">Acerca la tarjeta o el móvil</h3>
              <p className="text-[13px] text-white/60 mt-1">
                Coloca la tarjeta contactless en la parte superior del teléfono
              </p>
            </div>

            <div className="p-3 rounded-card bg-white/5 border border-white/10">
              <div className="text-[12px] text-white/60">Importe a cobrar a {clientName}:</div>
              <div className="text-[26px] font-extrabold tabular-nums text-white mt-0.5">
                {formatMoney(amount)}
              </div>
            </div>
          </div>
        )}

        {phase === 'reading' && (
          <div className="space-y-4 py-8 animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-spin">
              <CreditCard className="w-10 h-10" />
            </div>
            <h3 className="text-[20px] font-bold">Procesando pago...</h3>
            <p className="text-[13px] text-white/60">No retires la tarjeta</p>
          </div>
        )}

        {phase === 'success' && (
          <div className="space-y-4 py-4 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <div className="text-[13px] text-emerald-400 uppercase font-bold tracking-wider">
                Operación autorizada
              </div>
              <h3 className="text-[24px] font-bold mt-1 tabular-nums">
                Cobrado {formatMoney(amount)}
              </h3>
              <p className="text-[13px] text-white/60 mt-1">
                Recibo digital enviado al WhatsApp del cliente
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
