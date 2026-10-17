export type UserRole = 
  | 'direccion'     // Juanlu (dueño) - Ve todo y márgenes
  | 'oficina'       // Rocío - Pedidos, clientes, facturas, cobros (sin márgenes)
  | 'almacen'       // Paco - Tablet preparación, stock, recepción
  | 'comercial'     // Antonio, Marta - App móvil visitas y pedidos
  | 'repartidor'    // José, Miguel - App móvil ruta y cobro
  | 'cliente';      // Bar La Ribera - Portal web pedidos rápidos

export type ClientType = 'bar' | 'restaurante' | 'hotel' | 'colectividad';

export type ClientHealth = 'normal' | 'cooling' | 'debt_risk'; // verde, ámbar, rojo

export interface Client {
  id: string;
  name: string;
  commercialName?: string;
  cif: string;
  type: ClientType;
  zone: 'Huelva centro' | 'Huelva norte' | 'Costa oeste' | 'Costa este' | 'Condado' | 'Sierra';
  address: string;
  city: string;
  phone: string;
  email: string;
  contactPerson: string;
  salesRepId: string;
  salesRepName: string;
  health: ClientHealth;
  tierId: string; // 'general' | 'hoteles' | 'restauracion' | 'bares' | 'colectividades'
  tierName: string;
  paymentTerm: 'contado' | 'giro_30' | 'giro_60' | 'transferencia' | 'efectivo_reparto';
  creditLimit: number;
  currentBalance: number;
  overdueBalance: number;
  deliveryDays: string[];
  minOrder: number;
  lastOrderDate: string;
  orderFrequencyDays: number;
  daysSinceLastOrder: number;
  annualSales: number;
  averageTicket: number;
  notes: string;
  specialPricesCount: number;
}

export type ProductCategory = 
  | 'menaje'        // Menaje y vajilla
  | 'cristaleria'   // Cristalería
  | 'cuberteria'    // Cubertería
  | 'desechables'   // Desechables y envases
  | 'celulosa'      // Celulosa (servilletas, manteles, bobinas)
  | 'limpieza'      // Limpieza e higiene
  | 'maquinaria'    // Pequeña maquinaria
  | 'uniformes'     // Uniformes
  | 'terraza';      // Mobiliario de terraza

export interface Product {
  id: string;
  sku: string;
  ean: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  format: string; // ej: "Caja 2.400 ud", "Caja 6 ud", "Garrafa 5 L"
  unit: string;   // "caja", "ud", "pack", "garrafa"
  costPrice: number;       // Solo Dirección
  generalPrice: number;    // Precio base PVP
  taxRate: number;         // 21% general, 10% hostelería/consumibles
  stock: number;
  minStock: number;
  reservedStock: number;
  availableStock: number;
  aisle: string;           // Pasillo (ej: P02)
  shelf: string;           // Estantería (ej: E04)
  bin: string;             // Hueco (ej: H12)
  supplierId: string;
  supplierName: string;
  showInPortal: boolean;
  description: string;
  imageUrl?: string;
  relatedProductIds?: string[];
}

export type OrderChannel = 'whatsapp' | 'telefono_ia' | 'portal' | 'comercial' | 'correo' | 'oficina';

export type OrderStatus = 
  | 'por_revisar' 
  | 'confirmado' 
  | 'en_preparacion' 
  | 'preparado' 
  | 'en_reparto' 
  | 'entregado' 
  | 'facturado';

