import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.resolve('screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando captura de pantallas con Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  async function takeSnap(name, width, height, theme = 'light', prepareFn = null) {
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

    if (theme === 'dark') {
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Cambiar tema"]');
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 300));
    }

    if (prepareFn) {
      await page.evaluate(prepareFn);
      await new Promise(r => setTimeout(r, 400));
    }

    const filePath = path.join(OUT_DIR, `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`✓ Capturado: ${name}.png (${width}x${height}, ${theme})`);
  }

  try {
    // 1. Desktop 1440px - Inicio (Light)
    await takeSnap('desktop-1440-inicio-light', 1440, 900, 'light');

    // 2. Desktop 1440px - Inicio (Dark)
    await takeSnap('desktop-1440-inicio-dark', 1440, 900, 'dark');

    // 3. Desktop 1440px - Pedidos (Light)
    await takeSnap('desktop-1440-pedidos-light', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Pedidos'));
      if (btn) btn.click();
    });

    // 4. Desktop 1440px - Clientes (Light)
    await takeSnap('desktop-1440-clientes-light', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Clientes'));
      if (btn) btn.click();
    });

    // 5. Tablet 1024px - Almacén Picking
    await takeSnap('tablet-1024-almacen-picking', 1024, 768, 'light', () => {
      const verComoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ver como'));
      if (verComoBtn) verComoBtn.click();
      setTimeout(() => {
        const almacenOption = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Almacén'));
        if (almacenOption) almacenOption.click();
      }, 100);
    });

    // 6. Mobile 390px - App Comercial
    await takeSnap('mobile-390-comercial', 390, 844, 'light', () => {
      const verComoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ver como'));
      if (verComoBtn) verComoBtn.click();
      setTimeout(() => {
        const comOption = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Comercial'));
        if (comOption) comOption.click();
      }, 100);
    });

    // 7. Mobile 390px - App Repartidor
    await takeSnap('mobile-390-repartidor', 390, 844, 'light', () => {
      const verComoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ver como'));
      if (verComoBtn) verComoBtn.click();
      setTimeout(() => {
        const repOption = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Repartidor'));
        if (repOption) repOption.click();
      }, 100);
    });

    // 8. Mobile 390px - Portal Cliente Bar La Ribera
    await takeSnap('mobile-390-portal-cliente', 390, 844, 'light', () => {
      const verComoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ver como'));
      if (verComoBtn) verComoBtn.click();
      setTimeout(() => {
        const cliOption = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Bar La Ribera') || b.textContent.includes('Cliente'));
        if (cliOption) cliOption.click();
      }, 100);
    });

    // 9. Desktop 1440px - Reparto y Rutas
    await takeSnap('desktop-1440-reparto-rutas', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Reparto'));
      if (btn) btn.click();
    });

    // 10. Desktop 1440px - Stock y Propuestas de Compra IA
    await takeSnap('desktop-1440-stock-compras', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Stock'));
      if (btn) btn.click();
    });

    // 11. Desktop 1440px - Facturación Verifactu
    await takeSnap('desktop-1440-facturas-verifactu', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Facturas'));
      if (btn) btn.click();
    });

    // 12. Desktop 1440px - Asistentes de IA
    await takeSnap('desktop-1440-asistentes-ia', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Asistentes'));
      if (btn) btn.click();
    });

    // 13. Desktop 1440px - Ajustes y Migración XgestEvo
    await takeSnap('desktop-1440-ajustes-empresa', 1440, 900, 'light', () => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ajustes'));
      if (btn) btn.click();
    });

    // 14. Desktop 1440px - Modal Desambiguación IA Pedido Nocturno
    await takeSnap('desktop-1440-modal-desambiguacion-ia', 1440, 900, 'light', () => {
      const pedidosBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Pedidos'));
      if (pedidosBtn) pedidosBtn.click();
      setTimeout(() => {
        const revisarBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Revisar'));
        if (revisarBtn) revisarBtn.click();
      }, 150);
    });

    console.log('¡Todas las capturas se han generado con éxito!');
  } catch (err) {
    console.error('Error durante la captura:', err);
  } finally {
    await browser.close();
  }
}

run();
