# Figma handoff (static copy)

There is **no API push** from this repo into Figma. This folder is a **portable visual copy** you bring into Figma yourself in a few seconds.

## Frame 121:11214 · Design Phase 2

Figma file: [Sonocea Design Phase 2](https://www.figma.com/design/BXizyHR65rR5o9x5ziW7kp/Sonocea-Design-Phase-2?node-id=121-11214) · **Frame 1486** is **3731 × 5082** (empty in Dev Mode).

1. Open **`frame-121-11214-board.html`** in Chrome at **100% zoom**.
2. Screenshot the board (exact pixel size is set on `.board`) or print to PDF.
3. In Figma: select that frame → **Place image** or paste; scale to **100%** so it fills the frame, or trace into native components.

## Quick path (compact handoff)

1. Open **`handoff.html`** in Chrome or Safari (double-click or drag onto the browser).
2. **Screenshot** the page (full window or sections), or use **File → Print → Save as PDF** for vector-ish text.
3. In Figma: **Place image / Paste** (`⌘V`) the screenshot or PDF page onto your canvas.
4. Optionally break apart or trace into components and variables.

## Alternative

- Drag **`palette-reference.svg`** from `public/assets/system/` into Figma for the colour strip alone.
- Keep the live app as reference: run `npm run dev` and capture `/design-system`.

## What’s inside `handoff.html`

- One-page snapshot: title, core principles, **base palette** swatches with hex, **Care / Regulation / Performance** summary, typography samples, spacing scale.

All colours match `src/system/tokens/colors.js` at export time.
