# Section: Google Ads landing page

One-page landing page for Section, steakhouse and supper club at 162 Main Street, Unionville (Markham, ON).
Built on the nextjs-15-starter-shadcn kit.

```bash
npm install
npm run dev -- -p 3011
```

- Photos: originals live in `raw-assets/` (not committed). `node scripts/optimize-images.mjs` turns `raw-assets/web/*.jpg` into WebP variants in `public/images` and writes `src/lib/image-manifest.json`.
- Fonts: Section's own Acme Gothic and Leif, self-hosted from `src/app/fonts` (use confirmed by the client).
- Booking: OpenTable widget, rid 1528420.
