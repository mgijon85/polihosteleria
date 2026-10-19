// Datos del negocio. Todo lo que la web afirma sale de aquí.
// Lo marcado PENDIENTE está sin confirmar con Juanlu: revisar antes de publicar.

export const SITE = {
  nombre: 'Polihostelería',
  url: 'https://www.polihosteleria.es',
  // PENDIENTE: razón social. El mapa de la web antigua dice «Polirrosa Hostelería S.L.».
  razonSocial: 'Polirrosa Hostelería S.L.',
  cif: '', // PENDIENTE
  direccion: {
    calle: 'Polígono Industrial El Rincón, calle B, nave 47',
    localidad: 'Huelva',
    provincia: 'Huelva',
    cp: '', // PENDIENTE
    pais: 'ES',
  },
  geo: { lat: 37.264661, lng: -6.921183 },
  telefono: '959 222 223',
  telefonoHref: 'tel:+34959222223',
  movil: '615 769 176',
  movilHref: 'tel:+34615769176',
  // PENDIENTE: confirmar que el 615 769 176 tiene WhatsApp.
  whatsapp: '34615769176',
  emailPedidos: 'pedidos@polihosteleria.es',
  emailInfo: 'info@polihosteleria.es',
  // PENDIENTE: horario. Google solo muestra el cierre a las 14:00.
  horario: '',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Polihosteler%C3%ADa%2C%20Pol%C3%ADgono%20El%20Rinc%C3%B3n%2C%20Huelva',
  // Plataforma de pedidos. Poner a true cuando clientes.polihosteleria.es esté en marcha.
  portalActivo: false,
  portalUrl: 'https://clientes.polihosteleria.es',
  // PENDIENTE: hora de corte real por ruta.
  horaCorte: '',
};

export const CTA = { label: 'Quiero ser cliente', href: '/quiero-ser-cliente/' };

