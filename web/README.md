# polihosteleria.es

Web de Polihostelería en Astro 7. La home usa el motor scroll-craft (escenario partido noche/mañana con el albarán que se escribe solo); el resto de páginas son Astro normal.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # sale en dist/
```

## Estado: DEMO

Las fotos con marca (furgoneta rotulada, nave, repartidor, mozo de almacén) y el resto de imágenes están generadas con IA para la presentación. **Antes de publicar en polihosteleria.es hay que cambiarlas por fotos reales.** El logo está redibujado a partir del PNG de 2011.

## Pendiente de confirmar con Polihostelería

Todo está en `src/data/site.ts` (lista `PENDIENTES`):

- Razón social y CIF (el mapa antiguo dice «Polirrosa Hostelería S.L.»).
- Código postal y horario.
- Si el 615 769 176 tiene WhatsApp.
- Hora de corte y días de reparto por zona.
- Marcas en exclusiva y año de fundación.
- Fotos reales.

Cuando la plataforma de pedidos esté en `clientes.polihosteleria.es`, poner `portalActivo: true` en `src/data/site.ts` y aparecen los enlaces «Área de clientes».

## Dónde está cada cosa

- `src/pages/index.astro`: home con scroll-craft. Motor en `public/scrollcraft/` (no se edita).
- `src/data/site.ts`: datos del negocio, familias del catálogo, zonas y canales.
- `src/data/guias.ts` y `src/pages/guias/`: guías.
- `public/_redirects` (Cloudflare) y `vercel.json` (Vercel): 301 de las URL de la web antigua.
- `public/llms.txt`: resumen para buscadores de IA.
- `scrollcraft/builds/polihosteleria-home/BRIEF.md`: brief, curva de sensaciones y partitura de la home.