export interface OrderLine {
  id: string;
  productId: string;
  sku: string;
  name: string;
  format: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  finalPrice: number;
  total: number;
  taxRate: number;
  taxAmount: number;
  costPrice: number; // For margin calculation
  location: string;  // P01-E02-H03
  picked?: boolean;
  shortage?: number; // Cantidad que falta
  substituteName?: string;
  aiConfidence?: 'alta' | 'media' | 'duda';
  aiOriginalText?: string;
  aiOptions?: { productId: string; name: string; price: number }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  clientZone: string;
  channel: OrderChannel;
  isNightOrder: boolean; // 🌙 Noche (fuera de horario 22:00 - 07:00)
  createdAt: string;     // ISO or formatted
  deliveryDate: string;
  routeId: string;
  routeName: string;
  lines: OrderLine[];
  subtotal: number;
  taxTotal: number;
  shippingFee: number;
  total: number;
  totalMargin?: number;
  totalMarginPercent?: number;
  status: OrderStatus;
  paymentStatus: 'pendiente' | 'cobrado_reparto' | 'cobrado_tarjeta' | 'remesa_sepa' | 'impagado';
  paymentMethod: string;
  notes?: string;
  packagesCount?: number;
  reviewReason?: string; // Para pedidos "por revisar"
  originalMessage?: {
    type: 'whatsapp_audio' | 'whatsapp_text' | 'phone_call' | 'email_pdf';
    audioUrl?: string;
    audioDuration?: string;
    transcript?: string;
    rawText?: string;
    pdfName?: string;
  };
  deliveryNotes?: string;
  signedBy?: string;
  signatureDate?: string;
  deliveryPhoto?: string;
}

export interface Supplier {
  id: string;
  name: string;
  cif: string;
  city: string;
  contact: string;
  phone: string;
  email: string;
  categories: ProductCategory[];
  leadTimeDays: number;
  minOrderAmount: number;
  pendingOrdersCount: number;
}

export interface RouteStop {
  id: string;
  orderId: string;
  clientName: string;
  address: string;
  city: string;
  eta: string;
  packages: number;
  weightKg: number;
  pendingAmount: number;
  status: 'pendiente' | 'en_camino' | 'entregado' | 'incidencia';
  paymentMethod: 'efectivo' | 'tarjeta' | 'cuenta';
  notes?: string;
  phone: string;
  contact: string;
}

export interface Route {
  id: string;
  name: string;
  driverId: string;
  driverName: string;
  vehicle: string; // ej: "Mercedes Sprinter 4120-JLM"
  totalStops: number;
  completedStops: number;
  totalKg: number;
  totalAmountToCollect: number;
  collectedCash: number;
  collectedCard: number;
  expectedCash: number;
  expectedCard: number;
  status: 'no_iniciada' | 'en_progreso' | 'finalizada';
  stops: RouteStop[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  series: 'A-2026' | 'R-2026'; // General o Rectificativa
  clientId: string;
  clientName: string;
  cif: string;
  date: string;
  dueDate: string;
  deliveryNotes: string[]; // Albaranes agrupados
  subtotal: number;
  tax: number;
  total: number;
  status: 'pendiente' | 'cobrada' | 'vencida' | 'anulada';
  verifactuQr: string;
  hasExportedAccounting: boolean;
}

export interface AIAssistant {
  id: string;
  name: string;
  type: 'whatsapp' | 'telefono' | 'correo' | 'compras' | 'comercial';
  enabled: boolean;
  schedule: string;
  description: string;
  capabilities: string[];
  limitations: string[];
  stats: {
    ordersTakenThisWeek: number;
    autoResolvedPercent: number;
    totalInteractions: number;
  };
  recentExamples: {
    timestamp: string;
    client: string;
    summary: string;
    channel: string;
    audioUrl?: string;
    audioDuration?: string;
  }[];
}

export interface ConversationMessage {
  id: string;
  sender: 'client' | 'ai' | 'agent';
  senderName: string;
  text: string;
  audioDuration?: string;
  isAudio?: boolean;
  timestamp: string;
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  channel: 'whatsapp' | 'telefono' | 'correo';
  status: 'ia_activa' | 'humano_control' | 'cerrada';
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  associatedOrderId?: string;
  messages: ConversationMessage[];
}

export interface DecisionItem {
  id: string;
  type: 'descuento_comercial' | 'limite_credito' | 'compra_stock';
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  data: any;
}
