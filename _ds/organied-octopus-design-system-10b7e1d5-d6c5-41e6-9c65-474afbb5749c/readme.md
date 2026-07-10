# Organised Octopus — Design System

Source of truth for **Organised Octopus** — per the brand's own guidelines, a maker of 3D-printed home organisers designed as sculptural objects, not just storage. The brand's stated mission: "to turn everyday organisation into an act of self-expression — through sculptural, 3D printed objects that anchor daily rituals." Its products (trays, caddies, catch-alls) are pitched under two ideas: **Art in Utility** ("every organiser is designed as a sculptural object first — function follows form, but never at its expense") and **Routine as Ritual** ("we don't sell storage. We sell the architecture of daily habits"). The name is literal — like an octopus, the brand is "intelligent, adaptive, and endlessly resourceful," helping people "extend their reach into every corner of their daily routine." Manufacturing is additive (3D printing), pitched as low-waste, endlessly iterable, and zero-inventory.

The storefront this system's components/UI kit are built from (a single-page e-commerce site selling furniture in numbered collections — Luno, Arco, Vera) is a separate, monochrome-minimalist visual execution of the brand — see the mismatch note under Caveats. There is exactly **one product surface** here — the public storefront (home / collection / about, plus a slide-out cart and a fullscreen circle-reveal menu). No separate app, dashboard, or docs site was found.

## Sources

