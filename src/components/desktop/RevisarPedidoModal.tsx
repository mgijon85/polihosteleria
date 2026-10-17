import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../common/AudioPlayer';
import { formatMoney } from '../../utils/formatters';
import { 
  X, 
  Check, 
  Sparkles, 
  AlertCircle, 
  FileText, 
  PhoneCall, 
  MessageSquare, 
  Moon, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const RevisarPedidoModal: React.FC = () => {
  const { 
    reviewingOrderId, 
    setReviewingOrderId, 
    orders, 
    confirmReviewOrder,
    role 
  } = useApp();

  const order = orders.find(o => o.id === reviewingOrderId);
  const [selectedLines, setSelectedLines] = useState<any[]>(order?.lines || []);

  if (!reviewingOrderId || !order) return null;

  const handleOptionSelect = (lineId: string, option: { productId: string; name: string; price: number }) => {
    setSelectedLines(prev => prev.map(l => {
      if (l.id === lineId) {
        return {
          ...l,
          productId: option.productId,
          name: option.name,
          unitPrice: option.price,
          finalPrice: option.price,
          total: Number((option.price * l.quantity).toFixed(2)),
          aiConfidence: 'alta' as const,
        };
      }
      return l;
    }));
  };

  const handleConfirm = () => {
    confirmReviewOrder(order.id, selectedLines);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-elevated">
        {/* Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-semibold">Revisar pedido interpretado por IA</h2>
                {order.isNightOrder && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Moon className="w-3 h-3" /> 🌙 Noche
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[var(--muted)]">
                {order.orderNumber} · {order.clientName} ({order.clientZone})
              </p>
            </div>
          </div>

          <button
            onClick={() => setReviewingOrderId(null)}
            className="w-8 h-8 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split into Original message (left) and AI Interpretation (right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
          {/* Left: Original Message */}
          <div className="p-6 space-y-4 bg-[var(--surface-2)]/50">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex items-center gap-2">
              {order.originalMessage?.type === 'whatsapp_audio' && <MessageSquare className="w-4 h-4 text-emerald-600" />}
              {order.originalMessage?.type === 'phone_call' && <PhoneCall className="w-4 h-4 text-brand" />}
              {order.originalMessage?.type === 'email_pdf' && <FileText className="w-4 h-4 text-amber-600" />}
              <span>Mensaje original del cliente</span>
            </div>

            {/* Audio player if audio */}
            {order.originalMessage?.audioDuration && (
              <div className="space-y-1.5">
                <span className="text-[12px] text-[var(--muted)]">Nota de voz recibida:</span>
                <AudioPlayer 
                  duration={order.originalMessage.audioDuration} 
                  label={`Audio de ${order.clientName}`} 
                />
              </div>
            )}

            {/* Transcript / Text */}
            <div className="p-4 rounded-card bg-[var(--surface)] border border-[var(--line)] space-y-2">
              <div className="text-[11px] font-semibold text-[var(--muted)] uppercase">
                Transcripción exacta de la IA
              </div>
              <p className="text-[14px] text-[var(--text)] italic leading-relaxed">
                {order.originalMessage?.transcript || order.originalMessage?.rawText || 'Sin transcripción.'}
              </p>
            </div>

            {/* Attached PDF if email */}
            {order.originalMessage?.pdfName && (
              <div className="p-3 rounded-card bg-[var(--surface)] border border-[var(--line)] flex items-center gap-3">
                <FileText className="w-6 h-6 text-rose-500" />
                <div className="text-[13px] font-medium truncate flex-1">
                  {order.originalMessage.pdfName}
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                  OCR validado
                </span>
              </div>
            )}

            <div className="p-3 rounded-card bg-amber-500/10 border border-amber-500/20 text-[12px] text-amber-800 dark:text-amber-300">
              <div className="font-semibold mb-0.5">Motivo de revisión:</div>
              {order.reviewReason || 'Verificar líneas dudosas antes de enviar a picking de almacén.'}
            </div>
          </div>

          {/* Right: AI Lines & Disambiguation */}
          <div className="p-6 space-y-4">
            <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider flex items-center justify-between">
              <span>Líneas interpretadas ({selectedLines.length})</span>
              <span className="text-[11px] text-emerald-600 font-bold">IA Modelo Horeca v2</span>
            </div>

            <div className="space-y-3">
              {selectedLines.map((line, idx) => {
                const isHighConf = line.aiConfidence === 'alta';
                const isDoubt = line.aiConfidence === 'duda';

                return (
                  <div
                    key={line.id || idx}
                    className={`p-3.5 rounded-card border transition-all ${
                      isDoubt
                        ? 'border-amber-400 bg-amber-500/5'
                        : 'border-[var(--line)] bg-[var(--surface-2)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold text-[var(--text)]">
                            {line.quantity}× {line.name}
                          </span>
                        </div>
                        <div className="text-[12px] text-[var(--muted)]">
                          {line.format} · Ubicación: {line.location}
                        </div>
                        {line.aiOriginalText && (
                          <div className="text-[11px] text-[var(--muted)] italic">
                            Del audio: «{line.aiOriginalText}»
                          </div>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-[14px] font-bold tabular-nums">
                          {formatMoney(line.total)}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                            isHighConf
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-amber-500/15 text-amber-600'
                          }`}
                        >
                          {isHighConf ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> Confianza alta
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3 h-3" /> Requiere elegir
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Disambiguation choices if doubt */}
                    {line.aiOptions && line.aiOptions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--line)] space-y-2">
                        <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                          ¿Qué producto quiso decir? Selecciona uno:
                        </div>
                        <div className="space-y-1.5">
                          {line.aiOptions.map((opt: any) => (
                            <button
                              key={opt.productId}
                              type="button"
                              onClick={() => handleOptionSelect(line.id, opt)}
                              className={`w-full text-left p-2 rounded-control text-[12px] border transition-all flex items-center justify-between ${
                                line.productId === opt.productId
                                  ? 'border-brand bg-brand-soft text-brand font-semibold'
                                  : 'border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text)]'
                              }`}
                            >
                              <span>{opt.name}</span>
                              <span className="tabular-nums font-bold">{formatMoney(opt.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Totals summary */}
            <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-1 text-[13px]">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>IVA (21%)</span>
                <span className="tabular-nums">{formatMoney(order.taxTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-[15px] pt-1 border-t border-[var(--line)]">
                <span>Total pedido</span>
                <span className="tabular-nums text-brand">{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setReviewingOrderId(null)}
            className="px-4 py-2 rounded-control border border-[var(--line)] text-[13px] font-medium hover:bg-[var(--surface-2)] transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2 px-6 py-2.5 rounded-control bg-brand text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar pedido y notificar al cliente</span>
          </button>
        </div>
      </div>
    </div>
  );
};
