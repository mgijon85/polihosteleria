import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioPlayer } from '../common/AudioPlayer';
import { 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Send, 
  UserCheck, 
  Bot, 
  Link as LinkIcon, 
  Search,
  CheckCircle2
} from 'lucide-react';

export const ConversacionesView: React.FC = () => {
  const { 
    conversations, 
    takeOverConversation, 
    sendConversationMessage, 
    setSelectedOrderId, 
    addToast 
  } = useApp();

  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [filterChannel, setFilterChannel] = useState<string>('todos');
  const [inputText, setInputText] = useState('');

  const currentConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    if (filterChannel !== 'todos' && c.channel !== filterChannel) return false;
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendConversationMessage(currentConv.id, inputText);
    setInputText('');
  };

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'telefono': return <PhoneCall className="w-4 h-4 text-brand" />;
      default: return <Mail className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand" />
          <span>Conversaciones Unificadas Multicanal</span>
        </h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          WhatsApp, llamadas telefónicas y correos centralizados con trazabilidad de pedidos y toma de control manual
        </p>
      </div>

      {/* Main split: Conversation List (4 cols) & Active Chat (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px]">
        {/* List of Conversations */}
        <div className="lg:col-span-5 bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting flex flex-col overflow-hidden">
          {/* Filter */}
          <div className="p-3.5 border-b border-[var(--line)] flex items-center gap-2">
            {['todos', 'whatsapp', 'telefono', 'correo'].map(ch => (
              <button
                key={ch}
                type="button"
                onClick={() => setFilterChannel(ch)}
                className={`px-3 py-1.5 rounded-control text-[12px] font-medium capitalize transition-all ${
                  filterChannel === ch ? 'bg-brand text-white font-semibold' : 'bg-[var(--surface-2)] text-[var(--muted)]'
                }`}
              >
                {ch === 'todos' ? 'Todos' : ch}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--line)]">
            {filteredConversations.map((c) => {
              const isSelected = c.id === currentConv?.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConvId(c.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-brand-soft/20' : 'hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(c.channel)}
                      <span className="text-[14px] font-bold text-[var(--text)]">{c.clientName}</span>
                    </div>
                    <span className="text-[11px] text-[var(--muted)]">{c.lastMessageTime}</span>
                  </div>

                  <p className="text-[12px] text-[var(--muted)] truncate mt-1">
                    {c.lastMessage}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.status === 'ia_activa'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/15 text-amber-600'
                    }`}>
                      {c.status === 'ia_activa' ? '🤖 IA Activa' : '👤 Humano al control'}
                    </span>
                    {c.associatedOrderId && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--line)]">
                        Generó {c.associatedOrderId}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Conversation Thread */}
        <div className="lg:col-span-7 bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting flex flex-col overflow-hidden">
          {currentConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-[var(--line)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getChannelIcon(currentConv.channel)}
                  <div>
                    <h3 className="text-[15px] font-bold text-[var(--text)]">{currentConv.clientName}</h3>
                    <div className="text-[11px] text-[var(--muted)]">Canal: {currentConv.channel.toUpperCase()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentConv.associatedOrderId && (
                    <button
                      type="button"
                      onClick={() => setSelectedOrderId(currentConv.associatedOrderId!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[12px] font-medium border border-brand/30 text-brand bg-brand-soft hover:bg-brand hover:text-white transition-all"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Ver pedido</span>
                    </button>
                  )}

                  {currentConv.status === 'ia_activa' ? (
                    <button
                      type="button"
                      onClick={() => takeOverConversation(currentConv.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[12px] font-semibold bg-amber-500 text-white hover:opacity-95 shadow-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Tomar el control</span>
                    </button>
                  ) : (
                    <span className="text-[12px] text-amber-600 font-bold px-2.5 py-1 rounded-full bg-amber-500/10">
                      Control manual
                    </span>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[var(--surface-2)]/40">
                {currentConv.messages.map((m) => {
                  const isClient = m.sender === 'client';
                  const isAI = m.sender === 'ai';

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[80%] ${
                        isClient ? 'mr-auto items-start' : 'ml-auto items-end'
                      }`}
                    >
                      <span className="text-[10px] text-[var(--muted)] font-semibold mb-1 px-1">
                        {m.senderName} · {m.timestamp}
                      </span>

                      <div
                        className={`p-3.5 rounded-card text-[13px] leading-relaxed shadow-xs ${
                          isClient
                            ? 'bg-[var(--surface)] text-[var(--text)] border border-[var(--line)]'
                            : isAI
                            ? 'bg-emerald-600 text-white'
                            : 'bg-brand text-white'
                        }`}
                      >
                        {m.isAudio && m.audioDuration && (
                          <div className="mb-2">
                            <AudioPlayer duration={m.audioDuration} label="Audio original del cliente" />
                          </div>
                        )}
                        <p>{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[var(--line)] bg-[var(--surface)] flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    currentConv.status === 'ia_activa'
                      ? 'La IA está respondiendo automáticamente... (Escribe aquí para intervenir)'
                      : 'Escribe un mensaje como Rocío (Oficina)...'
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] text-[var(--text)] focus:border-brand"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-control bg-brand text-white flex items-center justify-center hover:opacity-95 disabled:opacity-40 transition-all flex-shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="p-12 text-center text-[13px] text-[var(--muted)]">
              Selecciona una conversación a la izquierda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
