import { Client, ClientType, ClientHealth, Product, Order, OrderStatus, Supplier, Route, Invoice, AIAssistant, DecisionItem, ProductCategory } from '../types';

export const SUPPLIERS: Supplier[] = [
  { id: 'sup-1', name: 'Celulosas del Sur S.A.', cif: 'A-41098231', city: 'Sevilla', contact: 'Ignacio Morales', phone: '954 112 233', email: 'pedidos@celulosasur.es', categories: ['celulosa'], leadTimeDays: 2, minOrderAmount: 450, pendingOrdersCount: 2 },
  { id: 'sup-2', name: 'Químicas Tartessos S.L.', cif: 'B-21443322', city: 'Huelva', contact: 'Carmen Domínguez', phone: '959 281 900', email: 'ventas@quimicastartessos.com', categories: ['limpieza'], leadTimeDays: 1, minOrderAmount: 300, pendingOrdersCount: 1 },
  { id: 'sup-3', name: 'Vidrieras de Andalucía', cif: 'A-14029384', city: 'Córdoba', contact: 'Rafael Alcaide', phone: '957 441 200', email: 'info@vidrierasandalucia.com', categories: ['cristaleria'], leadTimeDays: 3, minOrderAmount: 600, pendingOrdersCount: 0 },
  { id: 'sup-4', name: 'Menaje Ibérico Hostelería', cif: 'B-28901234', city: 'Madrid', contact: 'Javier Lozano', phone: '916 554 433', email: 'distribucion@menajeiberico.es', categories: ['menaje', 'cuberteria'], leadTimeDays: 4, minOrderAmount: 500, pendingOrdersCount: 1 },
  { id: 'sup-5', name: 'Envases & Biopack Costa Luz', cif: 'B-21987654', city: 'Lepe (Huelva)', contact: 'Manuel Santana', phone: '959 380 120', email: 'pedidos@envasescostaluz.es', categories: ['desechables'], leadTimeDays: 1, minOrderAmount: 250, pendingOrdersCount: 3 },
  { id: 'sup-6', name: 'Maquinaria Hostelería Onubense', cif: 'B-21556677', city: 'Huelva', contact: 'Alfonso Gómez', phone: '959 223 344', email: 'maquinaria@hosteleriahuelva.com', categories: ['maquinaria'], leadTimeDays: 2, minOrderAmount: 800, pendingOrdersCount: 1 },
  { id: 'sup-7', name: 'Uniformes & Textil Confort', cif: 'B-41223344', city: 'Dos Hermanas', contact: 'Lucía Benítez', phone: '955 678 901', email: 'textil@uniformesconfort.es', categories: ['uniformes'], leadTimeDays: 3, minOrderAmount: 350, pendingOrdersCount: 0 },
  { id: 'sup-8', name: 'Mobiliario Terraza Sol y Mar', cif: 'A-29001122', city: 'Málaga', contact: 'Fernando Ramos', phone: '952 334 455', email: 'pedidos@terrazasolmar.com', categories: ['terraza'], leadTimeDays: 5, minOrderAmount: 1200, pendingOrdersCount: 1 },
  { id: 'sup-9', name: 'Papelera del Odiel', cif: 'B-21009988', city: 'San Juan del Puerto', contact: 'Rosa Márquez', phone: '959 356 789', email: 'comercial@papeleraodiel.com', categories: ['celulosa'], leadTimeDays: 1, minOrderAmount: 300, pendingOrdersCount: 0 },
  { id: 'sup-10', name: 'Higiene & Desinfección Pro', cif: 'B-90112233', city: 'Sevilla', contact: 'Daniel Cruz', phone: '954 990 011', email: 'info@higienepro.es', categories: ['limpieza'], leadTimeDays: 2, minOrderAmount: 400, pendingOrdersCount: 1 },
  { id: 'sup-11', name: 'Cristal Hostelería del Sur', cif: 'B-18223344', city: 'Granada', contact: 'Elena Ruiz', phone: '958 123 456', email: 'pedidos@cristalsur.com', categories: ['cristaleria'], leadTimeDays: 3, minOrderAmount: 500, pendingOrdersCount: 0 },
  { id: 'sup-12', name: 'EcoEnvases Guadiana', cif: 'B-21887766', city: 'Ayamonte', contact: 'Pedro Cárdenas', phone: '959 470 890', email: 'contacto@ecoenvasesguadiana.es', categories: ['desechables'], leadTimeDays: 2, minOrderAmount: 350, pendingOrdersCount: 0 },
];

export const SALES_REPS = [
  { id: 'rep-1', name: 'Antonio Gómez', phone: '654 11 22 33', email: 'antonio@polihosteleria.es', monthlySales: 48600, monthlyTarget: 52000, visitsDone: 34, newClients: 3 },
  { id: 'rep-2', name: 'Marta Benítez', phone: '654 22 33 44', email: 'marta@polihosteleria.es', monthlySales: 56400, monthlyTarget: 50000, visitsDone: 42, newClients: 5 },
  { id: 'rep-3', name: 'Carlos Prieto', phone: '654 33 44 55', email: 'carlos@polihosteleria.es', monthlySales: 39800, monthlyTarget: 45000, visitsDone: 29, newClients: 2 },
  { id: 'rep-4', name: 'Laura Méndez', phone: '654 44 55 66', email: 'laura@polihosteleria.es', monthlySales: 44200, monthlyTarget: 46000, visitsDone: 31, newClients: 4 },
];

export const DRIVERS = [
  { id: 'drv-1', name: 'José Romero', phone: '655 10 20 30', route: 'Costa oeste', van: 'Mercedes Sprinter (4120-JLM)' },
  { id: 'drv-2', name: 'Miguel Santos', phone: '655 20 30 40', route: 'Huelva centro', van: 'Iveco Daily (8832-KBF)' },
  { id: 'drv-3', name: 'Dani Ramos', phone: '655 30 40 50', route: 'Costa este', van: 'Ford Transit (1902-LPT)' },
  { id: 'drv-4', name: 'Paco Vázquez', phone: '655 40 50 60', route: 'Condado', van: 'Renault Master (5521-MCK)' },
  { id: 'drv-5', name: 'Manuel Pérez', phone: '655 50 60 70', route: 'Sierra', van: 'Iveco Daily 4x4 (3344-HGB)' },
];

