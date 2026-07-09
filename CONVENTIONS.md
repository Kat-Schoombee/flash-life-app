# DSL → React port conventions (screens)

Source of truth: `/Users/katerinaschoombee/Downloads/flash-life-app-design 2/project/Flash Life App (Primary File).dc.html`

Each screen becomes a React function component in `src/screens/<Name>.jsx`:

```jsx
import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';        // only if the screen uses <image-slot>
import WheelDatePicker from '../lib/WheelDatePicker.jsx'; // only Category uses this

export function Home({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      ...
    </div>
  );
}
```

Port **only the content inside** the screen's top-level `<sc-if value="{{ isX }}">…</sc-if>` (the shell already gates rendering). The component returns that inner markup. If there is more than one root element, wrap them in a `<>…</>` fragment.

## Transform rules (apply mechanically)

1. **Text interpolation** `{{ token }}` in element text → `{v.token}`.
   - Inside a `sc-for` loop, the loop variable is LOCAL: `{{ b.name }}` → `{b.name}` (NOT `v.b.name`).

2. **Inline styles**: `style="a:b;c:{{ x }}"` → `` style={css`a:b;c:${v.x}`} ``.
   - Loop-local: `` style={css`background:${b.tint}`} ``.
   - A plain static style still uses css: `` style={css`padding:18px;`} ``.

3. **Conditionals**: `<sc-if value="{{ cond }}">BODY</sc-if>` → `{v.cond && (<>BODY</>)}`.
   - Loop-local condition `<sc-if value="{{ b.you }}">` → `{b.you && (<>…</>)}`.

4. **Loops**: `<sc-if>`-free `<sc-for list="{{ arr }}" as="item">CHILD</sc-for>` →
   `{v.arr.map((item, i) => (<CHILD_with key={i} />))}`. Put `key={i}` on the child's root element.
   - Nested loops: inner `as` var is local too; use a different index name (`j`).

5. **Handlers**: `onClick="{{ fn }}"` → `onClick={v.fn}` for a bare top-level name;
   `onClick="{{ b.open }}"` → `onClick={b.open}` for a loop-local one. Same for `onScroll`, etc.

6. **Icons (svg sprite)**: keep the svg, self-close `<use>`:
   `<svg width="20" height="20"><use href="#ic-back"></use></svg>`
   → `<svg width="20" height="20"><use href="#ic-back" /></svg>`.
   - Dynamic: `href="{{ n.icon }}"` → `href={n.icon}`. `href="#{{ o.markIcon }}"` → `href={'#' + o.markIcon}`.
   - An svg with `style="color:{{ x }}"` → `` style={css`color:${x}`} ``.

7. **image-slot** → `ImageSlot`: `<image-slot id="{{ n.slotId }}" style="W" shape="rounded" radius="16" placeholder="Image"></image-slot>`
   → `` <ImageSlot id={n.slotId} style={`W`} shape="rounded" radius={16} placeholder="Image" /> `` (style passed as a template string; ImageSlot parses it). `class="fl-avatar-mini"` → `className="fl-avatar-mini"`.

8. **WheelDatePicker** (Category only): `<dc-import name="WheelDatePicker" open="{{ mvDateOpen }}" value="{{ mvDateValue }}" min-year="{{ mvMinYear }}" max-year="{{ mvMaxYear }}" on-pick="{{ onMvDatePick }}" on-close="{{ closeMvDate }}" on-cancel="{{ cancelMvDate }}"></dc-import>`
   → `<WheelDatePicker open={v.mvDateOpen} value={v.mvDateValue} minYear={v.mvMinYear} maxYear={v.mvMaxYear} onPick={v.onMvDatePick} onClose={v.closeMvDate} onCancel={v.cancelMvDate} />`.

9. **Attributes**: `class` → `className`; `maxlength` → `maxLength`; `inputmode` → `inputMode`; `autofocus` → `autoFocus`; `for` → `htmlFor`. Void/self-close `<input …/>`, `<img …/>`, `<br/>`, `<textarea …></textarea>` (textarea keeps children empty).

10. **Text inputs / textareas**: `<input value="{{ x }}" onInput="{{ fn }}" …>` → `<input value={v.x} onChange={fn} … />`.
    `<textarea value="{{ x }}" onInput="{{ fn }}" onChange="{{ fn }}" …></textarea>` → `<textarea value={v.x} onChange={fn} … />` (use onChange; drop onInput). Keep `placeholder`, `type`, `maxLength`, `inputMode`.
    - Dynamic `type="{{ pwInputType }}"` → `type={v.pwInputType}`.

11. **Keep all `data-*` attributes** (some are queried by the animation engine): `data-club-card="v1"`,
    `data-reward-cow="1"`, `data-herd-idx="{{ mg.idx }}"` → `data-herd-idx={mg.idx}`. Drop only `data-comment-anchor`, `data-om-label`, and any `hint-placeholder-*` / `style-hover` / `style-active` / `aria-label` attrs are fine to keep (`aria-label` stays).

12. **HTML comments** `<!-- … -->` → delete (or `{/* … */}`).

13. **HTML entities** in text (`&amp;`, `&gt;`, `&#39;`, `&rsquo;` etc.) may stay verbatim in JSX text — JSX decodes them.

## Notes
- Do NOT import or reference `v` fields that don't appear in the markup — just map what's there.
- Preserve every style declaration and value EXACTLY (pixel-perfect). Do not "tidy" values.
- The component must be valid JSX (balanced tags, one expression per `{…}`).
