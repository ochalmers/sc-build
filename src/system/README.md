# Sonocea design system (code)

## Where things live

| Path | Purpose |
|------|---------|
| `tokens/colors.js` | **Canonical** base palette + semantic aliases. Single source for colour. |
| `tokens/spacing.js` | Spacing scale, section rhythm, safe-area notes, density multipliers by mode. |
| `tokens/typography.js` | Font stack, type roles, `typeClasses` / `appTypeClasses` for Tailwind. |
| `tokens/appLayout.js` | App frame geometry from Figma GTM Home — spacing, radii, component sizes (no colour). |
| `tokens/motion.js` | Motion principles, durations, easing — secondary to sound. |
| `modes.js` | `behaviourModeMeta` (sliders + transforms) + `modeReference` (documentation copy). |
| `components/` | Reusable UI primitives (`SystemButton`, `SystemCard`, …). Use inside `ModeChrome` or apply `resolvePalette` CSS vars. |

The interactive prototype imports **`behaviourModeMeta`** from here and resolves colour via **`../utils/resolvePalette.js`**.

## Behavioural modes

- **Care / Regulation / Performance** are **not** separate themes.
- They share **`basePalette`** and differ through **transforms + sliders** (contrast, density, intensity).
- Defaults per mode: `behaviourModeMeta[mode].defaultSliders`.
- Extended narrative for docs: `modeReference` in `modes.js`.

## Reuse

- **App / prototype:** import components from `system/components` or continue using page-level markup with `resolvePalette`.
- **Brand / deck / microsite:** use tokens as reference; export SVG from `public/assets/system/`.
- **New assets:** place under `public/assets/system/<category>/` (see that folder’s README).

## Route

The design system reference page lives at **`/design-system`** (`src/pages/DesignSystemPage.jsx`). `/system` redirects there.

## Figma reference

Structural styles (layout, type scale, radii, blur, component geometry) are sourced from **[Sonocea App — GTM, Home](https://www.figma.com/design/lmo2RrohjwEiyyZj7SEGHM/Sonocea-App--GTM-?node-id=1-54800)** (node `1:54800`). Colour and imagery are intentionally excluded from tokens — bind via `resolvePalette` / CSS vars.

- Tokens: `tokens/appLayout.js`, `appTypeClasses` in `tokens/typography.js`
- Components: `SystemTag`, `SystemTabBar`, `SystemNavbar`, `SystemSessionCard`, `SystemPlayControl`, `SystemAppSectionHeader`
- Layout reference: `screens/HomeScreenReference.jsx`