// Helper to generate realistic products
function generateProducts(): Product[] {
  const categories: { cat: ProductCategory; name: string; supId: string; supName: string }[] = [
    { cat: 'celulosa', name: 'Celulosa', supId: 'sup-1', supName: 'Celulosas del Sur S.A.' },
    { cat: 'limpieza', name: 'Limpieza e higiene', supId: 'sup-2', supName: 'Químicas Tartessos S.L.' },
    { cat: 'cristaleria', name: 'Cristalería', supId: 'sup-3', supName: 'Vidrieras de Andalucía' },
    { cat: 'menaje', name: 'Menaje y vajilla', supId: 'sup-4', supName: 'Menaje Ibérico Hostelería' },
    { cat: 'cuberteria', name: 'Cubertería', supId: 'sup-4', supName: 'Menaje Ibérico Hostelería' },
    { cat: 'desechables', name: 'Desechables y envases', supId: 'sup-5', supName: 'Envases & Biopack Costa Luz' },
    { cat: 'maquinaria', name: 'Pequeña maquinaria', supId: 'sup-6', supName: 'Maquinaria Hostelería Onubense' },
    { cat: 'uniformes', name: 'Uniformes', supId: 'sup-7', supName: 'Uniformes & Textil Confort' },
    { cat: 'terraza', name: 'Mobiliario de terraza', supId: 'sup-8', supName: 'Mobiliario Terraza Sol y Mar' },
  ];

  const baseItems: Partial<Product>[] = [
    // Celulosa
    { sku: 'CEL-001', name: 'Servilleta 2 capas 33x33 blanca punta punta', category: 'celulosa', format: 'Caja 2.400 ud (24 packs × 100)', unit: 'caja', costPrice: 14.80, generalPrice: 24.50, stock: 142, minStock: 50, reservedStock: 32, aisle: 'P01', shelf: 'E01', bin: 'H01', description: 'Servilleta celulosa 100% virgen, suave y resistente al desgarro.' },
    { sku: 'CEL-002', name: 'Servilleta 2 capas 40x40 negra plegado 1/4', category: 'celulosa', format: 'Caja 1.600 ud (16 packs × 100)', unit: 'caja', costPrice: 18.20, generalPrice: 29.90, stock: 45, minStock: 25, reservedStock: 12, aisle: 'P01', shelf: 'E01', bin: 'H02', description: 'Gama premium negra elegante para cenas y coctelería.' },
    { sku: 'CEL-003', name: 'Servilleta Miniservice 17x17 blanca para servilletero', category: 'celulosa', format: 'Caja 14.000 ud (14 packs × 1.000)', unit: 'caja', costPrice: 21.50, generalPrice: 34.90, stock: 88, minStock: 40, reservedStock: 20, aisle: 'P01', shelf: 'E02', bin: 'H01', description: 'Especial barra y terrazas de alta rotación.' },
    { sku: 'CEL-004', name: 'Mantel individual papel kraft 30x40 cm reciclado', category: 'celulosa', format: 'Caja 1.000 ud', unit: 'caja', costPrice: 11.20, generalPrice: 18.80, stock: 120, minStock: 60, reservedStock: 45, aisle: 'P01', shelf: 'E02', bin: 'H02', description: 'Estilo rústico eco, 100% fibra recuperada.' },
    { sku: 'CEL-005', name: 'Bobina secamanos celulosa pasta blanca gofrada 2 capas', category: 'celulosa', format: 'Pack 6 bobinas × 140 m', unit: 'pack', costPrice: 12.40, generalPrice: 21.00, stock: 95, minStock: 40, reservedStock: 18, aisle: 'P01', shelf: 'E03', bin: 'H01', description: 'Alta absorción cocina y zona de pase.' },
    { sku: 'CEL-006', name: 'Rollo mantel continuo novotex 1,20 x 50 m burdeos', category: 'celulosa', format: 'Rollo 50 metros', unit: 'rollo', costPrice: 16.90, generalPrice: 27.50, stock: 32, minStock: 15, reservedStock: 4, aisle: 'P01', shelf: 'E03', bin: 'H02', description: 'Tejido no tejido efecto tela impermeable.' },

    // Limpieza
    { sku: 'LIM-101', name: 'Detergente lavavajillas automático aguas duras vajilla cristal', category: 'limpieza', format: 'Garrafa 5 L (6 kg)', unit: 'garrafa', costPrice: 11.50, generalPrice: 19.80, stock: 68, minStock: 30, reservedStock: 14, aisle: 'P02', shelf: 'E01', bin: 'H01', description: 'Fórmula anti-calcareo para Huelva y Costa.' },
    { sku: 'LIM-102', name: 'Abrillantador secante máquinas túnel y cúpula', category: 'limpieza', format: 'Garrafa 5 L', unit: 'garrafa', costPrice: 9.80, generalPrice: 16.50, stock: 54, minStock: 25, reservedStock: 10, aisle: 'P02', shelf: 'E01', bin: 'H02', description: 'Secado instantáneo sin manchas de agua.' },
    { sku: 'LIM-103', name: 'Desengrasante alcalino concentrado planchas y hornos', category: 'limpieza', format: 'Garrafa 5 L', unit: 'garrafa', costPrice: 13.20, generalPrice: 22.90, stock: 40, minStock: 20, reservedStock: 8, aisle: 'P02', shelf: 'E02', bin: 'H01', description: 'Elimina grasa requemada en planchas calientes.' },
    { sku: 'LIM-104', name: 'Fregasuelos bioalcohol brillo aroma pino silvestre', category: 'limpieza', format: 'Garrafa 5 L', unit: 'garrafa', costPrice: 6.20, generalPrice: 11.40, stock: 110, minStock: 40, reservedStock: 25, aisle: 'P02', shelf: 'E02', bin: 'H02', description: 'Secado rápido para salones con tráfico continuo.' },
    { sku: 'LIM-105', name: 'Pastillas lavavajillas multiacción concentradas', category: 'limpieza', format: 'Caja 150 pastillas', unit: 'caja', costPrice: 14.10, generalPrice: 23.90, stock: 38, minStock: 15, reservedStock: 6, aisle: 'P02', shelf: 'E03', bin: 'H01', description: 'Ideal para pequeños bares sin dosificador automático.' },
    { sku: 'LIM-106', name: 'Gel hidroalcohólico higienizante de manos con dosificador', category: 'limpieza', format: 'Caja 12 botellas × 1 L', unit: 'caja', costPrice: 19.50, generalPrice: 32.00, stock: 28, minStock: 15, reservedStock: 3, aisle: 'P02', shelf: 'E03', bin: 'H02', description: '70% alcohol con aloe vera.' },

    // Cristaleria
    { sku: 'CRI-201', name: 'Vaso sidra extra fino 50 cl vidrio tensionado', category: 'cristaleria', format: 'Caja 12 ud', unit: 'caja', costPrice: 7.20, generalPrice: 13.50, stock: 210, minStock: 80, reservedStock: 60, aisle: 'P03', shelf: 'E01', bin: 'H01', description: 'El vaso más vendido para combinados y cerveza en terraza.' },
    { sku: 'CRI-202', name: 'Vaso caña cortado 22 cl vidrio reforzado', category: 'cristaleria', format: 'Caja 24 ud', unit: 'caja', costPrice: 9.60, generalPrice: 17.80, stock: 165, minStock: 60, reservedStock: 35, aisle: 'P03', shelf: 'E01', bin: 'H02', description: 'El clásico vaso de caña onubense.' },
    { sku: 'CRI-203', name: 'Copa de vino Burdeos 47 cl cristal sonoro templado', category: 'cristaleria', format: 'Caja 6 ud', unit: 'caja', costPrice: 8.90, generalPrice: 16.20, stock: 92, minStock: 35, reservedStock: 16, aisle: 'P03', shelf: 'E02', bin: 'H01', description: 'Resistente a lavavajillas con gran campana de aroma.' },
    { sku: 'CRI-204', name: 'Copa gin tonic balón 62 cl cristal fino templado', category: 'cristaleria', format: 'Caja 6 ud', unit: 'caja', costPrice: 10.40, generalPrice: 18.90, stock: 74, minStock: 30, reservedStock: 18, aisle: 'P03', shelf: 'E02', bin: 'H02', description: 'Balón generoso para hielo industrial y botánicos.' },
    { sku: 'CRI-205', name: 'Jarra cerveza Munich 50 cl con asa ergonómica', category: 'cristaleria', format: 'Caja 6 ud', unit: 'caja', costPrice: 12.80, generalPrice: 22.50, stock: 48, minStock: 20, reservedStock: 8, aisle: 'P03', shelf: 'E03', bin: 'H01', description: 'Vidrio grueso para retención de frío de barril.' },

    // Menaje
    { sku: 'MEN-301', name: 'Plato llano redondo porcelana hotelera blanca 27 cm', category: 'menaje', format: 'Pack 6 ud', unit: 'pack', costPrice: 12.50, generalPrice: 21.90, stock: 85, minStock: 30, reservedStock: 12, aisle: 'P04', shelf: 'E01', bin: 'H01', description: 'Bordes reforzados anti-desportille garantizados.' },
    { sku: 'MEN-302', name: 'Plato hondo ala ancha 23 cm porcelana vitrificada', category: 'menaje', format: 'Pack 6 ud', unit: 'pack', costPrice: 11.80, generalPrice: 19.80, stock: 62, minStock: 25, reservedStock: 6, aisle: 'P04', shelf: 'E01', bin: 'H02', description: 'Especial guisos marineros y arroces caldosos.' },
    { sku: 'MEN-303', name: 'Plato pizarra natural tratada alimentaria 30x20 cm', category: 'menaje', format: 'Pack 4 ud', unit: 'pack', costPrice: 9.40, generalPrice: 16.80, stock: 40, minStock: 20, reservedStock: 4, aisle: 'P04', shelf: 'E02', bin: 'H01', description: 'Tratamiento hidrófugo con topes antideslizantes.' },
    { sku: 'MEN-304', name: 'Bandeja camarero antideslizante redonda 40 cm negra', category: 'menaje', format: 'Unidad', unit: 'ud', costPrice: 7.90, generalPrice: 14.50, stock: 58, minStock: 20, reservedStock: 10, aisle: 'P04', shelf: 'E02', bin: 'H02', description: 'Goma vulcanizada que evita caída de vasos en terraza.' },

    // Cuberteria
    { sku: 'CUB-401', name: 'Tenedor mesa acero inox 18/10 modelo Sevilla 2,5 mm', category: 'cuberteria', format: 'Caja 12 ud', unit: 'caja', costPrice: 8.20, generalPrice: 14.90, stock: 120, minStock: 40, reservedStock: 24, aisle: 'P04', shelf: 'E03', bin: 'H01', description: 'Inox quirúrgico 18/10 brillo espejo inalterable.' },
    { sku: 'CUB-402', name: 'Cuchillo mesa chuletero sierra forjado mango madera', category: 'cuberteria', format: 'Caja 12 ud', unit: 'caja', costPrice: 14.50, generalPrice: 24.90, stock: 95, minStock: 30, reservedStock: 18, aisle: 'P04', shelf: 'E03', bin: 'H02', description: 'Corte limpio para carnes ibéricas de la Sierra.' },
    { sku: 'CUB-403', name: 'Cuchara café moka inox 18/0 resistente', category: 'cuberteria', format: 'Caja 12 ud', unit: 'caja', costPrice: 3.80, generalPrice: 7.50, stock: 180, minStock: 60, reservedStock: 40, aisle: 'P04', shelf: 'E04', bin: 'H01', description: 'Alta rotación en platillos de café.' },

    // Desechables
    { sku: 'DES-501', name: 'Envase hamburguesa caña de azúcar compostable 15x15 cm', category: 'desechables', format: 'Caja 500 ud (10 packs × 50)', unit: 'caja', costPrice: 22.40, generalPrice: 38.50, stock: 72, minStock: 30, reservedStock: 15, aisle: 'P05', shelf: 'E01', bin: 'H01', description: 'Biodegradable resistente al aceite y microondas.' },
    { sku: 'DES-502', name: 'Tarrina salsa con tapa bisagra 60 ml transparente rPET', category: 'desechables', format: 'Caja 1.000 ud (10 × 100)', unit: 'caja', costPrice: 16.80, generalPrice: 28.00, stock: 85, minStock: 35, reservedStock: 14, aisle: 'P05', shelf: 'E01', bin: 'H02', description: 'Cierre hermético para alioli, mojo y salsas.' },
    { sku: 'DES-503', name: 'Bolsa papel kraft take away con asa rizada 32x22x24 cm', category: 'desechables', format: 'Caja 250 ud', unit: 'caja', costPrice: 19.10, generalPrice: 32.50, stock: 110, minStock: 40, reservedStock: 25, aisle: 'P05', shelf: 'E02', bin: 'H01', description: 'Base ancha perfecta para bandejas y cajas de comida.' },
    { sku: 'DES-504', name: 'Vaso café para llevar cartón kraft 8 oz / 240 ml + tapa', category: 'desechables', format: 'Caja 500 vasos + 500 tapas', unit: 'caja', costPrice: 21.00, generalPrice: 36.90, stock: 64, minStock: 25, reservedStock: 12, aisle: 'P05', shelf: 'E02', bin: 'H02', description: 'Doble pared térmica sin quemar los dedos.' },

    // Maquinaria
    { sku: 'MAQ-601', name: 'Tostador industrial de ranura horizontal doble piso inox', category: 'maquinaria', format: 'Unidad', unit: 'ud', costPrice: 110.00, generalPrice: 185.00, stock: 14, minStock: 5, reservedStock: 2, aisle: 'P06', shelf: 'E01', bin: 'H01', description: 'Temporizador independiente y resistencias blindadas cuarzo.' },
    { sku: 'MAQ-602', name: 'Exprimidor zumo naranjas cítricos palanca profesional', category: 'maquinaria', format: 'Unidad', unit: 'ud', costPrice: 145.00, generalPrice: 239.00, stock: 9, minStock: 4, reservedStock: 1, aisle: 'P06', shelf: 'E01', bin: 'H02', description: 'Motor asíncrono silencioso con cono desmontable inox.' },
    { sku: 'MAQ-603', name: 'Freidora eléctrica sobremesa doble cuba 8+8 litros inox', category: 'maquinaria', format: 'Unidad', unit: 'ud', costPrice: 195.00, generalPrice: 319.00, stock: 6, minStock: 3, reservedStock: 1, aisle: 'P06', shelf: 'E02', bin: 'H01', description: 'Termostatos independientes hasta 190°C con grifos vaciado.' },

    // Uniformes
    { sku: 'UNI-701', name: 'Delantal peto negro sarga poliéster/algodón con bolsillos', category: 'uniformes', format: 'Pack 5 ud', unit: 'pack', costPrice: 16.50, generalPrice: 28.50, stock: 45, minStock: 20, reservedStock: 8, aisle: 'P07', shelf: 'E01', bin: 'H01', description: 'Tejido antimanchas con tira cuello ajustable y remaches.' },
    { sku: 'UNI-702', name: 'Chaquetilla cocinero manga corta blanca botones chupete', category: 'uniformes', format: 'Pack 3 ud (Talla L)', unit: 'pack', costPrice: 24.00, generalPrice: 42.00, stock: 30, minStock: 12, reservedStock: 4, aisle: 'P07', shelf: 'E01', bin: 'H02', description: 'Malla transpirable en axilas y espalda.' },
    { sku: 'UNI-703', name: 'Paño cocina profesional microfibra alta densidad 50x50 cm', category: 'uniformes', format: 'Pack 10 paños', unit: 'pack', costPrice: 8.50, generalPrice: 15.20, stock: 80, minStock: 30, reservedStock: 15, aisle: 'P07', shelf: 'E02', bin: 'H01', description: 'No suelta pelusa en secado y abrillantado de copas.' },

    // Terraza
    { sku: 'TER-801', name: 'Silla terraza hostelería apilable polipropileno gris marengo', category: 'terraza', format: 'Pack 4 sillas', unit: 'pack', costPrice: 68.00, generalPrice: 116.00, stock: 44, minStock: 16, reservedStock: 8, aisle: 'P08', shelf: 'E01', bin: 'H01', description: 'Tratamiento UV anti-decoloración, peso 3,2 kg.' },
    { sku: 'TER-802', name: 'Mesa terraza aluminio abatible 70x70 cm pata central', category: 'terraza', format: 'Unidad', unit: 'ud', costPrice: 46.00, generalPrice: 79.90, stock: 26, minStock: 10, reservedStock: 4, aisle: 'P08', shelf: 'E01', bin: 'H02', description: 'Mecanismo basculante para encaje fácil al recoger.' },
    { sku: 'TER-803', name: 'Parasol profesional mástil aluminio 3x3 m lona beige hidrófuga', category: 'terraza', format: 'Unidad con base cemento 35 kg', unit: 'ud', costPrice: 140.00, generalPrice: 235.00, stock: 12, minStock: 4, reservedStock: 2, aisle: 'P08', shelf: 'E02', bin: 'H01', description: 'Chimenea cortavientos y polea de apertura fácil.' },
  ];

  // We will expand these with variations to reach 320 items
  const result: Product[] = [];

  // Add the base items first
  baseItems.forEach((item, idx) => {
    const catObj = categories.find(c => c.cat === item.category)!;
    result.push({
      id: `prod-${idx + 1}`,
      sku: item.sku || `ART-${1000 + idx}`,
      ean: `843602100${String(100 + idx).padStart(4, '0')}`,
      name: item.name!,
      category: item.category as ProductCategory,
      categoryName: catObj.name,
      format: item.format || 'Unidad',
      unit: item.unit || 'ud',
      costPrice: item.costPrice || 10,
      generalPrice: item.generalPrice || 18,
      taxRate: 21,
      stock: item.stock || 50,
      minStock: item.minStock || 20,
      reservedStock: item.reservedStock || 5,
      availableStock: (item.stock || 50) - (item.reservedStock || 5),
      aisle: item.aisle || 'P01',
      shelf: item.shelf || 'E01',
      bin: item.bin || 'H01',
      supplierId: catObj.supId,
      supplierName: catObj.supName,
      showInPortal: true,
      description: item.description || 'Artículo profesional homologado para canal Horeca.',
    });
  });

  // Generate additional variations to make 320 products
  const modifiers = [
    { name: 'Eco Bio', priceMul: 1.15, costMul: 1.12 },
    { name: 'Premium Plus', priceMul: 1.30, costMul: 1.25 },
    { name: 'Formato Ahorro Hostelería', priceMul: 1.70, costMul: 1.60 },
    { name: 'Industrial Heavy Duty', priceMul: 1.20, costMul: 1.18 },
    { name: 'Gama Alta Especial', priceMul: 1.45, costMul: 1.35 },
    { name: 'Compacto Económico', priceMul: 0.85, costMul: 0.82 },
    { name: 'Negro Mate Texturizado', priceMul: 1.10, costMul: 1.08 },
    { name: 'Transparente Cristal', priceMul: 1.05, costMul: 1.04 },
    { name: 'Reforzado Anti-rotura', priceMul: 1.25, costMul: 1.20 },
    { name: 'Biodegradable Compost', priceMul: 1.18, costMul: 1.15 },
  ];

  let currentId = result.length + 1;
  const baseCount = result.length;

  for (let m = 0; m < modifiers.length && result.length < 320; m++) {
    for (let b = 0; b < baseCount && result.length < 320; b++) {
      const base = result[b];
      const mod = modifiers[m];
      const newSku = `${base.sku.substring(0, 4)}${String(currentId).padStart(4, '0')}`;
      const newCost = Number((base.costPrice * mod.costMul).toFixed(2));
      const newPrice = Number((base.generalPrice * mod.priceMul).toFixed(2));
      const newStock = Math.floor(15 + Math.random() * 120);
      const newMin = Math.floor(10 + Math.random() * 30);
      const newReserved = Math.floor(Math.random() * 15);
      const aisleNum = `P0${(currentId % 8) + 1}`;
      const shelfNum = `E0${(currentId % 4) + 1}`;
      const binNum = `H${String((currentId % 18) + 1).padStart(2, '0')}`;

      result.push({
        id: `prod-${currentId}`,
        sku: newSku,
        ean: `843602100${String(1000 + currentId).slice(-4)}`,
        name: `${base.name.split(' (')[0].split(',')[0]} - ${mod.name}`,
        category: base.category,
        categoryName: base.categoryName,
        format: base.format,
        unit: base.unit,
        costPrice: newCost,
        generalPrice: newPrice,
        taxRate: 21,
        stock: newStock,
        minStock: newMin,
        reservedStock: newReserved,
        availableStock: Math.max(0, newStock - newReserved),
        aisle: aisleNum,
        shelf: shelfNum,
        bin: binNum,
        supplierId: base.supplierId,
        supplierName: base.supplierName,
        showInPortal: currentId % 12 !== 0,
        description: `${base.description} Edición ${mod.name} adaptada para máxima durabilidad en negocio hostelero.`,
      });
      currentId++;
    }
  }

  return result.slice(0, 320);
}

