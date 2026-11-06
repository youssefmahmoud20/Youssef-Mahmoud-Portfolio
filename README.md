# Youssef Mahmoud

React 19 + TypeScript + Vite portfolio.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/`.

```sh
npm run build
npm run preview
```

`build` runs the TypeScript check and emits the production site to `dist/`. Deploy that directory on a static host with SPA fallback to `index.html` for extensionless routes. `_redirects` is supplied for hosts that support it. The Sites deployment configuration is in `.openai/hosting.json`.

## Source organization

* `src/content.ts`: navigation, services, experience, skills, project galleries, products, and external targets.
* `src/styles.css`: theme tokens, measured card layout, responsive rules, and motion preferences.
* `src/components.tsx`: shared shell, profile, typewriter, and footer.
* `src/sections.tsx`: the five home sections, filters, masonry cards, testimonials, and contact validation.
* `src/pages.tsx`: project detail and 404.
* `src/commerce.tsx`: shop sorting, products/tabs/reviews, cart, coupons, and checkout.
* `src/Overlay.tsx`: native dialog image/video/project viewers, keyboard navigation, zoom, fullscreen, and focus restoration.
* `public/assets/`: locally downloaded reference imagery, Lekton fonts, CV, and source manifest. No WordPress runtime or database is needed.

At widths above 1120px the right card changes panels and scrolls independently. At 1120px and below, all five home sections stack. At 680px and below, navigation becomes a fixed mobile header with a horizontally scrollable menu.

## Implemented behavior

Portfolio type filters, independent thumbnail/title actions, image and certificate viewers, project and video overlays, manual testimonials, cover crossfade, typing animation, product sorting/tabs, quantity controls, persistent cart, remove/undo, and checkout field validation.

## Service boundaries and content differences

The contact form sends through Web3Forms using the public form access key in `src/content.ts`. Set `VITE_WEB3FORMS_ACCESS_KEY` at build time to override it. If delivery is unavailable, visitors can open their draft in their email app.

Product reviews and checkout remain demo flows.

Some service/product descriptions are abridged. Replace these content fields with the desired final copy. Map and Vimeo embeds retain their original external destinations and depend on those services being available.

## Browser QA

See `QA.md` for checks performed. `qa-responsive.html` is a development-only iframe harness for inspecting actual 390px/768px CSS layouts; Vite does not include it in the production build. It accepts `width`, `height`, and `path` query parameters.
