import { chromium } from 'playwright-core';
const [url, out, w, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/home/claude/bin/chrome', headless: true });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.click('[data-menu-open]');
await p.waitForTimeout(400);
await p.screenshot({ path: out });
await b.close();
