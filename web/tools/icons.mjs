import sharp from 'sharp';
const L='/home/claude/assets-src/logo-clean.png', P='/home/claude/polihosteleria-web/public/';
await sharp(L).png().toFile(P+'img/logo.png');
const sq = async (size, out, bg) => {
  const inner = Math.round(size*0.86);
  const logo = await sharp(L).resize({width: inner, height: inner, fit:'contain', background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
  await sharp({create:{width:size,height:size,channels:4,background:bg}}).composite([{input:logo, gravity:'center'}]).png().toFile(P+out);
};
await sq(32,'favicon-32.png',{r:255,g:255,b:255,alpha:0});
await sq(180,'apple-touch-icon.png',{r:255,g:255,b:255,alpha:1});
await sq(512,'icon-512.png',{r:255,g:255,b:255,alpha:1});
// OG
const bg = await sharp('/home/claude/assets-src/morning.png').resize(1200,630,{fit:'cover', position:'centre'}).modulate({brightness:0.92}).toBuffer();
const tile = await sharp({create:{width:200,height:184,channels:4,background:{r:255,g:255,b:255,alpha:0.94}}}).png().toBuffer();
const logo = await sharp(L).resize({width:170}).png().toBuffer();
await sharp(bg).composite([{input:tile, left:48, top:48},{input:logo, left:63, top:62}]).jpeg({quality:82}).toFile(P+'img/og.jpg');
console.log('ok');