export const PRODUCTS: Product[] = generateProducts();

// Helper to generate 85 clients
function generateClients(): Client[] {
  const towns = [
    { city: 'Huelva', zone: 'Huelva centro', days: ['Lunes', 'Miércoles', 'Viernes'] },
    { city: 'Huelva', zone: 'Huelva norte', days: ['Martes', 'Jueves', 'Sábado'] },
    { city: 'Punta Umbría', zone: 'Costa oeste', days: ['Lunes', 'Miércoles', 'Viernes'] },
    { city: 'Isla Cristina', zone: 'Costa oeste', days: ['Martes', 'Viernes'] },
    { city: 'Lepe', zone: 'Costa oeste', days: ['Lunes', 'Jueves'] },
    { city: 'Ayamonte', zone: 'Costa oeste', days: ['Martes', 'Viernes'] },
    { city: 'Mazagón', zone: 'Costa este', days: ['Lunes', 'Jueves'] },
    { city: 'Matalascañas', zone: 'Costa este', days: ['Miércoles', 'Sábado'] },
    { city: 'Bollullos Par del Condado', zone: 'Condado', days: ['Lunes', 'Miércoles'] },
    { city: 'Almonte', zone: 'Condado', days: ['Martes', 'Viernes'] },
    { city: 'La Palma del Condado', zone: 'Condado', days: ['Lunes', 'Jueves'] },
    { city: 'Aracena', zone: 'Sierra', days: ['Martes', 'Viernes'] },
    { city: 'Cortegana', zone: 'Sierra', days: ['Miércoles'] },
    { city: 'Jabugo', zone: 'Sierra', days: ['Miércoles'] },
  ];

  const clientTemplates = [
    { name: 'Bar La Ribera', type: 'bar', contact: 'Manuel Domínguez', phone: '670 12 34 56', email: 'barlaribera@gmail.com', zone: 'Costa oeste', city: 'Punta Umbría', address: 'Paseo de la Ría, 14', health: 'normal', creditLimit: 2000, currentBalance: 420.50, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 2, annualSales: 16400, averageTicket: 310 },
    { name: 'Marisquería El Puerto', type: 'restaurante', contact: 'Rafael Garrido', phone: '671 23 45 67', email: 'elpuertomariscos@yahoo.es', zone: 'Huelva centro', city: 'Huelva', address: 'Muelle de Levante s/n', health: 'normal', creditLimit: 3500, currentBalance: 1240.00, overdueBalance: 0, orderFrequencyDays: 4, daysSinceLastOrder: 1, annualSales: 38200, averageTicket: 650 },
    { name: 'Chiringuito El Faro', type: 'restaurante', contact: 'Salvador Morales', phone: '672 34 56 78', email: 'chiringuitoelfaro@gmail.com', zone: 'Costa este', city: 'Mazagón', address: 'Playa de las Dunas s/n', health: 'normal', creditLimit: 3000, currentBalance: 890.20, overdueBalance: 0, orderFrequencyDays: 5, daysSinceLastOrder: 3, annualSales: 29800, averageTicket: 480 },
    { name: 'Hotel Fuerte El Rompido', type: 'hotel', contact: 'Mónica Serrano', phone: '959 39 90 00', email: 'compras@fuerteelrompido.com', zone: 'Costa oeste', city: 'Lepe', address: 'Urb. Marina El Rompido', health: 'normal', creditLimit: 12000, currentBalance: 4320.00, overdueBalance: 0, orderFrequencyDays: 3, daysSinceLastOrder: 1, annualSales: 78500, averageTicket: 1250 },
    { name: 'Restaurante La Plazuela', type: 'restaurante', contact: 'Joaquín Benítez', phone: '673 45 67 89', email: 'laplazuela.huelva@gmail.com', zone: 'Huelva centro', city: 'Huelva', address: 'Plaza de las Monjas, 7', health: 'cooling', creditLimit: 2500, currentBalance: 640.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 19, annualSales: 18900, averageTicket: 340, notes: 'Pedía cada semana y lleva 19 días sin pedir. Avisar al comercial.' },
    { name: 'Bar El Puerto', type: 'bar', contact: 'Andrés Márquez', phone: '674 56 78 90', email: 'barelpuerto@gmail.com', zone: 'Costa oeste', city: 'Isla Cristina', address: 'Calle Ancha, 42', health: 'debt_risk', creditLimit: 1500, currentBalance: 1820.00, overdueBalance: 980.00, orderFrequencyDays: 7, daysSinceLastOrder: 5, annualSales: 14200, averageTicket: 320, notes: 'Superó límite de crédito (1.500 €) con un pedido de 320 €. Requiere autorización.' },
    { name: 'Hotel Marisma & Spa', type: 'hotel', contact: 'Alfonso Nieves', phone: '959 44 22 11', email: 'recepcion@hotelmarisma.es', zone: 'Costa este', city: 'Matalascañas', address: 'Av. del Rocío, 18', health: 'normal', creditLimit: 8000, currentBalance: 2150.00, overdueBalance: 0, orderFrequencyDays: 4, daysSinceLastOrder: 2, annualSales: 54000, averageTicket: 890 },
    { name: 'Venta El Cruce', type: 'restaurante', contact: 'Álvaro Martín', phone: '675 67 89 01', email: 'ventaelcruce@hotmail.com', zone: 'Condado', city: 'Bollullos Par del Condado', address: 'Ctra. A-483 km 12', health: 'normal', creditLimit: 2500, currentBalance: 410.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 4, annualSales: 21000, averageTicket: 410 },
    { name: 'Mesón El Rincón Ibérico', type: 'restaurante', contact: 'Esteban Ramos', phone: '676 78 90 12', email: 'rinconiberico@aracena.com', zone: 'Sierra', city: 'Aracena', address: 'Calle Gran Vía, 9', health: 'normal', creditLimit: 2000, currentBalance: 320.00, overdueBalance: 0, orderFrequencyDays: 10, daysSinceLastOrder: 6, annualSales: 16800, averageTicket: 380 },
    { name: 'Catering Doñana Eventos', type: 'colectividad', contact: 'Patricia Romero', phone: '677 89 01 23', email: 'eventos@cateringdonana.es', zone: 'Condado', city: 'Almonte', address: 'Polígono Santa Marta, Nave 4', health: 'normal', creditLimit: 10000, currentBalance: 3100.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 3, annualSales: 62000, averageTicket: 1100 },
    { name: 'Cervecería Bonilla', type: 'bar', contact: 'David Bonilla', phone: '678 90 12 34', email: 'cerveceriabonilla@gmail.com', zone: 'Huelva centro', city: 'Huelva', address: 'C/ Méndez Núñez, 3', health: 'normal', creditLimit: 1800, currentBalance: 315.00, overdueBalance: 0, orderFrequencyDays: 6, daysSinceLastOrder: 2, annualSales: 15400, averageTicket: 290 },
    { name: 'Cafetería Gran Vía', type: 'bar', contact: 'Cristina Vega', phone: '679 01 23 45', email: 'granviacafe@yahoo.es', zone: 'Huelva centro', city: 'Huelva', address: 'Gran Vía, 22', health: 'cooling', creditLimit: 1500, currentBalance: 510.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 16, annualSales: 13900, averageTicket: 260 },
    { name: 'Taberna El Rinconcito', type: 'bar', contact: 'Sebastián Mora', phone: '680 12 34 56', email: 'rinconcitotaberna@gmail.com', zone: 'Huelva norte', city: 'Huelva', address: 'Av. Santa Marta, 45', health: 'normal', creditLimit: 1200, currentBalance: 240.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 3, annualSales: 11800, averageTicket: 220 },
    { name: 'Restaurante Azabache', type: 'restaurante', contact: 'Mateo Cárdenas', phone: '681 23 45 67', email: 'azabachehuelva@gmail.com', zone: 'Huelva centro', city: 'Huelva', address: 'C/ Vázquez López, 22', health: 'normal', creditLimit: 4000, currentBalance: 1120.00, overdueBalance: 0, orderFrequencyDays: 4, daysSinceLastOrder: 1, annualSales: 42000, averageTicket: 720 },
    { name: 'Hostal Restaurante Sierra Real', type: 'hotel', contact: 'Guillermo Blanco', phone: '959 12 11 00', email: 'sierrareal@cortegana.es', zone: 'Sierra', city: 'Cortegana', address: 'Carretera Nacional 433, km 110', health: 'debt_risk', creditLimit: 3000, currentBalance: 3450.00, overdueBalance: 1200.00, orderFrequencyDays: 14, daysSinceLastOrder: 11, annualSales: 19500, averageTicket: 580 },
    { name: 'Residencia Mayores La Paz', type: 'colectividad', contact: 'Sor Carmen / Administración', phone: '959 24 55 66', email: 'administracion@residencialapaz.org', zone: 'Huelva norte', city: 'Huelva', address: 'Av. de las Flores, 12', health: 'normal', creditLimit: 6000, currentBalance: 1890.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 2, annualSales: 34000, averageTicket: 790 },
    { name: 'Bodegón El Rocío', type: 'restaurante', contact: 'Felipe Macías', phone: '682 34 56 78', email: 'bodegonelrocio@almonte.es', zone: 'Condado', city: 'Almonte', address: 'Aldea de El Rocío, Plaza del Comercio', health: 'cooling', creditLimit: 3000, currentBalance: 780.00, overdueBalance: 0, orderFrequencyDays: 7, daysSinceLastOrder: 22, annualSales: 24600, averageTicket: 490 },
    { name: 'Chiringuito Los Enebros', type: 'restaurante', contact: 'Ignacio Prieto', phone: '683 45 67 89', email: 'losenebroschiringuito@gmail.com', zone: 'Costa este', city: 'Mazagón', address: 'Bajada al Mar s/n', health: 'debt_risk', creditLimit: 2000, currentBalance: 2450.00, overdueBalance: 920.00, orderFrequencyDays: 7, daysSinceLastOrder: 8, annualSales: 22000, averageTicket: 460 },
  ];

  const clients: Client[] = [];
  const repNames = SALES_REPS.map(r => ({ id: r.id, name: r.name }));

  // First insert curated templates
  clientTemplates.forEach((t, i) => {
    const rep = repNames[i % repNames.length];
    const townObj = towns.find(tw => tw.city === t.city) || towns[0];
    clients.push({
      id: `cli-${i + 1}`,
      name: t.name,
      commercialName: t.name,
      cif: `B-21${String(100000 + i * 137).slice(0, 6)}`,
      type: t.type as ClientType,
      zone: t.zone as any,
      address: t.address,
      city: t.city,
      phone: t.phone,
      email: t.email,
      contactPerson: t.contact,
      salesRepId: rep.id,
      salesRepName: rep.name,
      health: t.health as ClientHealth,
      tierId: t.type === 'hotel' ? 'hoteles' : t.type === 'restaurante' ? 'restauracion' : t.type === 'colectividad' ? 'colectividades' : 'bares',
      tierName: t.type === 'hotel' ? 'Tarifa Hoteles' : t.type === 'restaurante' ? 'Tarifa Restauración' : t.type === 'colectividad' ? 'Tarifa Colectividades' : 'Tarifa Bares',
      paymentTerm: t.type === 'hotel' ? 'giro_60' : t.type === 'colectividad' ? 'giro_30' : 'contado',
      creditLimit: t.creditLimit,
      currentBalance: t.currentBalance,
      overdueBalance: t.overdueBalance,
      deliveryDays: townObj.days,
      minOrder: t.type === 'hotel' ? 150 : 80,
      lastOrderDate: new Date(Date.now() - (t.daysSinceLastOrder || 3) * 86400000).toISOString().split('T')[0],
      orderFrequencyDays: t.orderFrequencyDays,
      daysSinceLastOrder: t.daysSinceLastOrder,
      annualSales: t.annualSales,
      averageTicket: t.averageTicket,
      notes: t.notes || 'Cliente histórico sin incidencias de entrega.',
      specialPricesCount: (i % 3) * 3 + 1,
    });
  });

  // Generate up to 85 clients with realistic Huelva hospitality names
  const prefixes = ['Bar', 'Café', 'Restaurante', 'Mesón', 'Taberna', 'Chiringuito', 'Bodeguita', 'Pizzería', 'Hotel', 'Hostal', 'Catering', 'Pescadería & Freiduría'];
  const names = ['Los Marineros', 'La Giralda', 'El Conquero', 'Punta Umbría', 'Ría de Huelva', 'El Abuelo', 'La Bellota', 'Nuevo Portil', 'Tierra Llana', 'El Tinglado', 'Los Cuatro Vientos', 'La Palmera', 'Doñana', 'El Rompido', 'La Espigón', 'El Olivo', 'San Pedro', 'La Merced', 'Zafra', 'El Cabezo', 'Casa Paco', 'El Molino', 'La Casona', 'La Antilla', 'Las Dunas', 'Costa Esmeralda', 'El Galeón', 'Venta La Parada', 'La Posada del Jamón', 'Sierra Mágica', 'El Mirador', 'Los Cazadores', 'Mar de Huelva', 'El Muelle'];

  let idCounter = clients.length + 1;
  for (let p = 0; p < prefixes.length && clients.length < 85; p++) {
    for (let n = 0; n < names.length && clients.length < 85; n++) {
      const townObj = towns[idCounter % towns.length];
      const prefix = prefixes[p];
      const name = names[n];
      const clientName = `${prefix} ${name}`;
      
      let type: ClientType = 'bar';
      if (prefix === 'Hotel' || prefix === 'Hostal') type = 'hotel';
      else if (prefix === 'Restaurante' || prefix === 'Pizzería' || prefix === 'Mesón') type = 'restaurante';
      else if (prefix === 'Catering') type = 'colectividad';

      // 8-10 cooling, 5 debt_risk, rest normal
      let health: ClientHealth = 'normal';
      let overdue = 0;
      let daysAgo = 2 + (idCounter % 6);
      if (clients.length >= 75 && clients.length < 80) {
        health = 'debt_risk';
        overdue = 450 + (idCounter % 8) * 120;
        daysAgo = 8 + (idCounter % 5);
      } else if (clients.length >= 66 && clients.length < 75) {
        health = 'cooling';
        daysAgo = 18 + (idCounter % 9);
      }

      const rep = repNames[idCounter % repNames.length];
      const creditLimit = type === 'hotel' ? 8000 : type === 'restaurante' ? 3000 : 1500;
      const currentBalance = overdue > 0 ? overdue + 320 : Math.round(180 + (idCounter * 37) % 800);
      const annual = type === 'hotel' ? 45000 : type === 'restaurante' ? 22000 : 13000;

      clients.push({
        id: `cli-${idCounter}`,
        name: clientName,
        commercialName: clientName,
        cif: `B-21${String(120000 + idCounter * 211).slice(0, 6)}`,
        type,
        zone: townObj.zone as any,
        address: `Calle Real, ${10 + (idCounter % 80)}`,
        city: townObj.city,
        phone: `6${String(60000000 + idCounter * 43219).slice(0, 8)}`,
        email: `contacto@${clientName.toLowerCase().replace(/[^a-z]/g, '')}.es`,
        contactPerson: `Gerente ${name.split(' ')[0]}`,
        salesRepId: rep.id,
        salesRepName: rep.name,
        health,
        tierId: type === 'hotel' ? 'hoteles' : type === 'restaurante' ? 'restauracion' : type === 'colectividad' ? 'colectividades' : 'bares',
        tierName: type === 'hotel' ? 'Tarifa Hoteles' : type === 'restaurante' ? 'Tarifa Restauración' : type === 'colectividad' ? 'Tarifa Colectividades' : 'Tarifa Bares',
        paymentTerm: type === 'hotel' ? 'giro_60' : type === 'colectividad' ? 'giro_30' : 'contado',
        creditLimit,
        currentBalance,
        overdueBalance: overdue,
        deliveryDays: townObj.days,
        minOrder: type === 'hotel' ? 150 : 80,
        lastOrderDate: new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0],
        orderFrequencyDays: 7,
        daysSinceLastOrder: daysAgo,
        annualSales: annual,
        averageTicket: Math.round(annual / 52),
        notes: health === 'cooling' ? 'Lleva más de 2 semanas sin realizar pedido habitual.' : 'Cliente activo.',
        specialPricesCount: (idCounter % 4),
      });
      idCounter++;
    }
  }

  return clients.slice(0, 85);
}

