import sharp from 'sharp';
import { readdir, stat, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = '/home/edwlearn/mecci/public';
const MAX_WIDTH = 1280;
const QUALITY = 75;

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImages(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const images = await getImages(PUBLIC_DIR);
let totalBefore = 0, totalAfter = 0, count = 0;

for (const imgPath of images) {
  try {
    const before = (await stat(imgPath)).size;
    totalBefore += before;
    const ext = extname(imgPath).toLowerCase();
    const img = sharp(imgPath);
    let pipeline = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    pipeline = ext === '.png'
      ? pipeline.png({ quality: QUALITY, compressionLevel: 9 })
      : pipeline.jpeg({ quality: QUALITY, progressive: true });
    const buffer = await pipeline.toBuffer();
    const after = buffer.length;
    if (after < before) {
      await writeFile(imgPath, buffer);
      totalAfter += after;
      count++;
    } else {
      totalAfter += before;
    }
  } catch(e) {
    process.stderr.write(`✗ ${imgPath.split('/public/')[1]}: ${e.message}\n`);
  }
}

console.log(`Comprimidas: ${count}/${images.length}`);
console.log(`Antes: ${(totalBefore/1024/1024).toFixed(1)}MB → Después: ${(totalAfter/1024/1024).toFixed(1)}MB`);
console.log(`Ahorro: ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB`);
