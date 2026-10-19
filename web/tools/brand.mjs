import sharp from 'sharp';
const B='/home/claude/assets-src/brand/', H='/home/claude/polihosteleria-web/public/scrollcraft/home/', A='/home/claude/polihosteleria-web/src/assets/fotos/';
const jobs = [
  ['almacen.png', H+'almacen-marca-1100.webp', 1100, 64], ['almacen.png', H+'almacen-marca-700.webp', 700, 62],
  ['entrega.png', H+'entrega-1920.webp', 1920, 66], ['entrega.png', H+'entrega-960.webp', 960, 64],
];
for (const [s,o,w,q] of jobs) await sharp(B+s).resize({width:w}).webp({quality:q}).toFile(o);
for (const [s,o] of [['almacen.png','almacen-marca'],['entrega.png','entrega'],['van2.png','furgoneta-marca']]) await sharp(B+s).resize({width:2000,withoutEnlargement:true}).jpeg({quality:84,mozjpeg:true}).toFile(A+o+'.jpg');
console.log('ok');
