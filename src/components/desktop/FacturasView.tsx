import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/formatters';
import { 
  FileText, 
  QrCode, 
  Download, 
  Send, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet,
  Building
} from 'lucide-react';

export const FacturasView: React.FC = () => {
  const { invoices, addToast } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(invoices[0]);
  const [isVerifactuModalOpen, setIsVerifactuModalOpen] = useState(false);

  const handleExportAccounting = () => {
    addToast({
      type: 'ok',
      title: 'Fichero contable generado',
      message: 'Exportado diario de ventas en formato estándar ContaPlus / A3 Asesor.',
    });
  };

  const handleSendInvoice = (method: 'whatsapp' | 'email') => {
    addToast({
      type: 'ok',
      title: `Factura ${selectedInvoice.invoiceNumber} enviada por ${method === 'whatsapp' ? 'WhatsApp' : 'Correo'}`,
      message: 'Incluye enlace de pago con tarjeta y código Veri*factu oficial.',
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-bold text-[var(--text)]">
              Facturación y Albaranes
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Sistema adaptado Veri*factu
            </span>
          </div>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            Emisión por albarán, quincenal y mensual agrupada con firma digital tributaria
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportAccounting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-[13px] font-semibold hover:border-brand/40 transition-colors self-start sm:self-center"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Exportar a Contabilidad</span>
        </button>
      </div>

      {/* Main Grid: Invoices Table (8 cols) and Selected Invoice Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
          <div className="p-4 border-b border-[var(--line)] flex items-center justify-between">
            <span className="text-[13px] font-bold text-[var(--text)]">Facturas emitidas del período</span>
            <span className="text-[12px] text-[var(--muted)]">{invoices.length} facturas registradas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Número</th>
                  <th className="py-3 px-4">Serie</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Vencimiento</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {invoices.map((inv) => {
                  const isSelected = selectedInvoice?.id === inv.id;

                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv)}
                      className={`hover:bg-[var(--surface-2)] cursor-pointer transition-colors ${
                        isSelected ? 'bg-brand-soft/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold tabular-nums text-brand">{inv.invoiceNumber}</td>
                      <td className="py-3.5 px-4 tabular-nums text-[var(--muted)]">{inv.series}</td>
                      <td className="py-3.5 px-4 font-semibold text-[var(--text)]">{inv.clientName}</td>
                      <td className="py-3.5 px-4 text-[var(--muted)]">{inv.date}</td>
                      <td className="py-3.5 px-4 text-[var(--muted)]">{inv.dueDate}</td>
                      <td className="py-3.5 px-4 text-right font-bold tabular-nums">{formatMoney(inv.total)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          inv.status === 'cobrada'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : inv.status === 'vencida'
                            ? 'bg-rose-500/15 text-rose-600'
                            : 'bg-amber-500/15 text-amber-600'
                        }`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Invoice Details & Veri*factu QR (4 cols) */}
        {selectedInvoice && (
          <div className="lg:col-span-4 bg-[var(--surface)] p-5 rounded-panel border border-[var(--line)] shadow-resting space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Detalle factura</span>
                <h3 className="text-[17px] font-bold text-[var(--text)]">{selectedInvoice.invoiceNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVerifactuModalOpen(true)}
                className="p-2 rounded-control bg-[var(--surface-2)] border border-[var(--line)] text-brand hover:border-brand/40"
                title="Inspeccionar QR Veri*factu tributario"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Cliente:</span>
                <span className="font-semibold text-right">{selectedInvoice.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">CIF:</span>
                <span className="font-mono">{selectedInvoice.cif}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Albaranes incluidos:</span>
                <span className="font-semibold">{selectedInvoice.deliveryNotes.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Base imponible:</span>
                <span className="font-bold tabular-nums">{formatMoney(selectedInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">IVA 21%:</span>
                <span className="font-bold tabular-nums">{formatMoney(selectedInvoice.tax)}</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold pt-2 border-t border-[var(--line)]">
                <span>Total Factura:</span>
                <span className="text-brand tabular-nums">{formatMoney(selectedInvoice.total)}</span>
              </div>
            </div>

            {/* Veri*factu QR box */}
            <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded-control border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                <QrCode className="w-12 h-12 text-black" />
              </div>
              <div className="text-[11px] text-[var(--muted)] leading-snug">
                <strong className="text-[var(--text)] block">Certificado Veri*factu</strong>
                Huella fiscal SHA-256 remitida a la Agencia Tributaria conforme al RD 1007/2023.
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => handleSendInvoice('whatsapp')}
                className="w-full py-2.5 rounded-control bg-emerald-600 text-white text-[13px] font-semibold hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendInvoice('email')}
                className="w-full py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] font-medium hover:border-brand/40 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-brand" />
                <span>Enviar por Correo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Veri*factu Modal */}
      {isVerifactuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-panel max-w-sm w-full p-6 text-center space-y-4 shadow-elevated">
            <h3 className="text-[17px] font-bold">Código QR Veri*factu</h3>
            <div className="w-48 h-48 bg-white p-3 mx-auto rounded-card border border-[var(--line)] flex items-center justify-center shadow-xs">
              <QrCode className="w-40 h-40 text-black" />
            </div>
            <div className="text-[12px] text-[var(--muted)] font-mono break-all">
              https://verifactu.agenciatributaria.gob.es/qr/POLI-0412
            </div>
            <button
              onClick={() => setIsVerifactuModalOpen(false)}
              className="w-full py-2 rounded-control bg-brand text-white text-[13px] font-semibold"
            >
              Cerrar visor fiscal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
