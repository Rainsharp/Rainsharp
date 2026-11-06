# WHALEOX official site

Static marketing site for 鲸牛计算机 / WHALEOX Computer — highway toll ecosystem for the DR Congo.

- **Stack:** [Astro](https://astro.build) 7 (static output) + Tailwind CSS 4. No client framework; a few lines of vanilla JS for dropdowns, scroll reveal and the contact form.
- **Languages:** French (default, `/fr/`), English (`/en/`), Simplified Chinese (`/zh/`). `/` redirects by browser language, falling back to French.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static files to dist/
npm run preview
```

## Where things live

| What | File |
| --- | --- |
| UI copy (all pages, 3 languages) | `src/i18n/ui.ts` |
| Product content (3 languages) | `src/data/products.ts` |
| Company contact details, form endpoint | `src/data/site.ts` |
| Brand assets (from the previous whaleox.com) | `public/brand/` |

Contact details are `null` in `src/data/site.ts` and render as "À confirmer / To be confirmed / 待确认" badges until filled in. Set `formEndpoint` to any service that accepts a `POST` of form data (Formspree, a Cloudflare Worker, etc.) to activate the contact form.

To add a language: add it to `locales` in `src/i18n/config.ts`, add a dictionary in `src/i18n/ui.ts`, and add a `copy.<lang>` entry for each product.

## Deploy

`dist/` is plain static HTML — deploy to Cloudflare Pages (the current whaleox.com is behind Cloudflare), Netlify, Vercel or any static host. Build command `npm run build`, output directory `dist`, root directory `official-site`.
