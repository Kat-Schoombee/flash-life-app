# Flash Design System

A recreated, design-agent-friendly version of **Flash**'s in-house design system, extracted from the "Flash Design System.fig" file provided by the user.

## Context

**Flash** is a South African fintech / retail-tech platform. Its product lines include a consumer Flash app, the **1Voucher** digital voucher product, **Flash Plus** brand extensions, and a fleet of retailer-facing POS / trader tools. The user asked us to specifically build a system for **Locstat — a fraud-detection product designed by Flash**. Locstat itself does not appear as a standalone product area in the provided Figma file; we have assembled this system from the shared Flash foundations so Locstat surfaces can be mocked in the Flash house style.

> **Open question for the user:** we saw no Locstat-specific screens, logo, or color accents in the attached file. If you have Locstat design assets (screens, product logo, marketing site, etc.), please attach them — we'll fold them into a dedicated `ui_kits/locstat/` kit. Until then the Locstat UI kit in this repo mocks a plausible fraud-monitoring dashboard using Flash visual language.

### Sources

- **Figma:** "Flash Design System.fig" — mounted as a virtual filesystem during construction. 35 pages, 484 top-level frames.
  - `/Cover`, `/Typography`, `/Colour`, `/Flash-logos`, `/Iconography`, `/Button`, `/Text-input`, `/Cards-shadows`, `/Number-Radius-Spacing`, `/Alerts-errors`, `/Tables`, `/Navigation`, `/Flash-Plus-Brands`, `/Brands-categories`, `/Flash-devices`, etc.
- **Codebase:** none provided. If Locstat has a real codebase (React/Angular/etc.), re-run the import with it attached for higher fidelity.

## Index

```
/
├── README.md                      — this file
├── SKILL.md                       — agent skill definition (portable)
├── colors_and_type.css            — CSS tokens (primitives + semantics)
├── assets/
│   └── logos/                     — Flash wordmarks, bolt marks (black/white/green)
├── fonts/                         — (self-hosted font files when added)
├── preview/                       — Design-System-tab cards
└── ui_kits/
    └── locstat/                   — Fraud-detection mock using Flash language
```

---

## Content fundamentals

**Voice.** Flash writes in plain, confident South African business English. Sentences are short and practical — no marketing purple prose, no startup-bro tone.

- **Address:** "you" / "your" for the reader; "we" for Flash. Never "I".
- **Casing:** Sentence case for everything — buttons, headings, toasts, menu items ("Add new user", not "Add New User"). Titles of products keep their formal casing ("Flash Plus", "1Voucher").
- **Tone:** Direct, action-oriented. "Send airtime", "Top up now", "View report" — verbs over nouns on CTAs.
- **Currency / numerals:** South African Rand (R) with a space before the amount for large numbers (R 1 500). Figma uses a "Rand" monochrome icon for currency fields.
- **Emoji:** Not used. No product surfaces in the Figma use emoji. Iconography is monochrome SVG.
- **Numbers / stats:** Avoided as decoration. When present they're operational (balances, transaction counts, dates).
- **Example phrases (from the file):**
  - "Primary font family · For use across apps and as primary typeface"
  - "Text style semantic tokens are composed of multiple typographic properties…"
  - Category labels like "Airtime & data", "Bill payments", "Vouchers", "Lotto".
- **Do / don't:**
  - ✅ "Send R 50 airtime" · ✅ "Report suspected fraud"
  - ❌ "🚀 Let's go!" · ❌ "Supercharge your payments"

---

## Visual foundations

### Logo
- **The wordmark never stands alone.** "flash" is locked to the cow mark — they always travel together. Never use a `flash-wordmark-*` on its own; always use a cow lockup.
- **Match the asset to the background** (the cow disc is green, so it vanishes on green):
  - Dark / green surface → `assets/logos/flash-cow-h-white-text.svg`
  - Light surface → `flash-cow-h-black-text.svg` (colour) or `flash-cow-h-mono.svg` (all-black)
  - Width-constrained → vertical lockups `flash-cow-v-*`
- **Single brand glyph** (badge / watermark / accent) → the real `flash-cow-mark.svg` cow only; never hand-draw or invent an animal silhouette. Recolour via `fill` / `currentColor` only.

