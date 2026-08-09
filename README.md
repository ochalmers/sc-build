# Sonocea System Prototype

Internal workspace: **one** brand and product system that adapts through contrast, density, and intensity - not separate themes or apps.

## Routes

Production hosts **dated builds** side by side so reviewers can keep the commented July board and open the newer prototype without overwriting it:

| Path | Content |
|------|---------|
| `/` | Version switcher (pick a dated build). |
| `/v/2026-07-29/` | Previous production snapshot — shared comments stay here. |
| `/v/2026-08-09/` | Latest prototype from this repo. |
| `/app/*` | Redirects to the July build so existing comment links keep working. |

Local `npm run dev` still serves the current tree at `/`.

## Design system (reusable)

Canonical tokens and components live under **`src/system/`**. See **`src/system/README.md`** for a full map.

- **Colours:** `src/system/tokens/colors.js` (re-exported from `src/config/basePalette.js` for older imports).
- **Modes:** `src/system/modes.js` - Care / Regulation / Performance (transforms + documentation copy).
- **Components:** `src/system/components/` - buttons, cards, inputs, waveform module, etc. Use with `ModeChrome` or `resolvePalette()` CSS variables.
- **Exportable assets:** `public/assets/system/` - palette strip, waveform SVG, folder structure for imagery and icons.

## Behavioural modes

Modes are defined in **`src/system/modes.js`**. Each has:

- A short definition (e.g. Care → reduce cognitive load).
- **Default sliders** for contrast, density, and intensity (0–1). Changing mode in the prototype resets sliders until you adjust manually.

Transforms in **`src/utils/resolvePalette.js`** blend the **base palette** with mode-specific softening/sharpening so the UI stays one system.

## Where to edit (prototype)

| What | File |
|------|------|
| Base colours | `src/system/tokens/colors.js` |
| Mode labels, defaults, transform bias | `src/system/modes.js` |
| Personas and adoption labels | `src/config/personas.js` |
| Scenarios, copy, persona/mode mapping, rationale | `src/config/stories.js` |
| How sliders + mode resolve to CSS variables and motion | `src/utils/resolvePalette.js` |
| Global state (mode, persona, story, sliders) | `src/context/PrototypeContext.jsx` |

Selecting a **user story** sets persona, behaviour mode, and sliders from `sliderHint` in the story object. Changing **behaviour mode** or **persona** from the controls clears the active story so the scenario list and manual tuning stay in sync.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Stack: React (Vite), React Router, Tailwind CSS, Framer Motion.