export const CLIENTS: Client[] = generateClients();

// Helper to generate 63 orders for today (including 11 night orders, 6 to review)
function generateOrders(clients: Client[], products: Product[]): Order[] {
  const routes = ['Huelva centro', 'Huelva norte', 'Costa oeste', 'Costa este', 'Condado', 'Sierra'];
  const channels: { ch: any; label: string }[] = [
    { ch: 'whatsapp', label: 'WhatsApp' },
    { ch: 'telefono_ia', label: 'Teléfono IA' },
    { ch: 'portal', label: 'Portal' },
    { ch: 'correo', label: 'Correo' },
    { ch: 'comercial', label: 'Comercial' },
    { ch: 'oficina', label: 'Oficina' },
  ];

  const orders: Order[] = [];

  // Order 1: Night order from WhatsApp (Bar La Ribera - audio note) -> Needs review
  orders.push({
    id: 'ord-101',
    orderNumber: 'PED-2026-0841',
    clientId: 'cli-1',
    clientName: 'Bar La Ribera',
    clientZone: 'Costa oeste',
    channel: 'whatsapp',
    isNightOrder: true,
    createdAt: '2026-10-17T01:24:00Z',
    deliveryDate: '2026-10-18',
    routeId: 'rt-costa-o',
    routeName: 'Costa oeste',
    status: 'por_revisar',
    paymentStatus: 'pendiente',
    paymentMethod: 'Giro a 30 días',
    reviewReason: 'Duda en producto de lavavajillas (2 opciones posibles)',
    originalMessage: {
      type: 'whatsapp_audio',
      audioDuration: '0:18',
      transcript: '«Buenas noches Rocío, mándame para mañana 2 cajas de las servilletas de siempre, una de vasos de sidra y una garrafa de lo del lavavajillas que se nos acaba con las cenas.»',
    },
    lines: [
      {
        id: 'ln-1',
        productId: 'prod-1',
        sku: 'CEL-001',
        name: 'Servilleta 2 capas 33x33 blanca punta punta',
        format: 'Caja 2.400 ud',
        quantity: 2,
        unitPrice: 24.50,
        discountPercent: 5,
        finalPrice: 23.28,
        total: 46.56,
        taxRate: 21,
        taxAmount: 9.78,
        costPrice: 14.80,
        location: 'P01-E01-H01',
        aiConfidence: 'alta',
        aiOriginalText: '2 cajas de las servilletas de siempre (lo que pide habitualmente)',
      },
      {
        id: 'ln-2',
        productId: 'prod-13',
        sku: 'CRI-201',
        name: 'Vaso sidra extra fino 50 cl vidrio tensionado',
        format: 'Caja 12 ud',
        quantity: 1,
        unitPrice: 13.50,
        discountPercent: 0,
        finalPrice: 13.50,
        total: 13.50,
        taxRate: 21,
        taxAmount: 2.84,
        costPrice: 7.20,
        location: 'P03-E01-H01',
        aiConfidence: 'alta',
        aiOriginalText: 'una de vasos de sidra',
      },
      {
        id: 'ln-3',
        productId: 'prod-7',
        sku: 'LIM-101',
        name: 'Detergente lavavajillas automático aguas duras vajilla cristal',
        format: 'Garrafa 5 L',
        quantity: 1,
        unitPrice: 19.80,
        discountPercent: 0,
        finalPrice: 19.80,
        total: 19.80,
        taxRate: 21,
        taxAmount: 4.16,
        costPrice: 11.50,
        location: 'P02-E01-H01',
        aiConfidence: 'duda',
        aiOriginalText: 'una garrafa de lo del lavavajillas',
        aiOptions: [
          { productId: 'prod-7', name: 'Detergente lavavajillas aguas duras 5L (Pide habitualmente)', price: 19.80 },
          { productId: 'prod-8', name: 'Abrillantador secante máquinas 5L', price: 16.50 },
        ],
      },
    ],
    subtotal: 79.86,
    taxTotal: 16.78,
    shippingFee: 0,
    total: 96.64,
    totalMargin: 41.56,
    totalMarginPercent: 52.0,
    packagesCount: 4,
    notes: 'Entrar por la puerta de servicio de la calle trasera antes de las 11:00.',
  });

  // Order 2: Phone call outside business hours (Marisquería El Puerto) -> Por revisar
  orders.push({
    id: 'ord-102',
    orderNumber: 'PED-2026-0842',
    clientId: 'cli-2',
    clientName: 'Marisquería El Puerto',
    clientZone: 'Huelva centro',
    channel: 'telefono_ia',
    isNightOrder: true,
    createdAt: '2026-10-17T02:45:00Z',
    deliveryDate: '2026-10-18',
    routeId: 'rt-huelva-c',
    routeName: 'Huelva centro',
    status: 'por_revisar',
    paymentStatus: 'pendiente',
    paymentMethod: 'Transferencia quincenal',
    reviewReason: 'Asistente de voz: confirma 3 cajas de mantel y 2 cajas copas vino Burdeos',
    originalMessage: {
      type: 'phone_call',
      audioDuration: '0:42',
      transcript: '«Hola, soy Rafael de Marisquería El Puerto. Te llamo a deshoras para que no se me olvide: para el turno del mediodía de mañana nos hacen falta 3 cajas de mantel kraft reciclado y un par de cajas de las copas de Burdeos, que rompieron varias el fin de semana. Gracias.»',
    },
    lines: [
      {
        id: 'ln-201',
        productId: 'prod-4',
        sku: 'CEL-004',
        name: 'Mantel individual papel kraft 30x40 cm reciclado',
        format: 'Caja 1.000 ud',
        quantity: 3,
        unitPrice: 18.80,
        discountPercent: 10,
        finalPrice: 16.92,
        total: 50.76,
        taxRate: 21,
        taxAmount: 10.66,
        costPrice: 11.20,
        location: 'P01-E02-H02',
        aiConfidence: 'alta',
        aiOriginalText: '3 cajas de mantel kraft reciclado',
      },
      {
        id: 'ln-202',
        productId: 'prod-15',
        sku: 'CRI-203',
        name: 'Copa de vino Burdeos 47 cl cristal sonoro templado',
        format: 'Caja 6 ud',
        quantity: 2,
        unitPrice: 16.20,
        discountPercent: 0,
        finalPrice: 16.20,
        total: 32.40,
        taxRate: 21,
        taxAmount: 6.80,
        costPrice: 8.90,
        location: 'P03-E02-H01',
        aiConfidence: 'alta',
        aiOriginalText: 'un par de cajas de las copas de Burdeos',
      },
    ],
    subtotal: 83.16,
    taxTotal: 17.46,
    shippingFee: 0,
    total: 100.62,
    totalMargin: 31.76,
    totalMarginPercent: 38.2,
    packagesCount: 5,
  });

  // Order 3: Email with PDF from Hotel Marisma -> Por revisar
  orders.push({
    id: 'ord-103',
    orderNumber: 'PED-2026-0843',
    clientId: 'cli-7',
    clientName: 'Hotel Marisma & Spa',
    clientZone: 'Costa este',
    channel: 'correo',
    isNightOrder: true,
    createdAt: '2026-10-16T23:55:00Z',
    deliveryDate: '2026-10-18',
    routeId: 'rt-costa-e',
    routeName: 'Costa este',
    status: 'por_revisar',
    paymentStatus: 'pendiente',
    paymentMethod: 'Giro a 60 días',
    reviewReason: 'Lector PDF de pedidos: 1 referencia nueva de delantal',
    originalMessage: {
      type: 'email_pdf',
      pdfName: 'Pedido_Oficial_Hotel_Marisma_OCT26.pdf',
      rawText: 'Adjuntamos orden de reposición de lencería y menaje semanal para comedores buffet y cafetería piscina.',
    },
    lines: [
      { id: 'ln-301', productId: 'prod-1', sku: 'CEL-001', name: 'Servilleta 2 capas 33x33 blanca punta punta', format: 'Caja 2.400 ud', quantity: 6, unitPrice: 24.50, discountPercent: 12, finalPrice: 21.56, total: 129.36, taxRate: 21, taxAmount: 27.17, costPrice: 14.80, location: 'P01-E01-H01', aiConfidence: 'alta' },
      { id: 'ln-302', productId: 'prod-25', sku: 'UNI-701', name: 'Delantal peto negro sarga poliéster/algodón con bolsillos', format: 'Pack 5 ud', quantity: 2, unitPrice: 28.50, discountPercent: 5, finalPrice: 27.08, total: 54.16, taxRate: 21, taxAmount: 11.37, costPrice: 16.50, location: 'P07-E01-H01', aiConfidence: 'media', aiOriginalText: 'Delantales sala negros pack de 5' },
    ],
    subtotal: 183.52,
    taxTotal: 38.54,
    shippingFee: 0,
    total: 222.06,
    totalMargin: 65.52,
    totalMarginPercent: 35.7,
    packagesCount: 8,
  });

  // Orders 4, 5, 6: Remaining 3 "Por revisar" to make 6 total
  const moreReviewClients = [
    { cli: clients[7], note: 'WhatsApp audio: audio con ruido de fondo en cocina, confirmar unidades' },
    { cli: clients[9], note: 'Portal web: cliente pide descuento por volumen no estandarizado' },
    { cli: clients[12], note: 'Teléfono IA: transcripción confunde servilletas 40x40 o 33x33' },
  ];
  moreReviewClients.forEach((item, idx) => {
    orders.push({
      id: `ord-rev-${idx + 4}`,
      orderNumber: `PED-2026-084${idx + 4}`,
      clientId: item.cli.id,
      clientName: item.cli.name,
      clientZone: item.cli.zone,
      channel: idx === 0 ? 'whatsapp' : idx === 1 ? 'portal' : 'telefono_ia',
      isNightOrder: true,
      createdAt: `2026-10-17T03:${String(10 + idx * 18).padStart(2, '0')}:00Z`,
      deliveryDate: '2026-10-18',
      routeId: 'rt-condado',
      routeName: item.cli.zone,
      status: 'por_revisar',
      paymentStatus: 'pendiente',
      paymentMethod: 'Contado al repartidor',
      reviewReason: item.note,
      originalMessage: {
        type: idx === 0 ? 'whatsapp_audio' : idx === 1 ? 'whatsapp_text' : 'phone_call',
        audioDuration: '0:14',
        transcript: idx === 0 ? '«Oye mándame servilletas de las grandes y 4 garrafas de lejía alimentaria»' : undefined,
        rawText: idx === 1 ? 'Pedido habitual con consulta de precio por palet de servilletas' : undefined,
      },
      lines: [
        { id: `ln-rev-${idx}-1`, productId: 'prod-2', sku: 'CEL-002', name: 'Servilleta 2 capas 40x40 negra plegado 1/4', format: 'Caja 1.600 ud', quantity: 2, unitPrice: 29.90, discountPercent: 0, finalPrice: 29.90, total: 59.80, taxRate: 21, taxAmount: 12.56, costPrice: 18.20, location: 'P01-E01-H02', aiConfidence: 'media' },
        { id: `ln-rev-${idx}-2`, productId: 'prod-10', sku: 'LIM-104', name: 'Fregasuelos bioalcohol brillo aroma pino silvestre', format: 'Garrafa 5 L', quantity: 2, unitPrice: 11.40, discountPercent: 0, finalPrice: 11.40, total: 22.80, taxRate: 21, taxAmount: 4.79, costPrice: 6.20, location: 'P02-E02-H02', aiConfidence: 'alta' },
      ],
      subtotal: 82.60,
      taxTotal: 17.35,
      shippingFee: 0,
      total: 99.95,
      packagesCount: 4,
    });
  });

  // Now generate remaining orders to reach 63 total today
  // 11 of them must be night orders (we already have 6, let's add 5 more night orders that are confirmed)
  const orderStatuses: { status: OrderStatus; count: number }[] = [
    { status: 'confirmado', count: 14 },
    { status: 'en_preparacion', count: 12 },
    { status: 'preparado', count: 10 },
    { status: 'en_reparto', count: 11 },
    { status: 'entregado', count: 7 },
    { status: 'facturado', count: 3 },
  ];

  let orderCount = orders.length; // 6
  let nightOrdersCreated = 6;

  for (const group of orderStatuses) {
    for (let k = 0; k < group.count; k++) {
      orderCount++;
      const client = clients[(orderCount * 7) % clients.length];
      const channelObj = channels[(orderCount * 3) % channels.length];
      const isNight = nightOrdersCreated < 11;
      if (isNight) nightOrdersCreated++;

      const p1 = products[(orderCount * 5) % products.length];
      const p2 = products[(orderCount * 9 + 3) % products.length];
      const q1 = 1 + (orderCount % 4);
      const q2 = 1 + ((orderCount + 2) % 3);

      const l1Total = Number((p1.generalPrice * q1).toFixed(2));
      const l2Total = Number((p2.generalPrice * q2).toFixed(2));
      const sub = Number((l1Total + l2Total).toFixed(2));
      const tax = Number((sub * 0.21).toFixed(2));
      const tot = Number((sub + tax).toFixed(2));
      const cost = Number((p1.costPrice * q1 + p2.costPrice * q2).toFixed(2));
      const margin = Number((sub - cost).toFixed(2));

      const hour = isNight ? (22 + (orderCount % 3)) % 24 : 8 + (orderCount % 12);
      const minute = String(10 + (orderCount * 13) % 50).padStart(2, '0');
      const timeStr = `2026-10-17T${String(hour).padStart(2, '0')}:${minute}:00Z`;

      orders.push({
        id: `ord-${100 + orderCount}`,
        orderNumber: `PED-2026-${String(840 + orderCount)}`,
        clientId: client.id,
        clientName: client.name,
        clientZone: client.zone,
        channel: channelObj.ch,
        isNightOrder: isNight,
        createdAt: timeStr,
        deliveryDate: '2026-10-17',
        routeId: `rt-${client.zone.toLowerCase().replace(/[^a-z]/g, '')}`,
        routeName: client.zone,
        status: group.status,
        paymentStatus: group.status === 'entregado' || group.status === 'facturado' ? 'cobrado_reparto' : 'pendiente',
        paymentMethod: client.paymentTerm === 'contado' ? 'Efectivo / Tarjeta al repartidor' : 'Giro bancario',
        lines: [
          {
            id: `ln-${orderCount}-1`,
            productId: p1.id,
            sku: p1.sku,
            name: p1.name,
            format: p1.format,
            quantity: q1,
            unitPrice: p1.generalPrice,
            discountPercent: 0,
            finalPrice: p1.generalPrice,
            total: l1Total,
            taxRate: 21,
            taxAmount: Number((l1Total * 0.21).toFixed(2)),
            costPrice: p1.costPrice,
            location: `${p1.aisle}-${p1.shelf}-${p1.bin}`,
            picked: group.status === 'preparado' || group.status === 'en_reparto' || group.status === 'entregado' || group.status === 'facturado',
          },
          {
            id: `ln-${orderCount}-2`,
            productId: p2.id,
            sku: p2.sku,
            name: p2.name,
            format: p2.format,
            quantity: q2,
            unitPrice: p2.generalPrice,
            discountPercent: 0,
            finalPrice: p2.generalPrice,
            total: l2Total,
            taxRate: 21,
            taxAmount: Number((l2Total * 0.21).toFixed(2)),
            costPrice: p2.costPrice,
            location: `${p2.aisle}-${p2.shelf}-${p2.bin}`,
            picked: group.status === 'preparado' || group.status === 'en_reparto' || group.status === 'entregado' || group.status === 'facturado',
          },
        ],
        subtotal: sub,
        taxTotal: tax,
        shippingFee: sub >= 80 ? 0 : 6.50,
        total: sub >= 80 ? tot : Number((tot + 6.50).toFixed(2)),
        totalMargin: margin,
        totalMarginPercent: Number(((margin / sub) * 100).toFixed(1)),
        packagesCount: q1 + q2,
        notes: orderCount % 4 === 0 ? 'Dejar en almacén si está cerrado el comedor.' : undefined,
      });
    }
  }

  return orders;
}