- GitHub repo (site source, read in full): [`deepesh-design/organised-octopus`](https://github.com/deepesh-design/organised-octopus) — `index.html`, `about.html`, `collection.html` plus its `assets/` and uploaded product photography.
- Typeface: [`LCTipografi/BDO-Grotesk`](https://github.com/LCTipografi/BDO-Grotesk) — the open-source (SIL OFL 1.1) neo-grotesk the site itself loads as "Bdogrotesk" from a private Webflow CDN. We pulled the identical family from its public OFL repo rather than substituting, so **no font substitution was needed**.
- Uploaded logo files (`Icon black/white.svg`, `Octopus black/white.svg`) — the brand's wordmark lockups, provided directly by the user.
- `uploads/Organised Octopus - Brand Guidelines.pdf` — an older brand guidelines deck ("Where Art Meets Order," v1.0, April 2026) for what appears to be a related-but-different concept: a 3D-printed home-organiser product line, versus the monochrome furniture storefront the GitHub repo builds. Its **voice, tone, mission/vision copy, and tagline** are used verbatim below per the user's direction — see the caveat at the bottom of this file about the resulting mismatch with the visual system.

Explore the GitHub repo further for anything this system doesn't cover yet — it's the ground truth for exact copy, imagery, and interaction timing.

## Index — what's in this project

- `styles.css` + `tokens/` — global stylesheet entry point and CSS custom properties (colors, type, spacing, effects/motion).
- `assets/` — logos (`logos/`), fonts (`fonts/`, BDO Grotesk woff2 + OFL license), and the octopus icon mark / loading glyph pulled from the source repo.
- `guidelines/` — 13 foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `components/commerce/` — `ShopButton`, `ProductThumb`, `CollectionNavItem`, `CartDrawer`.
- `components/navigation/` — `SiteHeader`, `IconButton`, `MenuOverlay`, `SiteFooter`.
- `ui_kits/storefront/` — `index.html` + `HomeScreen.jsx`, an interactive click-through recreation of the homepage (hero product swap, collection tabs, fullscreen menu, cart drawer).
- `SKILL.md` — portable skill file for using this system in Claude Code.

## Intentional additions

The source is a single marketing/e-commerce page, not a component library — there was no explicit inventory to enumerate. The 8 components above were reverse-engineered from the page's own repeated UI patterns (its button bar, product tiles, numbered nav links, hamburger/menu, footer, cart). Nothing generic (Input, Select, Tabs, Toast…) was invented — the brand has no forms or app chrome to justify them.

---

## Content fundamentals

*Superseded by the brand guidelines PDF — voice below is sourced from `Organised Octopus - Brand Guidelines.pdf` and replaces the storefront-copy read that used to live here.*

- **Tagline**: "Your home called. It wants art."
- **Mission**: "To turn everyday organisation into an act of self-expression — through sculptural, 3D printed objects that anchor daily rituals."
- **Vision**: "A world where every surface, shelf, and corner of your home is curated with intention — where organisation is not a chore but a creative act."
- **Values**: **Art in Utility** — every piece is a sculptural object first; function follows form but never at its expense. **Routine as Ritual** — the brand sells the architecture of daily habits, not storage. **Adaptive by Design** — 3D printing means endless iteration; no two homes (or organisers) need be the same. **Conscious Making** — additive manufacturing, biodegradable materials, zero-inventory production: less waste, more wonder.
- **Brand story, in brief**: the name is literal — "Like the octopus — intelligent, adaptive, and endlessly resourceful — our brand helps people extend their reach into every corner of their daily routine." Each product is described as "an arm of a larger ecosystem of order." The founding belief: "the objects that bring order to your life should also bring you joy" — organisation isn't restriction, it's "the conditions for creativity, calm, and intention."
- **Voice pillars**: Playfully Smart (light puns/octopus references welcome, cringe is not), Design-Literate (references design movements without being pretentious, educates through storytelling not lectures), Warmly Intentional (calm, unhurried, considered), Inclusive & Inviting (studio apartment or farmhouse, your space matters), Tactile & Sensory (describes weight, texture, print ridges — copy should make you want to touch the product), Quietly Confident (lets the design speak; doesn't shout).
- **Personality spectrum**: playful ↔ serious, warm ↔ cool, minimal ↔ maximal, premium ↔ accessible, technical ↔ emotional — the brand sits toward playful, warm, minimal, accessible, and emotional on each.
- **Person**: first person plural ("we design," "we believe") addressing the reader directly as "you" ("your home," "your ritual") — conversational and warm, not brochure-third-person.
- **Casing**: sentence case in running copy; section labels/overlines are set in caps ("NEW COLLECTION", "MISSION", "VISION") as a typographic device, not a voice rule.
- **We say / we never say** (verbatim from the guide): "A place for your keys, your coffee, your morning calm." / "Printed layer by layer. Designed to last ritual by ritual." / "Your desk called. It wants to feel beautiful." / "Fewer things. Better things. Right things." / "Organisation isn't about perfection — it's about intention." — versus never: "Declutter your life!" (too aggressive), "Premium luxury home accessories" (too corporate), "Buy now before stocks run out!" (scarcity pressure), "Our AI-driven manufacturing process…" (too technical/cold), "Just another storage solution" (never "just").
- **Copy in context**: product description ("The Coral Tray sits on your nightstand like a piece from a gallery…"), Instagram caption ("Every morning starts somewhere. Ours starts at the Ripple Caddy…"), email subject ("Your entryway deserves a standing ovation."), 404 page ("Even octopuses lose track of things sometimes. Let's get you back to familiar waters.") — all short, warm, a little witty, never salesy.
- **Emoji**: used sparingly and specifically — the octopus emoji 🐙 appears in the guide's own voice examples (Instagram captions); the "Playfully Smart" / "Design-Literate" / "Warmly Intentional" pillars are each headed by one emoji (🐙🏛🌿) as a section marker. This is a real change from the storefront's zero-emoji rule — treat emoji as an occasional warm accent, not a UI icon system.
- **Vibe**: a clever, design-obsessed friend — warm but witty, confident but never preachy, unhurried and tactile.

## Visual foundations

- **Color**: strictly black (`#000`) and white (`#fff`), plus one grayscale ramp (`#555`, `#8f8f8f`, `#afafaf`) for hover/muted/disabled states. No accent color exists anywhere in the source — do not introduce one.
- **Type**: a single family, BDO Grotesk, weight 500 (medium) for nearly everything, with negative tracking (`-0.03em`) applied globally — even to body copy. Display sizes are dramatic (100px hero, 70px section statements) while UI/body text holds at one size (16px). Bold (700) exists in the family but is unused on the live site.
- **Spacing**: a 12-column grid, 16px gutter, 16px page padding — consistent on every section. Vertical rhythm between major sections runs 80/120/200px, not a tight repeating scale.
- **Backgrounds**: flat white or flat black only — no gradients, no textures, no patterns. Photography (studio product shots, warm-neutral lighting) is the only imagery; it's always full-bleed within its grid cell, 2:2.6 portrait crop, `object-fit: cover`.
- **Animation**: slow, editorial entrance choreography — page elements slide up from `translateY(100%)` on load, staggered by ~400ms per group, using `cubic-bezier(.16,1,.3,1)`. The nav menu reveals via a circular `clip-path` wipe from the hamburger's position using `cubic-bezier(.77,0,.18,1)` over 0.75s. A scroll-pinned section spreads three stacked product images apart as the user scrolls. No bounce, no spring, no looping decorative motion.
- **Hover states**: links darken from black to `#555`; buttons drop to ~85% opacity. No color inversion, no underline-on-hover.
- **Press / active states**: not distinctly styled beyond the hover treatment — the brand doesn't use scale/shrink press feedback.
- **Borders**: hairline only, `#afafaf`, used solely as an underline beneath inactive collection-nav items (never as a card border or left-accent stripe).
* **Corner radius**: zero, everywhere — buttons, images, drawers, overlays. This is a hard rule, not an oversight.
- **Shadows**: none. Depth comes from full-bleed black/white contrast and the cart drawer's scrim, never from box-shadow.
- **Transparency / blur**: the only transparency in the system is the 50%-black scrim behind the cart drawer and modal-style overlays — no frosted-glass/backdrop-blur anywhere.
- **Imagery color vibe**: warm, neutral studio lighting on furniture against plain backgrounds — not cool, not black-and-white, no heavy grain or filter.
- **Cards**: the closest thing to a "card" is a product tile — an image plus a name label, no border, no shadow, no radius, no background fill. Structure comes entirely from the grid, not from a container shape.
- **Fixed elements**: the header (logo + hamburger) and footer are both `position: fixed`; page content scrolls beneath/over them, revealing the footer only once a scroll spacer clears.

## Iconography

- No icon font and no third-party icon set. The brand's only "icon" is its own octopus mark (a rounded-square glyph containing an octopus silhouette, see `assets/loading-icon.svg` and `assets/footer-logo-white.svg`) plus a hand-built hamburger/X built from three `<span>` bars (see `IconButton`).
- No emoji, no Unicode-symbol icons anywhere in the product.
- The wordmark (`assets/logos/icon-black.svg`, `icon-white.svg`) is a custom lettered logotype, not a typeset name — treat it as a locked asset, never re-typeset it.
- `assets/logos/octopus-black.svg` / `octopus-white.svg` are a shorter wordmark cut (no trailing glyph) — the source repo used both interchangeably at different sizes.

## Caveats & open questions

- The site is effectively a single fully-built page (home); `about.html` and `collection.html` in the source repo are unstyled "Coming soon" placeholders — the About/Designer and Collection *content* used in this system's UI kit was reconstructed from the sections that already exist in the homepage (the designer feature and collection index both live on the homepage itself), not from separate pages.
- Product photography is referenced directly from the brand's live CDN (`cdn.prod.website-files.com`) since no local image assets were included in the repo — swap in real hosted assets before shipping anything from the UI kit.
- No component library or design tool (Figma) was attached — the 8 components here were reverse-engineered from one page's repeated markup patterns, not a documented source of truth. Flag anything that looks off against the real site.
- **Voice/visual mismatch**: the brand guidelines PDF describes a warm, colourful product line (Octopus Vermillion `#E83B0F`, Canvas Cream, Ceramic Blue, Instrument Serif + DM Sans, 3D-printed home organisers) that reads as a different chapter of this brand from the black-and-white minimalist furniture storefront the GitHub repo defines — possibly an earlier or sibling product line. Per the user's request this update only replaces the **Content fundamentals** (voice, tone, mission/vision/tagline copy) with the PDF's language; the Visual foundations, color tokens, type tokens, and components below are untouched and still reflect the storefront. If you want the palette/type system to follow the PDF too (Octopus Vermillion, Instrument Serif/DM Sans, warm cream surfaces), say so and we'll rebuild the visual layer to match.