### Colors
- **Anchor palette:** black `#000` and white do almost all of the work. Electric **Flash green** `#1DFA0F` is used **very rarely** — an occasional small highlight, never a button and never a large fill.
- **On green surfaces, all text is bright white** `#FFFFFF` — never grey or reduced opacity. Carry hierarchy with weight and size instead (see `--color-fg-on-brand`).
- **On light surfaces** use **Mid green** `#10C504` for accents/text — Flash green `#1DFA0F` has insufficient contrast on white.
- **Supporting greens:** **Forest green** `#003F1E` for dark surfaces/canvases; **Medium green** `#3FB549` as a softer/hover tint.
- **Neutrals:** black, white, and **Light grey** `#F0F0F0`; the warm-grey scale carries dividers and body text.
- **No bolt accent.** The previous yellow-green "bolt" (`#B2FA00`) is retired as a brand accent — the electric Flash green is now the one accent. (`#B2FA00` survives only inside the supporting yellow-green scale for lotto.)
- **Support:** critical red `#D80027`, warning orange `#FAA225` / `#FF9900`, info cyan `#0995D6`, success green `#19A70D`.
- **Partner accent:** 1Voucher orange `#FF5F00` appears on voucher surfaces only.
- **Dark mode exists** — sections use `#003F1E` (forest) with `rgba(255,255,255,0.1)` hairline borders; the call-to-action on dark is a **white** button (not green). Keep all text bright white on green.

### Type
- **Primary:** **Satoshi Variable** (Fontshare). The workhorse — all UI, body copy, labels, form elements and headings.
- **Weights in use:** 500 medium, 650 semibold, 800 bold, 900 black. Regular (400) only for very long-form body.
- **Display:** **Kilimanjaro Sans** (self-hosted OTF in `/fonts/`). DISPLAY ONLY — short, loud, uppercase marketing headlines. Single weight (400); never faux-bolded (`font-synthesis: none`), never body copy or UI labels. Replaces the old Gilroy/Plus Jakarta substitution.
- **Mono:** Roboto Mono for codes, transaction IDs.
- **Display treatment:** hero headlines set in Kilimanjaro, uppercase, tight tracking.

### Spacing & radii
- Spacing scale is **8px-based**: 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80 px.
- Radii: 4, 8 (inputs), 12 (cards-small), 20, **30 (cards — signature)**, 32 (panels), 999 (pill buttons, chips).
- Section frames use **80px radius** on dark canvases — a signature move.

### Backgrounds, texture, imagery
- **Backgrounds** are flat — solid green, solid black, solid white, solid dark-grey. No gradients in core UI.
- **Hero treatments:** large full-bleed product photos (phones, retail POS hardware). Partner category panels (airtime / vouchers) use full-bleed brand imagery behind dark overlays.
- **Illustrations:** Flash uses simple vector mark + wordmark lockups as the primary "illustration". No hand-drawn or whimsical illustration style.
- **Grain / noise:** none.

### Cards
- Default card: **white fill, 20px radius**, hairline border `#E6E6E6` or `#EDEDED`, light `shadow-1` (two-layer, very soft).
- Elevated card: same but `shadow-2`.
- Dark card: `#0E3A1E` or `#333338` fill, no border, white text, 20–40px radius.
- Product-category cards (Brand categories): full-bleed colored fill with centered wordmark + partner logos.

### Buttons
- **Primary (the default CTA):** solid **black** fill / white text on light surfaces; **inverts to white** fill / black text on dark surfaces. Pill (999) or 12px radius. Icon trailing.
- **Accent:** spark-green `#1DFA0F` fill, black text — **used very rarely.** Green is not a routine CTA colour; reserve it for exceptional brand moments only.
- **Secondary:** white fill, 2px black border, black text.
- **Ghost / tertiary:** no fill, black text, light grey hover `#F8F8F8`.
- **Disabled:** grey-300 fill, grey-500 text.
- **Destructive:** red fill `#D80027`, white text.
- Icon-only buttons are circular (pill) with 44px hit target minimum.

