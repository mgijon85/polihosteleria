import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isOk = toast.type === 'ok';
        const isWarn = toast.type === 'warn';
        const isDanger = toast.type === 'danger';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-card bg-[var(--surface)] text-[var(--text)] border border-[var(--line)] shadow-elevated transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex-shrink-0 mt-0.5">
              {isOk && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isWarn && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {isDanger && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
              {!isOk && !isWarn && !isDanger && <Info className="w-5 h-5 text-brand" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold leading-tight">{toast.title}</div>
              {toast.message && (
                <div className="text-[13px] text-[var(--muted)] mt-1 leading-snug">
                  {toast.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
