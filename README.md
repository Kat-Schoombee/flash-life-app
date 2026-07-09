# Flash Life — React app

A pixel-faithful React implementation of the **Flash Life** employee app, ported from the
Claude Design HTML/CSS/JS prototype (`flash-life-app-design`).

## Run

```bash
cd flash-life-app
npm install          # if the global npm cache errors, add: --cache ./.npmcache
npm run dev          # dev server at http://localhost:5173
npm run build        # production build to dist/
```

## How it's structured

- **`src/FlashApp.jsx`** — the app's brain. The prototype's DSL logic class (state, data,
  handlers, and the `renderVals()` view-model) is reused near-verbatim as a React class
  component, plus the device shell: status bar, screen router, global sheets (month points,
  Flash Club info), toast, the auth/splash overlay, bottom nav, and on-screen keyboard.
- **`src/screens/`** — one component per screen (`Home`, `Club`, `Lunch`, `Category`, …).
  Each is `function Screen({ v })` where `v = { ...props, ...renderVals() }` — a single flat
  view-model, matching the prototype's template scope.
- **`src/lib/`**
  - `css.js` — parses the prototype's inline CSS strings into React style objects (`` css`…` ``),
    which is how the styles are reproduced verbatim.
  - `Sprite.jsx` — the SVG icon symbol sprite (`<use href="#ic-…">`).
  - `ImageSlot.jsx` — placeholder tile standing in for the prototype's `<image-slot>`.
  - `WheelDatePicker.jsx` — the iOS-style wheel date picker (ported from `WheelDatePicker.dc.html`).
- **`public/_ds/`** — the Flash Design System: tokens (`colors_and_type.css`), Satoshi +
  Kilimanjaro fonts. `public/assets/` — logos, category icons, splash Lottie.

## Notes / substitutions

- **Images**: `<image-slot>` renders neutral placeholder tiles — no photography ships in the bundle.
- **Leave-tracker scenario**: `main.jsx` renders `<FlashApp leaveState="1" />`. Values `"1"`–`"4"`
  switch the Flash Club leave/grace-month scenario (on-track / grace-used / new-starter / streak-broken).
- The prototype's "not shipped" dev index and comments-review panels were intentionally omitted.
