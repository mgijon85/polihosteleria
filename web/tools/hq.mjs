// Exporta las imágenes HQ (upscale 2x / 4K nativo) a WebP para la home
// y a JPG fuente (2400px) para astro:assets.
import sharp from 'sharp';
import fs from 'node:fs';

const HQ = '/home/claude/hq/final/';
const H = '/home/claude/polihosteleria-web/public/scrollcraft/home/';
const A = '/home/claude/polihosteleria-web/src/assets/fotos/';

const webp = (q) => ({ quality: q, effort: 6, smartSubsample: true });

// Fondos a sangre de la home: 960 / 1600 / 2400 / 3200
const full = [['noche', 'noche'], ['manana', 'manana'], ['entrega', 'entrega']];
for (const [src, out] of full) {
  for (const w of [960, 1600, 2400, 3200]) {
    await sharp(HQ + src + '.png').resize({ width: w, kernel: 'lanczos3' }).webp(webp(w >= 2400 ? 82 : 85)).toFile(`${H}${out}-${w}.webp`);
  }
}
// Almacén (columna 50vw): 700 / 1100 / 1600 / 2200
for (const w of [700, 1100, 1600, 2200]) {
  await sharp(HQ + 'almacen-marca.png').resize({ width: w, kernel: 'lanczos3' }).webp(webp(84)).toFile(`${H}almacen-marca-${w}.webp`);
}
// Recortes con alfa
for (const [src, out, ws] of [['plates-alpha', 'platos', [420, 700, 1000]], ['glasses-alpha', 'vasos', [560, 900, 1300]]]) {
  for (const w of ws) {
    await sharp(HQ + src + '.png').resize({ width: w, kernel: 'lanczos3' }).webp({ ...webp(84), alphaQuality: 90 }).toFile(`${H}${out}-${w}.webp`);
  }
}

// Fuentes para astro:assets
const fotos = {
  'f-menaje': 'f-menaje', 'f-cristaleria': 'f-cristaleria', 'f-cuberteria': 'f-cuberteria', 'f-desechables': 'f-desechables',
  'f-celulosa': 'f-celulosa', 'f-limpieza': 'f-limpieza', 'f-maquinaria': 'f-maquinaria', 'f-uniformes': 'f-uniformes',
  'f-terraza': 'f-terraza', 'm-cafeteria': 'm-cafeteria', 'm-cocina': 'm-cocina', 'm-sat': 'm-sat',
  'almacen-marca': 'almacen-marca', 'nave-marca': 'nave-marca', 'furgoneta-marca': 'furgoneta-marca', 'entrega': 'entrega',
  'manana': 'manana', 'noche': 'noche',
};
for (const [src, out] of Object.entries(fotos)) {
  const f = fs.existsSync(HQ + src + '.png') ? HQ + src + '.png' : HQ + src + '.jpg';
  await sharp(f).resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(A + out + '.jpg');
}
console.log('ok');
