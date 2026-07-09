# Sonocea design system (code)

## Where things live

| Path | Purpose |
|------|---------|
| `tokens/colors.js` | **Canonical** base palette + semantic aliases. Single source for colour. |
| `tokens/spacing.js` | Spacing scale, section rhythm, safe-area notes, density multipliers by mode. |
| `tokens/typography.js` | Font stack, type roles, `typeClasses` for Tailwind. |
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
