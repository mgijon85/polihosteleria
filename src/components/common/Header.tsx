import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Users, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Play, 
  Sun, 
  Moon, 
  Clock, 
  HelpCircle, 
  ChevronDown,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Truck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    deviceMode, 
    setDeviceMode, 
    theme, 
    toggleTheme, 
    setIsDemoModalOpen,
    triggerSimulation,
    setActiveTab
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isSimMenuOpen, setIsSimMenuOpen] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const simMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
      if (simMenuRef.current && !simMenuRef.current.contains(e.target as Node)) {
        setIsSimMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesConfig: { id: UserRole; name: string; person: string; icon: string; desc: string }[] = [
    { id: 'direccion', name: 'Dirección', person: 'Juanlu (Dueño)', icon: '👑', desc: 'Todo el negocio, márgenes y decisiones' },
    { id: 'oficina', name: 'Oficina', person: 'Rocío', icon: '💼', desc: 'Pedidos, clientes, facturación (sin márgenes)' },
    { id: 'almacen', name: 'Almacén', person: 'Paco', icon: '📦', desc: 'Tablet picking por pasillo y etiquetas' },
    { id: 'comercial', name: 'Comercial', person: 'Antonio Gómez', icon: '📱', desc: 'App móvil visitas, catálogo y cobro' },
    { id: 'repartidor', name: 'Repartidor', person: 'José Romero', icon: '🚚', desc: 'App móvil ruta, firma y cobro en parada' },
    { id: 'cliente', name: 'Cliente', person: 'Bar La Ribera', icon: '☕', desc: 'Portal web: repetir pedido en 1 toque' },
  ];

  const currentRoleObj = rolesConfig.find(r => r.id === role) || rolesConfig[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--surface)]/85 glass-header border-b border-[var(--line)] transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Wordmark + Cutoff Notice */}
        <div className="flex items-center gap-6">
          <button 
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-3 select-none text-left hover:opacity-90 transition-opacity"
            title="Ir a Inicio"
          >
            <div className="h-10 w-10 flex items-center justify-center p-1 bg-white/95 dark:bg-white/10 rounded-control border border-[var(--line)] shadow-xs overflow-hidden flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Polihostelería" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 leading-none">
                <span className="text-[17px] font-bold tracking-tight text-[var(--text)]">
                  Poli<span className="text-brand">hostelería</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-soft text-brand">
                  Huelva
                </span>
              </div>
              <span className="text-[11px] text-[var(--muted)] font-medium hidden md:inline mt-0.5">
                Distribución hostelera B2B
              </span>
            </div>
          </button>

          {/* Cutoff time chip */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-[12px] text-[var(--muted)]">
            <Clock className="w-3.5 h-3.5 text-brand" />
            <span>Corte: lo pedido antes de las <strong>22:00</strong> sale mañana</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Guion Demo */}
          <button
            type="button"
            onClick={() => setIsDemoModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[13px] font-medium text-brand bg-brand-soft hover:opacity-90 active:scale-95 transition-all"
            title="Ver guion de demostración de 5 minutos"
          >
            <Sparkles className="w-4 h-4" />
            <span>Guion demo</span>
          </button>

          {/* Simular Menu */}
          <div className="relative" ref={simMenuRef}>
            <button
              type="button"
              onClick={() => setIsSimMenuOpen(!isSimMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[13px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simular</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isSimMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-card bg-[var(--surface)] border border-[var(--line)] shadow-elevated p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                  Acciones de demostración
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsSimMenuOpen(false);
                    triggerSimulation('whatsapp_night');
                  }}
                  className="w-full text-left p-2.5 rounded-control hover:bg-[var(--surface-2)] flex items-start gap-2.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[13px] font-medium">Entra pedido WhatsApp (23:40)</div>
                    <div className="text-[11px] text-[var(--muted)]">Llega audio nocturno con etiqueta 🌙 Noche</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSimMenuOpen(false);
                    triggerSimulation('phone_night');
                  }}
                  className="w-full text-left p-2.5 rounded-control hover:bg-[var(--surface-2)] flex items-start gap-2.5 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[13px] font-medium">Llamada fuera de horario</div>
                    <div className="text-[11px] text-[var(--muted)]">Asistente de voz transcribe pedido telefónico</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSimMenuOpen(false);
                    triggerSimulation('delivery_cash');
                  }}
                  className="w-full text-left p-2.5 rounded-control hover:bg-[var(--surface-2)] flex items-start gap-2.5 transition-colors"
                >
                  <Truck className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[13px] font-medium">Repartidor entrega y cobra</div>
                    <div className="text-[11px] text-[var(--muted)]">Marca parada 4 y cuadra la caja del día</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Dispositivo Switcher (Desktop, Tablet, Mobile) */}
          <div className="hidden md:flex items-center p-1 rounded-control bg-[var(--surface-2)] border border-[var(--line)]">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-control text-xs flex items-center gap-1 transition-colors ${
                deviceMode === 'desktop' ? 'bg-[var(--surface)] text-brand shadow-sm font-semibold' : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
              title="Vista de escritorio"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-control text-xs flex items-center gap-1 transition-colors ${
                deviceMode === 'tablet' ? 'bg-[var(--surface)] text-brand shadow-sm font-semibold' : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
              title="Vista tablet"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-control text-xs flex items-center gap-1 transition-colors ${
                deviceMode === 'mobile' ? 'bg-[var(--surface)] text-brand shadow-sm font-semibold' : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
              title="Marco móvil iPhone (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Role Switcher: "Ver como" */}
          <div className="relative" ref={roleMenuRef}>
            <button
              type="button"
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-control bg-[var(--surface-2)] border border-[var(--line)] hover:border-brand/40 transition-all text-left"
            >
              <span className="text-base">{currentRoleObj.icon}</span>
              <div className="hidden sm:block leading-tight">
                <div className="text-[11px] text-[var(--muted)]">Ver como</div>
                <div className="text-[13px] font-semibold text-[var(--text)] truncate max-w-[120px]">
                  {currentRoleObj.name}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)]" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-card bg-[var(--surface)] border border-[var(--line)] shadow-elevated p-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                  Cambiar rol en directo
                </div>
                {rolesConfig.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-control flex items-start gap-2.5 transition-colors ${
                      role === r.id ? 'bg-brand-soft text-brand font-medium' : 'hover:bg-[var(--surface-2)] text-[var(--text)]'
                    }`}
                  >
                    <span className="text-lg">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold">{r.name}</span>
                        <span className="text-[11px] text-[var(--muted)]">{r.person}</span>
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-0.5 leading-snug">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-control hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] flex items-center justify-center transition-colors"
            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
