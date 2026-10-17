import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/Toast';
import { DemoModal } from './components/common/DemoModal';

// Desktop views
import { InicioView } from './components/desktop/InicioView';
import { PedidosView } from './components/desktop/PedidosView';
import { PreparacionView } from './components/desktop/PreparacionView';
import { RepartoView } from './components/desktop/RepartoView';
import { ClientesView } from './components/desktop/ClientesView';
import { ComercialesView } from './components/desktop/ComercialesView';
import { PromocionesView } from './components/desktop/PromocionesView';
import { ArticulosView } from './components/desktop/ArticulosView';
import { TarifasView } from './components/desktop/TarifasView';
import { StockView } from './components/desktop/StockView';
import { ComprasView } from './components/desktop/ComprasView';
import { FacturasView } from './components/desktop/FacturasView';
import { CobrosView } from './components/desktop/CobrosView';
import { AsistentesView } from './components/desktop/AsistentesView';
import { ConversacionesView } from './components/desktop/ConversacionesView';
import { InformesView } from './components/desktop/InformesView';
import { EquipoView } from './components/desktop/EquipoView';
import { AjustesView } from './components/desktop/AjustesView';

// Mobile views
import { AppComercial } from './components/mobile/AppComercial';
import { AppRepartidor } from './components/mobile/AppRepartidor';
import { PortalCliente } from './components/mobile/PortalCliente';

// Tablet view
import { AlmacenTabletView } from './components/tablet/AlmacenTabletView';

export const AppContent: React.FC = () => {
  const { role, activeTab, deviceMode } = useApp();

  // If role is a mobile worker or client, render their respective app
  if (role === 'comercial') {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)]">
        <Header />
        <AppComercial />
        <ToastContainer />
        <DemoModal />
      </div>
    );
  }

  if (role === 'repartidor') {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)]">
        <Header />
        <AppRepartidor />
        <ToastContainer />
        <DemoModal />
      </div>
    );
  }

  if (role === 'cliente') {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)]">
        <Header />
        <PortalCliente />
        <ToastContainer />
        <DemoModal />
      </div>
    );
  }

  if (role === 'almacen' || deviceMode === 'tablet') {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)]">
        <Header />
        <AlmacenTabletView />
        <ToastContainer />
        <DemoModal />
      </div>
    );
  }

  // Desktop layout for Dirección and Oficina
  const renderDesktopView = () => {
    switch (activeTab) {
      case 'inicio': return <InicioView />;
      case 'pedidos': return <PedidosView />;
      case 'preparacion': return <PreparacionView />;
      case 'reparto': return <RepartoView />;
      case 'clientes': return <ClientesView />;
      case 'comerciales': return <ComercialesView />;
      case 'promociones': return <PromocionesView />;
      case 'articulos': return <ArticulosView />;
      case 'tarifas': return <TarifasView />;
      case 'stock': return <StockView />;
      case 'compras': return <ComprasView />;
      case 'facturas': return <FacturasView />;
      case 'cobros': return <CobrosView />;
      case 'asistentes': return <AsistentesView />;
      case 'conversaciones': return <ConversacionesView />;
      case 'informes': return <InformesView />;
      case 'equipo': return <EquipoView />;
      case 'ajustes': return <AjustesView />;
      default: return <InicioView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {renderDesktopView()}
        </main>
      </div>
      <ToastContainer />
      <DemoModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
