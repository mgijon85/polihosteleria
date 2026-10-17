import React from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../common/AudioPlayer';
import { 
  Bot, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  ShoppingCart, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock,
  Play
} from 'lucide-react';

export const AsistentesView: React.FC = () => {
  const { assistants, toggleAssistant } = useApp();

  const getAssistantIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'telefono': return <PhoneCall className="w-5 h-5 text-brand" />;
      case 'correo': return <Mail className="w-5 h-5 text-amber-600" />;
      case 'compras': return <ShoppingCart className="w-5 h-5 text-purple-600" />;
      default: return <Briefcase className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand" />
          <h1 className="text-[20px] font-bold text-[var(--text)]">
            Asistentes de Inteligencia Artificial
          </h1>
        </div>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          5 agentes autónomos especializados que capturan pedidos, reponen stock y guían al equipo comercial 24/7
        </p>
      </div>

      {/* Grid of 5 Assistants */}
      <div className="space-y-6">
        {assistants.map((asist) => (
          <div
            key={asist.id}
            className="p-6 rounded-panel border border-[var(--line)] bg-[var(--surface)] shadow-resting space-y-5"
          >
            {/* Top row: Name, schedule, toggle switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-control bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                  {getAssistantIcon(asist.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-bold text-[var(--text)]">{asist.name}</h3>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${asist.enabled ? 'bg-emerald-500/15 text-emerald-600' : 'bg-neutral-500/15 text-neutral-600'}`}>
                      {asist.enabled ? 'ACTIVO' : 'PAUSADO'}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--muted)] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Horario de actuación: <strong>{asist.schedule}</strong></span>
                  </div>
                </div>
              </div>

              {/* iOS style toggle switch */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[13px] font-medium text-[var(--muted)]">
                  {asist.enabled ? 'Operativo' : 'Desactivado'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleAssistant(asist.id)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors ${
                    asist.enabled ? 'bg-brand' : 'bg-[var(--line)]'
                  }`}
                  aria-label="Activar o desactivar asistente"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      asist.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="text-[14px] text-[var(--text)] leading-relaxed">{asist.description}</p>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)] uppercase font-semibold">Pedidos tomados esta semana</div>
                <div className="text-[20px] font-bold tabular-nums text-brand mt-0.5">
                  {asist.stats.ordersTakenThisWeek} pedidos
                </div>
              </div>

              <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)] uppercase font-semibold">Resueltos sin intervención humana</div>
                <div className="text-[20px] font-bold tabular-nums text-emerald-600 mt-0.5">
                  {asist.stats.autoResolvedPercent} %
                </div>
              </div>

              <div className="p-3.5 rounded-card bg-[var(--surface-2)] border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)] uppercase font-semibold">Total interacciones</div>
                <div className="text-[20px] font-bold tabular-nums text-[var(--text)] mt-0.5">
                  {asist.stats.totalInteractions}
                </div>
              </div>
            </div>

            {/* Capabilities and Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Qué puede hacer</span>
                </div>
                <ul className="space-y-1.5 text-[var(--text)]">
                  {asist.capabilities.map((c, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-card bg-[var(--surface-2)] border border-[var(--line)] space-y-2">
                <div className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Qué NO puede hacer (seguridad y control humano)</span>
                </div>
                <ul className="space-y-1.5 text-[var(--text)]">
                  {asist.limitations.map((l, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent real examples with simulated audio player */}
            <div className="space-y-2 pt-2">
              <div className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                3 ejemplos reales de esta semana
              </div>

              <div className="space-y-2">
                {asist.recentExamples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3.5 rounded-card border border-[var(--line)] bg-[var(--surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--text)]">{ex.client}</span>
                        <span className="text-[11px] text-[var(--muted)]">{ex.timestamp} ({ex.channel})</span>
                      </div>
                      <div className="text-[var(--text)]">{ex.summary}</div>
                    </div>

                    {ex.audioDuration && (
                      <div className="w-full sm:w-60 flex-shrink-0">
                        <AudioPlayer duration={ex.audioDuration} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
