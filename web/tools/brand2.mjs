import sharp from 'sharp';
const B='/home/claude/assets-src/brand/', P='/home/claude/polihosteleria-web/public/', A='/home/claude/polihosteleria-web/src/assets/fotos/';
const L = B+'logo-hd-alpha.png';
await sharp(L).resize({width:280}).png({compressionLevel:9}).toFile(P+'img/logo.png');
const sq = async (size, out, bg) => {
  const inner = Math.round(size*0.9);
  const logo = await sharp(L).resize({width:inner,height:inner,fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
  await sharp({create:{width:size,height:size,channels:4,background:bg}}).composite([{input:logo,gravity:'center'}]).png().toFile(P+out);
};
await sq(32,'favicon-32.png',{r:255,g:255,b:255,alpha:0});
await sq(180,'apple-touch-icon.png',{r:255,g:255,b:255,alpha:1});
await sq(512,'icon-512.png',{r:255,g:255,b:255,alpha:1});
await sharp(B+'nave.png').resize(1200,630,{fit:'cover',position:'centre'}).jpeg({quality:82,mozjpeg:true}).toFile(P+'img/og.jpg');
await sharp(B+'nave.png').resize({width:2000}).jpeg({quality:84,mozjpeg:true}).toFile(A+'nave-marca.jpg');
console.log('ok');