### Borders & dividers
- Hairlines: `#EDEDED` / `#E6E6E6` at 1px.
- Stronger: `#DDDDDD` at 1px.
- Inputs: `#DDDDDD` default, `#0C8B43` focus, `#D80027` error.
- The Figma uses **dashed purple `#9747FF`** borders as annotation — this is documentation only, never ship it.

### Animation & motion
- No motion tokens defined in the file. Default to 150–200ms transitions with `cubic-bezier(0.2, 0.8, 0.2, 1)` (Flash feels brisk, not bouncy). Fade + subtle translate, no elastic.
- Press state: 2–3% scale-down, no rebound.

### States
- **Hover:** darken primary surfaces by one grey step; tertiary gets a `#F8F8F8` background.
- **Press:** use next-darker token (`--flash-grey-950` on primary black button).
- **Focus:** 2px solid mid-green `#10C504` ring, 2px offset.
- **Disabled:** reduce fg to grey-400, bg to grey-300.

### Shadows
- Two to three levels (`shadow-1` / `shadow-2` / `shadow-3`). All soft, cool-neutral; no hard shadows. Inset shadow available for pressed inputs.

### Transparency & blur
- Used sparingly: `rgba(255,255,255,0.1)` hairlines over dark canvas; `rgba(0,0,0,0.4)` overlays on partner hero images so white text reads. No frosted/backdrop blur detected.

### Imagery palette
- Warm-neutral backdrops on product photography; mix of hard studio lighting on devices and natural/candid on retail scenes. Sits comfortably next to the green palette.

---

## Iconography

**Style:** monochrome, geometric, stroke-first (line icons). Flash's Figma ships a local icon set under `/Iconography/Monochrome-icons/Icons`. Common icons include: eye / eye-off, phonebook, search, cross, tick, calendar, Rand (currency), arrow-forward / arrow-down. Icons live as 24×24 SVGs and are re-coloured via `fill: currentColor`.

**Sizes in use:** 16, 24 (default), 32, 40, 48, 64, 80 px. Keep stroke weight consistent at icon scale.

**Font Awesome** weights (Pro / Sharp / Free / Duotone / Brands) also show up in the file — Flash uses FA as a fallback/utility set for long-tail icons not in the custom set. If recreating a surface and the custom icon doesn't exist, reach for Font Awesome with matching weight (Regular for default, Solid for filled states).

**Emoji / unicode:** not used as icons. Ever.

**This project:** we copied the Flash logos and a handful of monochrome SVGs into `/assets/logos/` and `/assets/icons/`. For generic UI icons (settings, bell, etc.) we use **Lucide** via CDN (`https://unpkg.com/lucide@latest`) — its line weight and corner style closely match the Flash custom set. Flagging the substitution.

---

## Fonts — substitutions flagged

| Used | Source | Notes |
|---|---|---|
| **Satoshi** | Self-hosted OTF in `/fonts/` (brand-supplied) | Direct match. Weights 300, 400, 500, 700, 900 + italics. |
| **Gilroy** | Proprietary (Radomir Tinkov) | **Substituted** with Plus Jakarta Sans (Google Fonts). Drop real `.woff2` into `/fonts/gilroy/` and swap the `@import` in `colors_and_type.css` if you have a licence. |
| **Graphik Wide** | Proprietary (Commercial Type) | Only appears on a small number of dated frames; not wired into tokens. Substitute with Plus Jakarta Sans 800. |

---

## UI kits

- `ui_kits/locstat/` — a fraud-monitoring dashboard mock using Flash visual language. Contains a login view, alerts inbox, a case detail screen, and a transactions table.

Open each kit's `index.html` for an interactive click-through.

---

## Caveats

1. **No Locstat-specific assets were attached.** The Locstat UI kit is a plausible reconstruction from Flash system primitives, not from Locstat source.
2. **Proprietary font substitutions** (Gilroy, Graphik Wide). Product UI uses Satoshi only, so impact is small.
3. **Icon set** partial — custom Flash icons copied where immediately useful; Lucide fills the long tail.
4. **1Voucher / Flash Plus brand kits** are out of scope; the color tokens for them are defined if you need to extend.
