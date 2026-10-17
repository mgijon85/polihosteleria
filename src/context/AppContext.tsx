import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Order, 
  Client, 
  Product, 
  Supplier, 
  Route, 
  Invoice, 
  AIAssistant, 
  DecisionItem,
  Conversation 
} from '../types';
import { 
  ORDERS as INITIAL_ORDERS, 
  CLIENTS as INITIAL_CLIENTS, 
  PRODUCTS as INITIAL_PRODUCTS, 
  SUPPLIERS as INITIAL_SUPPLIERS, 
  ROUTES as INITIAL_ROUTES, 
  INITIAL_DECISIONS, 
  AI_ASSISTANTS as INITIAL_AI 
} from '../data/mockData';
import { INITIAL_CONVERSATIONS } from '../data/mockConversations';

export type DeviceMode = 'desktop' | 'mobile' | 'tablet';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'ok' | 'warn' | 'danger' | 'info';
  duration?: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Navigation active tab for desktop
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data
  orders: Order[];
  clients: Client[];
  products: Product[];
  suppliers: Supplier[];
  routes: Route[];
  decisions: DecisionItem[];
  conversations: Conversation[];
  assistants: AIAssistant[];
  invoices: Invoice[];
  toasts: ToastMessage[];

  // Actions
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  confirmReviewOrder: (orderId: string, updatedLines?: any[]) => void;
  addNewOrder: (order: Partial<Order>) => void;
  duplicateOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, newStatus: any) => void;
  resolveDecision: (decisionId: string, action: 'approve' | 'reject') => void;
  notifySalesRep: (clientId: string) => void;
  toggleAssistant: (assistantId: string) => void;
  deliverStopAndCollect: (routeId: string, stopId: string, amount: number, method: 'efectivo' | 'tarjeta') => void;
  reorderRouteStops: (routeId: string, fromIndex: number, toIndex: number) => void;
  takeOverConversation: (convId: string) => void;
  sendConversationMessage: (convId: string, text: string) => void;
  
  // Demo Triggers
  triggerSimulation: (type: 'whatsapp_night' | 'phone_night' | 'delivery_cash') => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;

  // Drawer / Modals global state
  reviewingOrderId: string | null;
  setReviewingOrderId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  isNewOrderModalOpen: boolean;
  setIsNewOrderModalOpen: (open: boolean) => void;
  isXgestEvoModalOpen: boolean;
  setIsXgestEvoModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('direccion');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<string>('inicio');

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES);
  const [decisions, setDecisions] = useState<DecisionItem[]>(INITIAL_DECISIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [assistants, setAssistants] = useState<AIAssistant[]>(INITIAL_AI);
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'inv-1', invoiceNumber: 'FRA-2026-0412', series: 'A-2026', clientId: 'cli-2', clientName: 'Marisquería El Puerto', cif: 'B-21100234', date: '2026-10-15', dueDate: '2026-10-30', deliveryNotes: ['ALB-8910', 'ALB-8942'], subtotal: 1240.00, tax: 260.40, total: 1500.40, status: 'pendiente', verifactuQr: 'https://verifactu.agenciatributaria.gob.es/qr/POLI-0412', hasExportedAccounting: true },
    { id: 'inv-2', invoiceNumber: 'FRA-2026-0411', series: 'A-2026', clientId: 'cli-4', clientName: 'Hotel Fuerte El Rompido', cif: 'A-21098441', date: '2026-10-10', dueDate: '2026-11-10', deliveryNotes: ['ALB-8820', 'ALB-8850', 'ALB-8889'], subtotal: 3570.25, tax: 749.75, total: 4320.00, status: 'cobrada', verifactuQr: 'https://verifactu.agenciatributaria.gob.es/qr/POLI-0411', hasExportedAccounting: true },
    { id: 'inv-3', invoiceNumber: 'FRA-2026-0410', series: 'A-2026', clientId: 'cli-6', clientName: 'Bar El Puerto', cif: 'B-21188301', date: '2026-09-30', dueDate: '2026-10-15', deliveryNotes: ['ALB-8712'], subtotal: 809.92, tax: 170.08, total: 980.00, status: 'vencida', verifactuQr: 'https://verifactu.agenciatributaria.gob.es/qr/POLI-0410', hasExportedAccounting: true },
    { id: 'inv-4', invoiceNumber: 'FRA-2026-0409', series: 'R-2026', clientId: 'cli-1', clientName: 'Bar La Ribera', cif: 'B-21100137', date: '2026-10-05', dueDate: '2026-10-05', deliveryNotes: ['ALB-8640'], subtotal: -45.00, tax: -9.45, total: -54.45, status: 'cobrada', verifactuQr: 'https://verifactu.agenciatributaria.gob.es/qr/POLI-0409', hasExportedAccounting: true },
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isXgestEvoModalOpen, setIsXgestEvoModalOpen] = useState(false);

  // Apply theme to html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'comercial' || newRole === 'repartidor' || newRole === 'cliente') {
      setDeviceMode('mobile');
    } else if (newRole === 'almacen') {
      setDeviceMode('tablet');
      setActiveTab('preparacion');
    } else {
      setDeviceMode('desktop');
      setActiveTab('inicio');
    }
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const confirmReviewOrder = (orderId: string, updatedLines?: any[]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'confirmado',
          lines: updatedLines || o.lines,
        };
      }
      return o;
    }));
    setReviewingOrderId(null);
    addToast({
      type: 'ok',
      title: 'Pedido confirmado con éxito',
      message: 'Se ha enviado la confirmación al cliente por WhatsApp.',
    });
  };

  const addNewOrder = (newOrderData: Partial<Order>) => {
    const orderNum = `PED-2026-${String(840 + orders.length + 1)}`;
    const fullOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      clientId: newOrderData.clientId || 'cli-1',
      clientName: newOrderData.clientName || 'Bar La Ribera',
      clientZone: newOrderData.clientZone || 'Costa oeste',
      channel: newOrderData.channel || 'oficina',
      isNightOrder: false,
      createdAt: new Date().toISOString(),
      deliveryDate: '2026-10-18',
      routeId: 'rt-costa-o',
      routeName: 'Costa oeste',
      status: 'confirmado',
      paymentStatus: 'pendiente',
      paymentMethod: 'Contado al repartidor',
      lines: newOrderData.lines || [],
      subtotal: newOrderData.subtotal || 0,
      taxTotal: newOrderData.taxTotal || 0,
      shippingFee: newOrderData.shippingFee || 0,
      total: newOrderData.total || 0,
      totalMargin: newOrderData.totalMargin || 0,
      totalMarginPercent: newOrderData.totalMarginPercent || 40,
      packagesCount: (newOrderData.lines?.length || 1) * 2,
    };

    setOrders(prev => [fullOrder, ...prev]);
    setIsNewOrderModalOpen(false);
    addToast({
      type: 'ok',
      title: `Pedido ${orderNum} registrado`,
      message: 'Entrado en ruta de entrega y enviado a picking de almacén.',
    });
  };

  const duplicateOrder = (orderId: string) => {
    const source = orders.find(o => o.id === orderId);
    if (!source) return;
    const newOrdNum = `PED-2026-${String(840 + orders.length + 1)}`;
    const copy: Order = {
      ...source,
      id: `ord-${Date.now()}`,
      orderNumber: newOrdNum,
      createdAt: new Date().toISOString(),
      status: 'confirmado',
      paymentStatus: 'pendiente',
    };
    setOrders(prev => [copy, ...prev]);
    addToast({
      type: 'ok',
      title: 'Pedido duplicado',
      message: `Se ha creado el pedido ${newOrdNum} con las mismas líneas.`,
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast({
      type: 'ok',
      title: 'Estado actualizado',
      message: `El pedido ha pasado a "${newStatus.replace('_', ' ')}".`,
    });
  };

  const resolveDecision = (decisionId: string, action: 'approve' | 'reject') => {
    const item = decisions.find(d => d.id === decisionId);
    setDecisions(prev => prev.filter(d => d.id !== decisionId));
    if (action === 'approve') {
      addToast({
        type: 'ok',
        title: 'Acción aprobada',
        message: item ? `${item.title}: Acción ejecutada correctamente.` : 'Aprobado con éxito.',
      });
    } else {
      addToast({
        type: 'warn',
        title: 'Acción rechazada / retenida',
        message: item ? `${item.title}: Solicitud rechazada.` : 'Rechazado.',
      });
    }
  };

  const notifySalesRep = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    addToast({
      type: 'ok',
      title: 'Aviso enviado al comercial',
      message: `Se ha añadido la visita de recuperación prioritaria a ${client?.salesRepName || 'Antonio'}.`,
    });
  };

  const toggleAssistant = (assistantId: string) => {
    setAssistants(prev => prev.map(a => {
      if (a.id === assistantId) {
        const nextState = !a.enabled;
        addToast({
          type: nextState ? 'ok' : 'warn',
          title: nextState ? `${a.name} activado` : `${a.name} pausado`,
        });
        return { ...a, enabled: nextState };
      }
      return a;
    }));
  };

  const deliverStopAndCollect = (routeId: string, stopId: string, amount: number, method: 'efectivo' | 'tarjeta') => {
    setRoutes(prev => prev.map(r => {
      if (r.id === routeId) {
        const updatedStops = r.stops.map(s => {
          if (s.id === stopId) {
            return { ...s, status: 'entregado' as const, pendingAmount: 0 };
          }
          return s;
        });
        const cashAdd = method === 'efectivo' ? amount : 0;
        const cardAdd = method === 'tarjeta' ? amount : 0;
        return {
          ...r,
          completedStops: r.completedStops + 1,
          collectedCash: r.collectedCash + cashAdd,
          collectedCard: r.collectedCard + cardAdd,
          stops: updatedStops,
        };
      }
      return r;
    }));

    addToast({
      type: 'ok',
      title: `Entrega completada · Cobro: ${amount.toFixed(2)} €`,
      message: `Anotado en caja del día (${method}). Mensaje enviado al cliente.`,
    });
  };

  const reorderRouteStops = (routeId: string, fromIndex: number, toIndex: number) => {
    setRoutes(prev => prev.map(r => {
      if (r.id === routeId) {
        const newStops = [...r.stops];
        const [moved] = newStops.splice(fromIndex, 1);
        newStops.splice(toIndex, 0, moved);
        return { ...r, stops: newStops };
      }
      return r;
    }));
    addToast({
      type: 'info',
      title: 'Ruta reordenada',
      message: 'Se han recalculado las horas estimadas de llegada (ETA).',
    });
  };

  const takeOverConversation = (convId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return { ...c, status: 'humano_control' };
      }
      return c;
    }));
    addToast({
      type: 'info',
      title: 'Control manual tomado',
      message: 'La IA ha pausado sus respuestas automáticas en este chat.',
    });
  };

  const sendConversationMessage = (convId: string, text: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: 'agent' as const,
          senderName: 'Rocío (Oficina)',
          text,
          timestamp: 'Ahora',
        };
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Ahora',
          messages: [...c.messages, newMsg],
        };
      }
      return c;
    }));
  };

  // Demo simulator triggers
  const triggerSimulation = (type: 'whatsapp_night' | 'phone_night' | 'delivery_cash') => {
    if (type === 'whatsapp_night') {
      const newOrderNum = `PED-2026-0899`;
      const simOrder: Order = {
        id: `sim-ord-${Date.now()}`,
        orderNumber: newOrderNum,
        clientId: 'cli-8',
        clientName: 'Venta El Cruce',
        clientZone: 'Condado',
        channel: 'whatsapp',
        isNightOrder: true,
        createdAt: '2026-10-17T23:40:00Z',
        deliveryDate: '2026-10-18',
        routeId: 'rt-condado',
        routeName: 'Condado',
        status: 'por_revisar',
        paymentStatus: 'pendiente',
        paymentMethod: 'Contado al repartidor',
        reviewReason: 'Audio WhatsApp entrante a las 23:40: transcripción lista',
        originalMessage: {
          type: 'whatsapp_audio',
          audioDuration: '0:22',
          transcript: '«Hola Juanlu, perdona la hora, que cerramos ahora la cocina. Mándame 2 cajas de manteles individuales rústicos y 1 caja de tenedores de carne de los buenos, que el domingo tenemos comunión.»',
        },
        lines: [
          { id: 'ln-sim-1', productId: 'prod-4', sku: 'CEL-004', name: 'Mantel individual papel kraft 30x40 cm reciclado', format: 'Caja 1.000 ud', quantity: 2, unitPrice: 18.80, discountPercent: 0, finalPrice: 18.80, total: 37.60, taxRate: 21, taxAmount: 7.90, costPrice: 11.20, location: 'P01-E02-H02', aiConfidence: 'alta' },
          { id: 'ln-sim-2', productId: 'prod-17', sku: 'CUB-402', name: 'Cuchillo mesa chuletero sierra forjado mango madera', format: 'Caja 12 ud', quantity: 1, unitPrice: 24.90, discountPercent: 0, finalPrice: 24.90, total: 24.90, taxRate: 21, taxAmount: 5.23, costPrice: 14.50, location: 'P04-E03-H02', aiConfidence: 'media', aiOriginalText: '1 caja de tenedores de carne de los buenos (se interpretó chuletero o tenedor)' },
        ],
        subtotal: 62.50,
        taxTotal: 13.13,
        shippingFee: 6.50,
        total: 82.13,
        totalMargin: 22.30,
        totalMarginPercent: 35.7,
        packagesCount: 3,
      };

      setOrders(prev => [simOrder, ...prev]);
      addToast({
        type: 'info',
        title: '🌙 Nuevo pedido WhatsApp (23:40)',
        message: 'Audio recibido de Venta El Cruce. La IA ha generado el pedido con etiqueta «🌙 Noche».',
        duration: 6000,
      });
      // Switch to orders view so the user immediately sees it
      setActiveTab('pedidos');
      setReviewingOrderId(simOrder.id);
    } else if (type === 'phone_night') {
      const simOrder: Order = {
        id: `sim-phone-${Date.now()}`,
        orderNumber: 'PED-2026-0900',
        clientId: 'cli-9',
        clientName: 'Mesón El Rincón Ibérico',
        clientZone: 'Sierra',
        channel: 'telefono_ia',
        isNightOrder: true,
        createdAt: '2026-10-17T03:15:00Z',
        deliveryDate: '2026-10-18',
        routeId: 'rt-sierra',
        routeName: 'Sierra',
        status: 'por_revisar',
        paymentStatus: 'pendiente',
        paymentMethod: 'Contado al repartidor',
        reviewReason: 'Llamada fuera de horario: cliente solicita vasos caña y lavavajillas',
        originalMessage: {
          type: 'phone_call',
          audioDuration: '0:34',
          transcript: '«Buenas, soy Esteban de Aracena. Por favor, metedme para la ruta de la sierra 2 cajas de vasos de caña y una garrafa de lavavajillas industrial, que el fin de semana se llena el pueblo.»',
        },
        lines: [
          { id: 'ln-phone-1', productId: 'prod-14', sku: 'CRI-202', name: 'Vaso caña cortado 22 cl vidrio reforzado', format: 'Caja 24 ud', quantity: 2, unitPrice: 17.80, discountPercent: 0, finalPrice: 17.80, total: 35.60, taxRate: 21, taxAmount: 7.48, costPrice: 9.60, location: 'P03-E01-H02', aiConfidence: 'alta' },
          { id: 'ln-phone-2', productId: 'prod-7', sku: 'LIM-101', name: 'Detergente lavavajillas automático aguas duras', format: 'Garrafa 5 L', quantity: 1, unitPrice: 19.80, discountPercent: 0, finalPrice: 19.80, total: 19.80, taxRate: 21, taxAmount: 4.16, costPrice: 11.50, location: 'P02-E01-H01', aiConfidence: 'alta' },
        ],
        subtotal: 55.40,
        taxTotal: 11.63,
        shippingFee: 6.50,
        total: 73.53,
        packagesCount: 3,
      };

      setOrders(prev => [simOrder, ...prev]);
      addToast({
        type: 'info',
        title: '📞 Llamada fuera de horario atendida por IA',
        message: 'Mesón El Rincón Ibérico (Aracena) grabado y transcrito automáticamente.',
        duration: 6000,
      });
      setActiveTab('pedidos');
      setReviewingOrderId(simOrder.id);
    } else if (type === 'delivery_cash') {
      deliverStopAndCollect('rt-costa-o', 'stp-4', 320.00, 'tarjeta');
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        deviceMode,
        setDeviceMode,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        orders,
        clients,
        products,
        suppliers,
        routes,
        decisions,
        conversations,
        assistants,
        invoices,
        toasts,
        addToast,
        removeToast,
        confirmReviewOrder,
        addNewOrder,
        duplicateOrder,
        updateOrderStatus,
        resolveDecision,
        notifySalesRep,
        toggleAssistant,
        deliverStopAndCollect,
        reorderRouteStops,
        takeOverConversation,
        sendConversationMessage,
        triggerSimulation,
        isDemoModalOpen,
        setIsDemoModalOpen,
        reviewingOrderId,
        setReviewingOrderId,
        selectedOrderId,
        setSelectedOrderId,
        selectedClientId,
        setSelectedClientId,
        selectedProductId,
        setSelectedProductId,
        isNewOrderModalOpen,
        setIsNewOrderModalOpen,
        isXgestEvoModalOpen,
        setIsXgestEvoModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
