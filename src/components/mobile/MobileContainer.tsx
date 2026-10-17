import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal, Maximize2, Minimize2 } from 'lucide-react';

export const MobileContainer: React.FC<{ children: React.ReactNode; title?: string }> = ({ 
  children, 
  title 
}) => {
  const { deviceMode, setDeviceMode } = useApp();

  const isFrame = deviceMode === 'mobile';

  if (!isFrame) {
    return <div className="w-full min-h-screen bg-[var(--bg)]">{children}</div>;
  }

  return (
    <div className="py-6 px-4 flex justify-center items-center min-h-[calc(100vh-64px)] bg-[var(--bg)]">
      {/* iPhone 15 Pro / Apple Frame (390px width standard) */}
      <div className="w-[390px] h-[844px] max-h-[90vh] bg-[var(--surface)] text-[var(--text)] rounded-[48px] border-[10px] border-[#2C2C2E] shadow-elevated flex flex-col overflow-hidden relative transition-all">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-end pr-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E] border border-white/10" />
        </div>

        {/* Status Bar */}
        <div className="h-11 px-7 flex items-center justify-between text-[13px] font-semibold select-none flex-shrink-0 z-40 bg-[var(--surface)]">
          <span className="tabular-nums font-bold">09:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Mobile Viewport Content */}
        <div className="flex-1 overflow-y-auto relative flex flex-col">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-5 bg-[var(--surface)] flex items-center justify-center flex-shrink-0 z-40">
          <div className="w-32 h-1 rounded-full bg-[var(--text)]/30" />
        </div>
      </div>
    </div>
  );
};