export const ORDERS: Order[] = generateOrders(CLIENTS, PRODUCTS);

// 6 Delivery Routes for today
export const ROUTES: Route[] = [
  {
    id: 'rt-costa-o',
    name: 'Costa oeste (Punta Umbría, Lepe, Isla Cristina, Ayamonte)',
    driverId: 'drv-1',
    driverName: 'José Romero',
    vehicle: 'Mercedes Sprinter (4120-JLM)',
    totalStops: 12,
    completedStops: 4,
    totalKg: 420,
    totalAmountToCollect: 1140.50,
    collectedCash: 240.00,
    collectedCard: 186.40,
    expectedCash: 620.00,
    expectedCard: 520.50,
    status: 'en_progreso',
    stops: [
      { id: 'stp-1', orderId: 'ord-101', clientName: 'Bar La Ribera', address: 'Paseo de la Ría, 14', city: 'Punta Umbría', eta: '09:45', packages: 4, weightKg: 28, pendingAmount: 96.64, status: 'entregado', paymentMethod: 'tarjeta', phone: '670 12 34 56', contact: 'Manuel Domínguez', notes: 'Entrar por puerta trasera' },
      { id: 'stp-2', orderId: 'ord-114', clientName: 'Chiringuito El Ancla', address: 'Av. del Océano, 8', city: 'Punta Umbría', eta: '10:15', packages: 6, weightKg: 45, pendingAmount: 142.50, status: 'entregado', paymentMethod: 'efectivo', phone: '670 99 88 77', contact: 'Paco Ancla' },
      { id: 'stp-3', orderId: 'ord-118', clientName: 'Hotel Fuerte El Rompido', address: 'Urb. Marina El Rompido', city: 'Lepe', eta: '11:00', packages: 8, weightKg: 62, pendingAmount: 0, status: 'en_camino', paymentMethod: 'cuenta', phone: '959 39 90 00', contact: 'Recepción Almacén', notes: 'Muelle de carga 2' },
      { id: 'stp-4', orderId: 'ord-122', clientName: 'Bar El Puerto', address: 'Calle Ancha, 42', city: 'Isla Cristina', eta: '11:45', packages: 5, weightKg: 34, pendingAmount: 320.00, status: 'pendiente', paymentMethod: 'tarjeta', phone: '674 56 78 90', contact: 'Andrés Márquez' },
      { id: 'stp-5', orderId: 'ord-125', clientName: 'Marisquería Casa Rufino', address: 'Calle San Pedro, 19', city: 'Isla Cristina', eta: '12:20', packages: 7, weightKg: 52, pendingAmount: 210.00, status: 'pendiente', paymentMethod: 'efectivo', phone: '670 11 22 33', contact: 'Rufino hijo' },
      { id: 'stp-6', orderId: 'ord-130', clientName: 'Restaurante The Shack', address: 'Paseo de la Ribera, 4', city: 'Ayamonte', eta: '13:00', packages: 3, weightKg: 22, pendingAmount: 85.00, status: 'pendiente', paymentMethod: 'tarjeta', phone: '670 44 55 66', contact: 'Clara Mendez' },
    ],
  },
  {
    id: 'rt-huelva-c',
    name: 'Huelva centro (Gran Vía, Pescadería, Centro peatonal)',
    driverId: 'drv-2',
    driverName: 'Miguel Santos',
    vehicle: 'Iveco Daily (8832-KBF)',
    totalStops: 14,
    completedStops: 6,
    totalKg: 380,
    totalAmountToCollect: 890.00,
    collectedCash: 310.00,
    collectedCard: 145.00,
    expectedCash: 540.00,
    expectedCard: 350.00,
    status: 'en_progreso',
    stops: [
      { id: 'stp-11', orderId: 'ord-102', clientName: 'Marisquería El Puerto', address: 'Muelle de Levante s/n', city: 'Huelva', eta: '09:15', packages: 5, weightKg: 32, pendingAmount: 100.62, status: 'entregado', paymentMethod: 'tarjeta', phone: '671 23 45 67', contact: 'Rafael Garrido' },
      { id: 'stp-12', orderId: 'ord-110', clientName: 'Restaurante Azabache', address: 'C/ Vázquez López, 22', city: 'Huelva', eta: '09:50', packages: 6, weightKg: 40, pendingAmount: 0, status: 'entregado', paymentMethod: 'cuenta', phone: '681 23 45 67', contact: 'Mateo Cárdenas' },
      { id: 'stp-13', orderId: 'ord-115', clientName: 'Cervecería Bonilla', address: 'C/ Méndez Núñez, 3', city: 'Huelva', eta: '10:30', packages: 4, weightKg: 28, pendingAmount: 165.00, status: 'en_camino', paymentMethod: 'efectivo', phone: '678 90 12 34', contact: 'David Bonilla' },
    ],
  },
  {
    id: 'rt-huelva-n',
    name: 'Huelva norte (La Orden, Santa Marta, Cardeñas)',
    driverId: 'drv-3',
    driverName: 'Dani Ramos',
    vehicle: 'Ford Transit (1902-LPT)',
    totalStops: 10,
    completedStops: 3,
    totalKg: 310,
    totalAmountToCollect: 640.00,
    collectedCash: 120.00,
    collectedCard: 90.00,
    expectedCash: 380.00,
    expectedCard: 260.00,
    status: 'en_progreso',
    stops: [],
  },
  {
    id: 'rt-costa-e',
    name: 'Costa este (Mazagón, Matalascañas)',
    driverId: 'drv-1',
    driverName: 'José Romero',
    vehicle: 'Mercedes Sprinter (4120-JLM)',
    totalStops: 9,
    completedStops: 2,
    totalKg: 290,
    totalAmountToCollect: 780.00,
    collectedCash: 150.00,
    collectedCard: 0,
    expectedCash: 450.00,
    expectedCard: 330.00,
    status: 'en_progreso',
    stops: [],
  },
  {
    id: 'rt-condado',
    name: 'Condado (Bollullos, Almonte, La Palma)',
    driverId: 'drv-4',
    driverName: 'Paco Vázquez',
    vehicle: 'Renault Master (5521-MCK)',
    totalStops: 11,
    completedStops: 1,
    totalKg: 350,
    totalAmountToCollect: 920.00,
    collectedCash: 80.00,
    collectedCard: 0,
    expectedCash: 520.00,
    expectedCard: 400.00,
    status: 'en_progreso',
    stops: [],
  },
  {
    id: 'rt-sierra',
    name: 'Sierra (Aracena, Cortegana, Jabugo)',
    driverId: 'drv-5',
    driverName: 'Manuel Pérez',
    vehicle: 'Iveco Daily 4x4 (3344-HGB)',
    totalStops: 7,
    completedStops: 0,
    totalKg: 240,
    totalAmountToCollect: 560.00,
    collectedCash: 0,
    collectedCard: 0,
    expectedCash: 320.00,
    expectedCard: 240.00,
    status: 'no_iniciada',
    stops: [],
  },
];

