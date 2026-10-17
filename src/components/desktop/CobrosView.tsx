import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  CreditCard, 
  AlertTriangle, 
  Send, 
  Check, 
  Calendar, 
  Lock, 
  Unlock, 
  Wallet, 
  Download,
  Building
} from 'lucide-react';

export const CobrosView: React.FC = () => {
  const { clients, role, addToast } = useApp();

  const overdueClients = clients.filter(c => c.overdueBalance > 0);
  const creditLimitExceededClients = clients.filter(c => c.currentBalance > c.creditLimit);

  const [servedBlockedClients, setServedBlockedClients] = useState<Record<string, boolean>>({});

  const handleSendReminder = (clientName: string, amount: number) => {
    addToast({
      type: 'ok',
      title: `Recordatorio de deuda enviado a ${clientName}`,
      message: `WhatsApp y correo remitidos con desglose de ${formatMoney(amount)} y enlace de pago TPV.`,
    });
  };

  const handleGenerateSepa = () => {
    addToast({
      type: 'ok',
      title: 'Remesa SEPA XML B2B generada',
      message: 'Fichero norma 19.14 listo para subir a la banca online de CaixaBank / Santander.',
    });
  };

  const handleServeAnyway = (clientId: string) => {
    setServedBlockedClients(prev => ({ ...prev, [clientId]: true }));
    addToast({
      type: 'ok',
      title: 'Bloqueo liberado por Dirección',
      message: 'Autorización extraordinaria concedida para servir el pedido.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand" />
            <span>Gestión de Cobros y Vencimientos</span>
          </h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Remesas bancarias SEPA, conciliación de impagos y control de riesgos de crédito
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateSepa}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Generar Remesa SEPA (12.450 €)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-panel border border-[var(--line)] bg-[var(--surface)] shadow-resting">
          <div className="text-[11px] text-[var(--muted)] font-semibold uppercase tracking-wider">Total deuda en calle</div>
          <div className="text-[22px] font-bold tabular-nums text-[var(--text)] mt-1">
            {formatMoney(clients.reduce((s, c) => s + c.currentBalance, 0))}
          </div>
          <div className="text-[12px] text-[var(--muted)] mt-0.5">85 clientes de hostelería</div>
        </div>

        <div className="p-5 rounded-panel border border-rose-500/20 bg-rose-500/[0.04] shadow-resting">
          <div className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold uppercase tracking-wider">Deuda vencida (Impagos)</div>
          <div className="text-[22px] font-bold tabular-nums text-rose-600 mt-1">
            {formatMoney(overdueClients.reduce((s, c) => s + c.overdueBalance, 0))}
          </div>
          <div className="text-[12px] text-rose-700 dark:text-rose-400 mt-0.5">{overdueClients.length} clientes morosos</div>
        </div>

        <div className="p-5 rounded-panel border border-amber-500/20 bg-amber-500/[0.04] shadow-resting">
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider">Límite de crédito superado</div>
          <div className="text-[22px] font-bold tabular-nums text-amber-600 mt-1">
            {creditLimitExceededClients.length} clientes
          </div>
          <div className="text-[12px] text-amber-700 dark:text-amber-400 mt-0.5">Pedidos retenidos en filtro</div>
        </div>
      </div>

      {/* Overdue Debt & Automated Reminders */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h2 className="text-[16px] font-bold">Clientes con recibos vencidos ({overdueClients.length})</h2>
          </div>
          <span className="text-[12px] text-[var(--muted)]">Plantillas automáticas con calendario de avisos</span>
        </div>

        <div className="space-y-3">
          {overdueClients.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-card border border-rose-500/20 bg-rose-500/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[var(--text)]">{c.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 font-bold">
                    Vencido {c.daysSinceLastOrder} días
                  </span>
                </div>
                <div className="text-[12px] text-[var(--muted)] mt-0.5">
                  Contacto: {c.contactPerson} ({c.phone}) · Comercial: {c.salesRepName}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-[16px] font-bold text-rose-600 tabular-nums">
                    {formatMoney(c.overdueBalance)}
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">Deuda total: {formatMoney(c.currentBalance)}</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendReminder(c.name, c.overdueBalance)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-control bg-rose-600 text-white text-[12px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar aviso WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Limit Blocks & "Servir igualmente" for Dirección */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <h2 className="text-[16px] font-bold">Bloqueo automático por límite de crédito superado</h2>
          </div>
          <span className="text-[12px] text-[var(--muted)]">Solo Dirección puede aplicar «Servir igualmente»</span>
        </div>

        <div className="space-y-3">
          {creditLimitExceededClients.map((c) => {
            const isAuthorized = servedBlockedClients[c.id];

            return (
              <div
                key={c.id}
                className="p-4 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[var(--text)]">{c.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 font-semibold">
                      Límite fijado: {formatMoney(c.creditLimit)}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">
                    Saldo vivo actual: <strong className="text-rose-600">{formatMoney(c.currentBalance)}</strong> ({c.city}, {c.zone})
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {role === 'direccion' ? (
                    isAuthorized ? (
                      <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Autorizado a servir
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleServeAnyway(c.id)}
                        className="px-4 py-2 rounded-control bg-brand text-white text-[12px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs"
                      >
                        Servir igualmente
                      </button>
                    )
                  ) : (
                    <span className="text-[12px] text-[var(--muted)] italic">
                      Requiere aprobación de Juanlu
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
