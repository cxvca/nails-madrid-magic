# nails.liis — Sitio editorial de nail art (Madrid)

Brand site in Spanish for the nail artist **nails.liis**, Madrid. Editorial fashion-portfolio register: the photography is the product, the interface stays out of the way. Built GSAP-first, following the uploaded brief as the brand spec.

Note: the three skill zips are uploaded but not activated in this project, so I'll apply the brief's rules directly (color/typography/motion strategy, absolute bans) rather than running skill scripts.

## Design direction

- **Base:** one tinted near-black (OKLCH lightness ~0.16, chroma ~0.008 toward warm violet) plus a tinted off-white for one contrast section. No `#000`/`#fff`, no invented pink brand palette — accent per section comes from the photo on screen (silver/mono, pink-gold, warm pastel, teal).
- **Type:** large editorial serif for display (heavy scale jumps, ≥1.25 ratio, intentional off-axis word stacking) + clean grotesk for UI/body. Spanish copy throughout, with Spanish-appropriate display strings ("UÑAS / COMO ARTE.").
- **Motion:** GSAP + ScrollTrigger for all reveals, pinning, parallax, headline splitting, masked image reveals; ease-out expo/quint only, transform/opacity only, full `prefers-reduced-motion` static fallbacks.
- **Bans enforced:** no gradient text, no glass as a default surface (one nav-on-scroll exception), no side-stripe cards, no repeating icon+heading cards, no modals where inline works, no centered-everything.

## Sections (all Spanish)

1. **Nav** — `nails.liis` + TRABAJOS · SERVICIOS · SOBRE MÍ · FAQ · RESERVAR. Transparent over hero → subtle blurred bar on scroll. Fullscreen editorial menu on mobile.
2. **Hero** — full-bleed, massive display headline with word-level drift + mouse parallax, one campaign image integrated into the type, micro-copy `NAIL ART A MEDIDA • MADRID`, CTAs RESERVAR CITA / VER EL TRABAJO, animated scroll cue.
3. **Intro** — "NO ES UNA MANICURA. ES UNA PIEZA ÚNICA." + one tight paragraph, restrained scroll reveal.
4. **Galería** — asymmetrical editorial masonry (portrait crops, overlaps, full-bleed, macro). Hover: scale + blur-to-sharp + name/category + "VER SET →". Click opens fullscreen lightbox with name, description, shape, duration, prev/next.
5. **El detalle** — macro crops, "EL / DETALLE / IMPORTA.", four callouts: ESCULPIDO · PINTADO A MANO · A MEDIDA · STATEMENT (pinned scrub reveal).
6. **Servicios** — numbered editorial list (01 BIAB / GEL … 06 SETS A MEDIDA), inline progressive expand with description, duration and complexity. Prices shown as "Precio a consultar" (no invented numbers); durability line uses her real claim: *duración de hasta 2 meses con el set intacto*. Structured so real prices drop in as data later.
7. **Set a medida** — "TU IDEA. / SU LIENZO." horizontal-scroll pinned sequence (inspiración → diseño → resultado), CTA PEDIR UN SET A MEDIDA.
8. **Sobre la artista** — portrait placeholder + personal Spanish copy, Madrid.
9. **Social** — "MÁS NAIL ART, CADA DÍA." real-work grid, CTA linking to Instagram `@nails.liis`.
10. **Reserva** — strongest block: headline "¿LISTA PARA TU / PRÓXIMO SET?" with a **placeholder button only** (no form, no backend), written so an external system (Fresha/Calendly) or a form can replace it without a rebuild.
11. **FAQ** — elegant GSAP accordion (duración, sets a medida, referencias, largos extremos, cancelaciones, preparación, retirada, precio del arte).
12. **Footer** — large wordmark, `NAIL ART A MEDIDA • MADRID`, minimal links, copyright.

## Imagery

The 4 uploaded sets become the hero + first gallery entries + detail crops via Lovable Assets. I'll generate ~10 additional nail-art images (chrome, macro close-ups, character/hand-painted, extensions, studio texture) matched to the same lighting and quality bar so the editorial layout has enough material. All replaceable with her real photos later.

## Responsive

Desktop: full parallax + horizontal scroll. Tablet: asymmetry preserved, not collapsed. Mobile: re-cropped images and re-tuned type scale as its own premium layout; no custom cursor on touch; simplified (not removed) fullscreen menu.

## Technical

- TanStack Start route at `src/routes/index.tsx` (replaces placeholder) with per-route Spanish `head()` metadata (title, description, og/twitter), plus `/trabajos`-style deep routes only if needed later.
- `gsap` + `@gsap/react` installed; ScrollTrigger, timelines, custom split-text helper (no premium plugins), `matchMedia` for reduced-motion and breakpoint-scoped animations. Smooth scroll via a lightweight lenis-style setup integrated with ScrollTrigger.
- Design tokens (colors, type scale, radii, easing) in `src/styles.css` under `@theme inline` — no hardcoded color utilities in components.
- Components split under `src/components/site/` (Nav, Hero, Statement, Gallery, Lightbox, Detail, Services, CustomSet, About, Social, Booking, Faq, Footer).
- Placeholders left explicit and easy to edit: prices, durations, artist portrait, extra photos, booking link.

## Left open (needs her input before launch)

Real prices, real service durations, artist portrait, 15–25 real photos, final category taxonomy, booking system URL.