export const waLink = (texto = 'Hola, quiero hacer un pedido.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;

export const ZONAS = [
  { nombre: 'Huelva capital', detalle: 'Centro y norte de la ciudad.' },
  { nombre: 'Costa oeste', detalle: 'Isla Cristina, Lepe, Ayamonte y alrededores.' },
  { nombre: 'Costa este', detalle: 'Punta Umbría y alrededores.' },
  { nombre: 'Condado', detalle: 'Pueblos del Condado de Huelva.' },
  { nombre: 'Sierra', detalle: 'Pueblos de la Sierra de Huelva.' },
];

export const CANALES = [
  { nombre: 'WhatsApp', detalle: 'Escribe la lista o manda un audio. Lo apuntamos tal cual.' },
  { nombre: 'Teléfono', detalle: 'Llama a la oficina en horario de atención.' },
  { nombre: 'Tu comercial', detalle: 'Te visita, revisa contigo lo que gastas y te toma el pedido.' },
  { nombre: 'Correo', detalle: 'Mándanos el pedido a pedidos@polihosteleria.es.' },
];

export const SECTORES = ['Bares', 'Cafeterías', 'Restaurantes', 'Hoteles', 'Colectividades', 'Guarderías', 'Empresas de limpieza'];

export type Familia = {
  slug: string;
  nombre: string;
  corto: string;
  titulo: string;
  descripcion: string;
  intro: string;
  incluye: string[];
  formatos: string;
  para: string;
  foto: string;
  alt: string;
  faq: { q: string; a: string }[];
};

export const FAMILIAS: Familia[] = [
  {
    slug: 'menaje-y-vajilla',
    nombre: 'Menaje y vajilla',
    corto: 'Platos, fuentes, cuencos, bandejas y menaje de cocina.',
    titulo: 'Menaje y vajilla para hostelería en Huelva',
    descripcion: 'Vajilla de porcelana para hostelería, fuentes, cuencos y menaje de cocina con reparto propio en Huelva y provincia. Repón lo que se rompe sin esperar.',
    intro: 'La vajilla se rompe, se despareja y siempre falta un plato el sábado. Te llevamos platos, fuentes y cuencos de hostelería, y la reposición de las piezas que más rotas.',
    incluye: ['Platos llanos, hondos y de postre', 'Fuentes, bandejas y platos de presentación', 'Cuencos, tazas y platillos', 'Menaje de cocina: cazos, sartenes, gastronorm y utensilios', 'Bandejas de servicio y tablas'],
    formatos: 'Por unidad o por caja, según la referencia. Si trabajas con una vajilla concreta, la dejamos apuntada para reponerte la misma.',
    para: 'Bares de tapas, restaurantes, hoteles y comedores de colectividades.',
    foto: 'f-menaje',
    alt: 'Platos, cuencos y fuentes de porcelana blanca apilados en el pase de una cocina',
    faq: [
      { q: '¿Puedo reponer solo las piezas que se me rompen?', a: 'Sí. Dejamos apuntada tu vajilla y te repones las piezas sueltas o por caja, sin cambiar todo el servicio.' },
      { q: '¿Me asesoráis si voy a cambiar la vajilla entera?', a: 'Sí. Tu comercial te enseña opciones según el tipo de cocina, el lavavajillas que tienes y lo que se rompe en tu local.' },
    ],
  },
  {
    slug: 'cristaleria',
    nombre: 'Cristalería',
    corto: 'Vasos de caña, copas, tubos y cristalería de barra.',
    titulo: 'Cristalería para hostelería en Huelva',
    descripcion: 'Vasos de caña, copas de vino, tubos y cristalería de barra para bares y restaurantes de Huelva, con reposición por caja y reparto propio.',
    intro: 'Un vaso de caña dura lo que dura. Te mantenemos la barra con la misma cristalería, caja a caja, para que no sirvas en vasos distintos.',
    incluye: ['Vasos de caña y de tubo', 'Copas de vino, de agua y de cóctel', 'Vasos de sidra, de refresco y de chupito', 'Jarras y botellas de agua', 'Cristalería templada para mucho uso'],
    formatos: 'Normalmente en caja de 6, 12 o 24 unidades, según el modelo.',
    para: 'Bares, cervecerías, restaurantes y hoteles.',
    foto: 'f-cristaleria',
    alt: 'Copas, vasos de caña y vasos bajos limpios en una estantería de barra',
    faq: [
      { q: '¿Tenéis cristalería templada?', a: 'Sí, para los locales que lavan mucho y no quieren que el vaso se raye ni se rompa con el primer golpe.' },
      { q: '¿Me podéis reponer el mismo vaso que ya tengo?', a: 'Sí. Lo dejamos apuntado en tu ficha y te repones el mismo modelo.' },
    ],
  },
  {
    slug: 'cuberteria',
    nombre: 'Cubertería',
    corto: 'Cubiertos de acero, cuchillos de carne y cubierteros.',
    titulo: 'Cubertería para hostelería en Huelva',
    descripcion: 'Cubertería de acero inoxidable para bares, restaurantes y hoteles en Huelva: cubiertos de servicio, cuchillos de carne y cubierteros, con reposición.',
    intro: 'Cubiertos que aguantan el lavavajillas industrial y el ritmo de un servicio lleno. Y la reposición de lo que se pierde, que siempre se pierde.',
    incluye: ['Tenedores, cuchillos y cucharas de servicio', 'Cuchillos de carne y de pescado', 'Cucharillas de café y de postre', 'Cubierteros y cestillos para lavavajillas', 'Cubiertos de servir'],
    formatos: 'Por docena o por caja, según la referencia.',
    para: 'Restaurantes, hoteles, comedores y cafeterías.',
    foto: 'f-cuberteria',
    alt: 'Tenedores, cuchillos y cucharas de acero ordenados en un cubiertero gris',
    faq: [
      { q: '¿La cubertería aguanta el lavavajillas industrial?', a: 'La que te llevamos es de acero inoxidable pensado para hostelería. Tu comercial te dice qué gama encaja con tu uso.' },
    ],
  },
  {
    slug: 'desechables-y-envases',
    nombre: 'Desechables y envases',
    corto: 'Vasos de café para llevar, envases de comida, bolsas y cubiertos de un uso.',
    titulo: 'Desechables y envases para hostelería en Huelva',
    descripcion: 'Envases para comida para llevar, vasos de café, tapas, bolsas y cubiertos de un solo uso para bares y restaurantes de Huelva, con reparto propio.',
    intro: 'Si haces comida para llevar, te quedas sin envases el día que más vendes. Te llevamos envases, vasos y bolsas por caja y a tu ritmo.',
    incluye: ['Vasos de café para llevar y tapas', 'Envases y cajas para comida', 'Bolsas de papel', 'Cubiertos y pajitas de un uso', 'Film, papel de aluminio y papel de horno'],
    formatos: 'Por caja o por paquete, según la referencia.',
    para: 'Cafeterías, bares con comida para llevar, restaurantes y obradores.',
    foto: 'f-desechables',
    alt: 'Vasos de café de cartón, cajas de comida y bolsas de papel sobre una barra de acero',
    faq: [
      { q: '¿Tenéis envases que cumplan la normativa de plásticos de un solo uso?', a: 'Sí. Pregunta a tu comercial por las opciones de papel, cartón y materiales compostables.' },
    ],
  },
  {
    slug: 'celulosa',
    nombre: 'Celulosa',
    corto: 'Servilletas, manteles de papel, bobinas y papel higiénico.',
    titulo: 'Servilletas, manteles y celulosa para hostelería en Huelva',
    descripcion: 'Servilletas de papel para hostelería, manteles, bobinas industriales y papel higiénico por caja, con reparto propio en Huelva y provincia.',
    intro: 'La servilleta es lo que antes se acaba y lo último que te acuerdas de pedir. Te la llevamos por caja, con la bobina y el papel del baño en el mismo reparto.',
    incluye: ['Servilletas de 1 y 2 capas, de barra y de mesa', 'Manteles y salvamanteles de papel', 'Bobinas industriales y secamanos', 'Papel higiénico industrial', 'Servilletas para dispensador'],
    formatos: 'Por caja. La servilleta de mesa suele venir en cajas de varios paquetes.',
    para: 'Todos los locales de hostelería y las empresas de limpieza.',
    foto: 'f-celulosa',
    alt: 'Paquetes de servilletas blancas y bobinas de papel industrial en una estantería',
    faq: [
      { q: '¿Puedo pedir solo una caja de servilletas?', a: 'Sí. Va en tu siguiente reparto. Si sueles pedir lo mismo, te lo dejamos como pedido habitual.' },
    ],
  },
  {
    slug: 'limpieza-e-higiene',
    nombre: 'Limpieza e higiene',
    corto: 'Detergente de lavavajillas, desengrasantes, fregonas y bayetas.',
    titulo: 'Productos de limpieza para hostelería en Huelva',
    descripcion: 'Detergente para lavavajillas industrial, abrillantador, desengrasantes, bayetas y material de limpieza profesional para hostelería en Huelva.',
    intro: 'Un lavavajillas sin detergente para el servicio. Te llevamos la química y el material de limpieza que gasta un local cada semana.',
    incluye: ['Detergente y abrillantador para lavavajillas y lavavasos', 'Desengrasantes y limpiadores de cocina', 'Lejías, fregasuelos y desinfectantes', 'Bayetas, estropajos, fregonas y cubos', 'Guantes y jabón de manos'],
    formatos: 'Garrafas de 5 a 20 litros, botellas y paquetes, según el producto.',
    para: 'Hostelería, colectividades y empresas de limpieza.',
    foto: 'f-limpieza',
    alt: 'Garrafas de detergente, pulverizadores y bayetas en una estantería de almacén',
    faq: [
      { q: '¿Qué detergente necesito para mi lavavajillas?', a: 'Depende de la máquina y del agua de tu zona. Te lo decimos en la visita y lo dejamos apuntado para reponerte siempre el mismo.' },
    ],
  },
  {
    slug: 'maquinaria',
    nombre: 'Maquinaria',
    corto: 'Frío, calor, lavavajillas, lavavasos y pequeña maquinaria.',
    titulo: 'Maquinaria de hostelería en Huelva',
    descripcion: 'Maquinaria de hostelería en Huelva: frío comercial, cocinas, hornos, lavavajillas, lavavasos y campanas, con instalación y servicio técnico propio.',
    intro: 'Una máquina parada es una cocina parada. Te vendemos la maquinaria, te la instalamos y te la mantenemos.',
    incluye: ['Frío comercial: botelleros, vitrinas, armarios y cámaras frigoríficas', 'Calor: cocinas, hornos y planchas industriales', 'Lavavajillas industriales y lavavasos', 'Campanas extractoras', 'Pequeña maquinaria: molinos, batidoras, cortadoras y calefacción de terraza'],
    formatos: 'Se presupuesta según el local. Incluye instalación y puesta en marcha.',
    para: 'Bares, restaurantes, hoteles y obradores que montan o renuevan.',
    foto: 'f-maquinaria',
    alt: 'Lavavasos de acero abierto, botellero refrigerado y molino de café detrás de una barra',
    faq: [
      { q: '¿Instaláis la maquinaria?', a: 'Sí. Te la llevamos, la instalamos y la dejamos funcionando. Después te la mantenemos con el servicio técnico.' },
      { q: '¿Reparáis máquinas que no habéis vendido vosotros?', a: 'Pregúntanos. Te decimos si podemos atenderla y cuándo.' },
    ],
  },
  {
    slug: 'uniformes',
    nombre: 'Uniformes',
    corto: 'Delantales, chaquetillas de cocina, camisas y calzado de trabajo.',
    titulo: 'Uniformes de hostelería en Huelva',
    descripcion: 'Uniformes para hostelería en Huelva: delantales, chaquetillas de cocina, camisas de sala y calzado de trabajo para bares, restaurantes y hoteles.',
    intro: 'Que el equipo vaya igual dice mucho del local. Te vestimos la sala y la cocina con prendas que aguantan la lavadora.',
    incluye: ['Delantales de barra y de cocina', 'Chaquetillas y pantalones de cocina', 'Camisas y polos de sala', 'Gorros y complementos', 'Calzado de trabajo'],
    formatos: 'Por talla y por unidad.',
    para: 'Equipos de sala, cocina y pisos.',
    foto: 'f-uniformes',
    alt: 'Delantales negros, chaquetillas blancas y camisas oscuras colgados en un perchero',
    faq: [
      { q: '¿Podéis bordar el logo del local?', a: 'Pregúntanos. Te decimos qué prendas se pueden personalizar y en qué plazo.' },
    ],
  },
  {
    slug: 'mobiliario-de-terraza',
    nombre: 'Mobiliario de terraza',
    corto: 'Mesas, sillas, sombrillas y mobiliario de interior.',
    titulo: 'Mobiliario de terraza para hostelería en Huelva',
    descripcion: 'Mesas y sillas de terraza, sombrillas y mobiliario de interior para bares y restaurantes de Huelva, la Costa, el Condado y la Sierra.',
    intro: 'La terraza es lo primero que ve quien pasa. Te la montamos con mesas, sillas y sombrillas que aguantan el sol de Huelva.',
    incluye: ['Mesas y sillas de terraza', 'Sombrillas y parasoles', 'Taburetes y mobiliario de barra', 'Mobiliario de interior', 'Calefactores de terraza'],
    formatos: 'Por unidad o por lote para la terraza entera.',
    para: 'Bares, chiringuitos, restaurantes y hoteles.',
    foto: 'f-terraza',
    alt: 'Terraza de bar con mesas y sillas de aluminio y una sombrilla en una plaza encalada',
    faq: [
      { q: '¿Me ayudáis a elegir el mobiliario para la licencia de terraza?', a: 'Te ayudamos con el número de mesas y el tipo de mueble según el espacio que tengas. Los permisos los da tu ayuntamiento.' },
    ],
  },
];

export const familia = (slug: string) => FAMILIAS.find((f) => f.slug === slug)!;

export const PENDIENTES = [
  'Razón social y CIF (el mapa antiguo dice «Polirrosa Hostelería S.L.»).',
  'Código postal de la nave y horario de atención.',
  'Si el 615 769 176 tiene WhatsApp.',
  'Hora de corte y días de reparto por zona.',
  'Marcas que distribuyen en exclusiva y año de fundación.',
  'Fotos: las de marca (furgoneta rotulada, nave, repartidor, mozo de almacén) son maquetas generadas para la demo. Sustituir por fotos reales antes de publicar.',
  'Logo: redibujado a partir del PNG de 2011. Pedir el original en vectorial si existe.',
];
