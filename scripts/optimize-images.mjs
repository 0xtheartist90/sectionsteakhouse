// Turns every raw-assets/web/*.jpg into small and large WebP variants in public/images and
// records their sizes in src/lib/image-manifest.json, which src/lib/responsive.ts reads.
// sharp ships with Next. SHARP_FROM can point at another project's package.json to borrow its copy.
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(process.env.SHARP_FROM ?? import.meta.url);
const sharp = require('sharp');

const SRC = 'raw-assets/web';
const OUT = 'public/images';
const WIDTHS = [800, 1800];

await mkdir(OUT, { recursive: true });
const manifest = {};
const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();

for (const file of files) {
    const name = path.basename(file, '.jpg');
    const input = sharp(path.join(SRC, file)).rotate();
    const { width, height } = await input.metadata();
    const variants = [];
    for (const [i, target] of WIDTHS.entries()) {
        const w = Math.min(target, width);
        if (i > 0 && w <= variants[variants.length - 1].w) continue;
        const out = `${name}-${i === 0 ? 'sm' : 'lg'}.webp`;
        await input.clone().resize({ width: w }).webp({ quality: 78 }).toFile(path.join(OUT, out));
        variants.push({ src: `/images/${out}`, w });
    }
    manifest[`/images/${name}.jpg`] = { w: width, h: height, variants };
    console.log(name, `${width}x${height}`, variants.map((v) => v.w).join(', '));
}

// Social share image
await sharp(path.join(SRC, 'dining-room.jpg')).resize(1200, 630).jpeg({ quality: 82 }).toFile('public/og.jpg');

await writeFile('src/lib/image-manifest.json', JSON.stringify(manifest, null, 1) + '\n');
