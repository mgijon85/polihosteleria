import React from 'react';
import { PreparacionView } from '../desktop/PreparacionView';

export const AlmacenTabletView: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[var(--bg)] p-2 sm:p-4">
      {/* Tablet status bar notice */}
      <div className="max-w-[1500px] mx-auto mb-3 px-4 py-2 bg-brand-soft rounded-control text-brand text-[12px] font-semibold flex items-center justify-between">
        <span>Tablet de Almacén Central · Operario: Paco Vázquez (Modo táctil 44px activo)</span>
        <span className="hidden sm:inline">Pistola lectora bluetooth conectada</span>
      </div>
      <PreparacionView />
    </div>
  );
};