// Initial Decisions pending for Dirección on dashboard
export const INITIAL_DECISIONS: DecisionItem[] = [
  {
    id: 'dec-1',
    type: 'descuento_comercial',
    title: 'Descuento comercial propuesto',
    description: 'Antonio pide 8 % de descuento adicional en desechables para Hotel Marisma (pedido previsto: 1.450 €)',
    primaryActionLabel: 'Aprobar 8 %',
    secondaryActionLabel: 'Rechazar',
    data: { rep: 'Antonio Gómez', client: 'Hotel Marisma & Spa', discount: 8, category: 'Desechables' },
  },
  {
    id: 'dec-2',
    type: 'limite_credito',
    title: 'Límite de crédito superado',
    description: 'Bar El Puerto ha superado su límite de crédito (1.500 €) con un pedido pendiente de 320 € (Deuda acumulada: 1.820 €)',
    primaryActionLabel: 'Servir igualmente',
    secondaryActionLabel: 'Retener pedido',
    data: { client: 'Bar El Puerto', limit: 1500, balance: 1820, orderAmount: 320 },
  },
  {
    id: 'dec-3',
    type: 'compra_stock',
    title: 'Propuesta de compra automática con IA',
    description: 'Servilletas 33x33 blanca bajo mínimos (quedan 142 ud, reserva de 32 ud). Propuesta: pedir 40 cajas a Celulosas del Sur S.A. (592,00 €)',
    primaryActionLabel: 'Pedir 40 cajas',
    secondaryActionLabel: 'Ajustar cantidad',
    data: { product: 'Servilleta 2 capas 33x33 blanca', qty: 40, supplier: 'Celulosas del Sur S.A.', cost: 592.00 },
  },
];

