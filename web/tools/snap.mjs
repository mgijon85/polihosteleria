// Capturas a posiciones concretas: node tools/snap.mjs url outdir width height "0,0.5,1,..." [reduced]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [url, out, w, h, list, reduced] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/home/claude/bin/chrome', headless: true });
const mobile = +w < 600;
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? 'reduce' : 'no-preference' });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(String(e)));
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('requestfailed', (r) => errs.push('FAILED ' + r.url()));
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const ys = list.split(',').map(Number);
let i = 0;
for (const v of ys) {
  // paso a paso para que los lerps se asienten
  await p.evaluate((y) => window.scrollTo(0, y * innerHeight), v);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/${String(++i).padStart(2, '0')}.png` });
}
console.log('errores:', errs.length ? errs.join('\n') : 'ninguno');
console.log('alto doc (vh):', await p.evaluate(() => (document.documentElement.scrollHeight / innerHeight).toFixed(2)));
await b.close();
