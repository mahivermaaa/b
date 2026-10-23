# Bunonbari

Next.js App Router, TypeScript and Tailwind CSS. A local B2B digital showroom with no checkout or backend.

## Run

Use Node.js 24. `npm ci`, then `npm run dev`. Production: `npm run build` and `npm start`.

Checks: `npm run check`, `npm run audit:production`, `npm run build`, then `npm run test:production`. See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub CI, Vercel settings, remaining client inputs and the dependency audit status.

## Client handoff

- Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to international digits including country code (no plus or spaces). The form stays unavailable until a valid number is configured. Confirm the number actually belongs to the business before deployment.
- Set `NEXT_PUBLIC_SITE_URL` to the actual deployment origin for sitemap URLs and metadata. Vercel's own production domain is used automatically if this setting is missing or invalid; outside Vercel, no guessed domain is used.
- Place approved images in `public/images/catalogue/`. Set `coverImage: { src, alt }` on category data and add product records in `src/data/products.ts`. Local image paths begin with `/images/catalogue/`. Use descriptive approved alt text. Category records are in `src/data/categories.ts`; maintain `sortOrder` and array order when changing them.
- The supplied transparent logo is stored in `public/images/brand/bunonbari-logo-transparent.png` and used in the header and footer. A CSS colour filter renders it in ivory against the dark theme while preserving its original alpha transparency and shapes.
- The optional `heroVideo` configuration in `src/lib/config.ts` is disabled. Supply an approved source and poster before enabling it.
- Policy links and social profiles are intentionally omitted until approved content and real profile URLs are available.

Editorial visuals are original AI-created mood studies, explicitly labelled, rather than representations of stock. They are kept separate from catalogue data in `src/data/editorial.ts`. Approved category covers automatically replace them. CSS illustrations remain as a zero-download fallback. Prompts and asset details are documented in `public/images/editorial/ARTWORK.md`.

All 18 categories begin with zero products. The WhatsApp action prepares a message; the visitor must send it and coordinate viewing with the team. No form values are stored or transmitted by the website itself.

## Preview and performance

For review in an embedded browser, use `npm run build` followed by `npm start`. This production preview does not open Next.js's development-only HMR WebSocket. The development configuration also explicitly allows the embedded preview's `127.0.0.1` loopback origin, fixing Next.js's default origin block. Stop `npm run dev` before building or starting production on the same port.

With the production server running, `node scripts/verify-preview.mjs` checks main route responses, 404 handling, initial compressed script sizes and exclusion of the development HMR connection. Local response timing is diagnostic only and is not a real-world mobile speed benchmark.

Images are compressed WebP assets, responsive through Next Image, with only the hero preloaded on the homepage. Collection and story images lazy-load. No external font requests, video autoplay, animation libraries, scroll hijacking or carousel dependencies. Scroll reveals use one IntersectionObserver, and reduced-motion preferences disable animation. The menu supports Escape, focus wrapping and mobile scroll locking.