// AI Assistants
export const AI_ASSISTANTS: AIAssistant[] = [
  {
    id: 'asist-1',
    name: 'Asistente de WhatsApp',
    type: 'whatsapp',
    enabled: true,
    schedule: '24 horas, 7 días a la semana',
    description: 'Toma pedidos por audio y texto, informa del estado de entregas, envía albaranes/facturas en PDF y resuelve dudas del catálogo.',
    capabilities: [
      'Transcripción de notas de voz andaluzas con vocabulario hostelero',
      'Cruce de referencias con tarifa del cliente y pedidos habituales',
      'Envío automático de confirmación con hora estimada de entrega',
      'Derivación a Rocío en oficina si hay dudas de stock o precio',
    ],
    limitations: [
      'No aplica descuentos fuera de tarifa sin validación previa',
      'No confirma pedidos si el cliente tiene orden de bloqueo por morosidad',
    ],
    stats: {
      ordersTakenThisWeek: 42,
      autoResolvedPercent: 91,
      totalInteractions: 138,
    },
    recentExamples: [
      { timestamp: 'Hoy 01:24', client: 'Bar La Ribera', summary: 'Audio 18s: 2 cajas servilletas, 1 vaso sidra, 1 lavavajillas. Duda en lavavajillas.', channel: 'WhatsApp', audioDuration: '0:18' },
      { timestamp: 'Ayer 23:40', client: 'Chiringuito El Faro', summary: 'Texto: «Mándame 3 cajas de bobinas y 2 de envases hamburguesa para el viernes»', channel: 'WhatsApp' },
      { timestamp: 'Ayer 19:15', client: 'Restaurante Azabache', summary: 'Consulta: «¿A qué hora viene el repartidor mañana?» -> IA respondió «Tu ruta es Huelva Centro, parada 2 sobre las 09:50»', channel: 'WhatsApp' },
    ],
  },
  {
    id: 'asist-2',
    name: 'Asistente de Teléfono (Voz)',
    type: 'telefono',
    enabled: true,
    schedule: 'Fuera de horario (20:00 - 08:00) y desborde de oficina',
    description: 'Atiende llamadas entrantes cuando la centralita está ocupada o cerrada. Escucha al cliente con naturalidad, genera el pedido y lo transcribe.',
    capabilities: [
      'Voz sintética natural en español con pausas realistas',
      'Reconocimiento de cliente por número de teléfono llamante',
      'Generación de borrador de pedido con audio reproducible en pedidos',
    ],
    limitations: [
      'Si el cliente solicita hablar con Juanlu o Rocío en horario nocturno, toma el recado con máxima prioridad',
    ],
    stats: {
      ordersTakenThisWeek: 16,
      autoResolvedPercent: 84,
      totalInteractions: 31,
    },
    recentExamples: [
      { timestamp: 'Hoy 02:45', client: 'Marisquería El Puerto', summary: 'Llamada 42s: 3 cajas mantel kraft y 2 cajas copas Burdeos.', channel: 'Teléfono', audioDuration: '0:42' },
      { timestamp: 'Ayer 21:10', client: 'Mesón El Rincón', summary: 'Llamada 35s: 1 freidora 8+8 litros con urgencia para fin de semana.', channel: 'Teléfono', audioDuration: '0:35' },
    ],
  },
  {
    id: 'asist-3',
    name: 'Lector de Correos y Pedidos PDF',
    type: 'correo',
    enabled: true,
    schedule: 'Continuo en segundo plano',
    description: 'Monitoriza pedidos@polihosteleria.es, parsea PDFs de hoteles y cadenas, y extrae líneas, cantidades y fechas.',
    capabilities: [
      'Extracción OCR inteligente de albaranes, pedidos en Excel y PDFs estructurados',
      'Detección de códigos internos del cliente y conversión a referencias Polihostelería',
    ],
    limitations: [
      'Requiere revisión si el importe difiere más de un 5% de la tarifa asignada',
    ],
    stats: {
      ordersTakenThisWeek: 11,
      autoResolvedPercent: 88,
      totalInteractions: 14,
    },
    recentExamples: [
      { timestamp: 'Hoy 00:10', client: 'Hotel Marisma & Spa', summary: 'PDF Pedido_Oficial_Hotel_Marisma_OCT26.pdf (6 cajas servilletas, 2 packs delantales)', channel: 'Correo' },
    ],
  },
  {
    id: 'asist-4',
    name: 'Asistente de Compras y Reposición',
    type: 'compras',
    enabled: true,
    schedule: 'Lunes a las 06:00 y en tiempo real con rotura de stock',
    description: 'Calcula previsiones de consumo por estacionalidad (verano costa vs invierno sierra) y sugiere compras óptimas agrupadas por proveedor.',
    capabilities: [
      'Alerta temprana de bajada de stock mínimo',
      'Optimización de portes gratis en proveedores (alcanza el pedido mínimo automáticamente)',
    ],
    limitations: [
      'No envía pedidos a proveedores sin aprobación expresa en pantalla de Compras',
    ],
    stats: {
      ordersTakenThisWeek: 5,
      autoResolvedPercent: 95,
      totalInteractions: 9,
    },
    recentExamples: [
      { timestamp: 'Hoy 06:00', client: 'Polihostelería Almacén', summary: 'Propuesta de 40 cajas de servilletas a Celulosas del Sur por rotura inminente', channel: 'Sistema' },
    ],
  },
  {
    id: 'asist-5',
    name: 'Asistente Comercial Predictivo',
    type: 'comercial',
    enabled: true,
    schedule: 'Diario a las 08:30 (sincronizado con app de comerciales)',
    description: 'Detecta qué clientes habituales se están enfriando y genera a cada comercial la ruta del día con el gancho exacto para vender.',
    capabilities: [
      'Cálculo de desviaciones en la frecuencia habitual de compra',
      'Sugerencia de promociones personalizadas según artículos comprados en los últimos 3 meses',
    ],
    limitations: [
      'Requiere al menos 4 pedidos previos del cliente para fijar patrón de consumo',
    ],
    stats: {
      ordersTakenThisWeek: 18,
      autoResolvedPercent: 100,
      totalInteractions: 24,
    },
    recentExamples: [
      { timestamp: 'Hoy 08:30', client: 'Restaurante La Plazuela', summary: 'Alerta: lleva 19 días sin pedir servilletas ni menaje. Sugiere visita a Antonio Gómez.', channel: 'App Comercial' },
    ],
  },
];
