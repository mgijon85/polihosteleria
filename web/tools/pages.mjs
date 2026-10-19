import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [base, out, w, h, ...paths] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/home/claude/bin/chrome', headless: true });
const mobile = +w < 600;
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, isMobile: mobile, hasTouch: mobile });
for (const pth of paths) {
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('requestfailed', (r) => errs.push('FAILED ' + r.url()));
  p.on('response', (r) => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
  await p.goto(base + pth, { waitUntil: 'networkidle' });
  const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const name = pth.replace(/\//g, '_') || 'home';
  await p.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  console.log(pth, 'overflowX=' + over, errs.length ? errs.join(' | ') : 'ok');
  await p.close();
}
await b.close();
