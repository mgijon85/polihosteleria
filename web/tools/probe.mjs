import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/home/claude/bin/chrome', headless: true });
const p = await b.newPage();
const r = await p.evaluate(() => { const v = document.createElement('video'); return { h264: v.canPlayType('video/mp4; codecs="avc1.640028"'), vp9: v.canPlayType('video/webm; codecs="vp9"') }; });
console.log(r); await b.close();
