import sharp from 'sharp';
const S='/home/claude/assets-src/', H='/home/claude/polihosteleria-web/public/scrollcraft/home/', A='/home/claude/polihosteleria-web/src/assets/fotos/';
const jobs = [
  ['night-graded.png', H+'noche-1920.webp', 1920, 62], ['night-graded.png', H+'noche-960.webp', 960, 60],
  ['morning.png', H+'manana-1920.webp', 1920, 64], ['morning.png', H+'manana-960.webp', 960, 62],
  ['almacen.png', H+'almacen-1100.webp', 1100, 64], ['almacen.png', H+'almacen-700.webp', 700, 62],
  ['boxes.png', H+'cajas-900.webp', 900, 74, true], ['boxes.png', H+'cajas-560.webp', 560, 72, true],
  ['plates.png', H+'platos-700.webp', 700, 74, true], ['plates.png', H+'platos-420.webp', 420, 72, true],
  ['glasses.png', H+'vasos-900.webp', 900, 76, true], ['glasses.png', H+'vasos-560.webp', 560, 74, true],
];
for (const [src,out,w,q,alpha] of jobs){ const i=sharp(S+src).resize({width:w}); await (alpha? i.webp({quality:q, alphaQuality:90}) : i.webp({quality:q})).toFile(out); }
// sources for astro:assets (high-quality jpg, 2000px wide)
const fotos = ['f-menaje','f-cristaleria','f-cuberteria','f-desechables','f-celulosa','f-limpieza','f-maquinaria','f-uniformes','f-terraza','m-cafeteria','m-cocina','m-sat','almacen','morning','night-graded','van'];
for (const f of fotos){ await sharp(S+f+'.png').resize({width:2000, withoutEnlargement:true}).jpeg({quality:84, mozjpeg:true}).toFile(A+f.replace('night-graded','noche').replace('morning','manana')+'.jpg'); }
console.log('ok');
