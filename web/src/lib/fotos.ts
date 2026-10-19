import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.jpg', { eager: true });
export const foto = (nombre: string): ImageMetadata => {
  const hit = all[`../assets/fotos/${nombre}.jpg`];
  if (!hit) throw new Error(`Foto no encontrada: ${nombre}`);
  return hit.default;
};
