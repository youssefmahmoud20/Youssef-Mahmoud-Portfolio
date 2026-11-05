# RyanCV React

React 19 + TypeScript + Vite reconstruction of the audited RyanCV developer demo. The site opens at `/developer/`; the root redirects there. React Router preserves the original article, portfolio, archive, shop, cart, and checkout paths.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/developer/`.

```sh
npm run build
npm run preview
```

`build` runs the TypeScript check and emits the production site to `dist/`. Deploy that directory on a static host with SPA fallback to `index.html` for extensionless routes. `_redirects` is supplied for hosts that support it. The Sites deployment configuration is in `.openai/hosting.json`.

## Source organization

* `src/content.ts`: navigation, services, experience, skills, project galleries, article records, products, and external targets.
* `src/styles.css`: theme tokens, measured card layout, responsive rules, and motion preferences.
* `src/components.tsx`: shared shell, profile, typewriter, utility sidebar, footer, and vendor drawer.
* `src/sections.tsx`: the six home sections, filters, masonry cards, testimonials, and contact validation.
* `src/pages.tsx`: project/article detail, comments/replies, archives, pagination, search, and 404.
* `src/commerce.tsx`: shop sorting, products/tabs/reviews, cart, coupons, and checkout.
* `src/Overlay.tsx`: native dialog image/video/project viewers, keyboard navigation, zoom, fullscreen, and focus restoration.
* `public/assets/`: locally downloaded reference imagery, Lekton fonts, CV, and source manifest. No WordPress runtime or database is needed.

At widths above 1120px the right card changes panels and scrolls independently. At 1120px and below, all six home sections stack. At 680px and below, navigation becomes a fixed mobile header with a horizontally scrollable menu.

## Implemented behavior

Portfolio type filters, independent thumbnail/title actions, image and certificate viewers, project and video overlays, blog categories/Load More, all 38 audited content routes, archive pagination, sidebar search, dark/light theme persistence, manual testimonials, cover crossfade, typing animation, product sorting/tabs, quantity controls, persistent cart, remove/undo, and checkout field validation.

The cart and theme use `ryancv.cart` and `ryancv.theme` in localStorage. Personal form data is not persisted. Coupon responses are deterministic because no coupons/backend were supplied.

## Service boundaries and content differences

This is a front-end reconstruction. Contact, comment, and review forms validate inputs and clearly report that submission is not connected; they do not fake delivery/publication. Checkout reproduces the original demo's unavailable-payment state and never places an order. Connect real APIs before using these flows for business.

The full long-form article/comment copy was not included in the audit; those blocks use representative placeholder copy with the documented structure. Some service/product descriptions are abridged. Replace these content fields with the desired final copy. Map and Vimeo embeds retain their original external destinations and depend on those services being available. The theme vendor drawer uses representative project thumbnails rather than exact vendor screenshots.

## Browser QA

See `QA.md` for checks performed. `qa-responsive.html` is a development-only iframe harness for inspecting actual 390px/768px CSS layouts; Vite does not include it in the production build. It accepts `width`, `height`, and `path` query parameters.
