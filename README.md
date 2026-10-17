# Polihostelería — Software de Gestión B2B

Prototipo navegable y completo del software de gestión para **Polihostelería**, distribuidora B2B de material de hostelería en Huelva (facturación de 2 M€/año). Sustituye el ERP de escritorio heredado (**XgestEvo**) por una solución moderna con toma de pedidos omnicanal 24/7 asistida por IA, apps móviles con Tap to Pay y preparación en tablet.

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js >= 18
- npm >= 9

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone git@github.com:mgijon85/polihosteleria.git
cd polihosteleria

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:3000/`.

### Construcción para Producción

```bash
npm run build
```

---

## 📱 Roles Disponibles («Ver como»)

En la cabecera puedes alternar instantáneamente entre los 6 perfiles de usuario:

| Rol | Usuario | Dispositivo | Funcionalidades |
|---|---|---|---|
| **Dirección** | Juanlu (dueño) | Desktop / Móvil | Cuadro de mando ejecutivo, márgenes brutos, decisiones en 1 clic y ventas 12 semanas vs 2025. |
| **Oficina** | Rocío | Desktop | Bandeja omnicanal de pedidos, validación de IA, clientes y cobros. |
| **Almacén** | Paco | Tablet | Picking táctil por ubicación (pasillo/estantería), faltas con sustitutos e impresión de etiquetas. |
| **Comercial** | Antonio Gómez | App Móvil (390px) | Agenda de visitas, toma de pedido express con firma táctil y cobro en mostrador. |
| **Repartidor** | José Romero | App Móvil (390px) | Hoja de ruta, GPS, firma de entrega, fotos y cobro con **Apple Tap to Pay**. |
| **Cliente** | Bar La Ribera | Portal Web / Móvil | Repetir último pedido en 10s, precios pactados y seguimiento en directo de la furgoneta. |

---

## 🛠️ Tecnologías

- **Framework:** React 18 + TypeScript + Vite
- **Estilos:** Tailwind CSS con tokens semánticos Apple (`:root` y `[data-theme=dark]`)
- **Iconografía:** Lucide React
- **Gráficos:** Recharts
- **Firma digital:** HTML5 Canvas
- **Audios:** Web Audio API con onda interactiva

---

## 📂 Estructura del Proyecto

```
src/
├── assets/          # Logotipos y recursos gráficos
├── components/
│   ├── common/      # Cabecera, sidebar, reproductor de audio, firma digital, demo
│   ├── desktop/     # Vistas de escritorio (Inicio, Pedidos, Clientes, Facturas, Stock...)
│   ├── mobile/      # Apps de Comercial, Repartidor y Portal de Cliente B2B (iPhone 390px)
│   └── tablet/      # App táctil de picking de almacén (Tablet 1024px)
├── context/         # AppContext: estado global en memoria, simulación y acciones
├── data/            # Mock data realista (85 clientes, 320 artículos, 63 pedidos, rutas)
├── types/           # Definiciones TypeScript completas
└── utils/           # Formateadores (moneda española 1.234,56 €, fechas y números)
```
