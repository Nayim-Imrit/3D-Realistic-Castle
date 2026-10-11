# Stormwatch Citadel

An interactive, production-ready 3D medieval castle viewer. Orbit, pan, and zoom a procedurally generated fortress, jump to cinematic camera angles with smooth animated fly-throughs, or let the citadel auto-rotate.

## Project Title & Short Description

**Stormwatch Citadel** is a single-page React application that renders a detailed procedural medieval castle in the browser using WebGL. It combines `@react-three/fiber` and `@react-three/drei` for declarative 3D rendering, GSAP for camera animation, and Tailwind CSS for a clean floating control overlay.

Generation model: `monkeycode-pro/glm-5.2`

## Preview

![Stormwatch Citadel interactive demo](demo.gif)

## Tech Stack Used

- React 19
- Vite 8
- Tailwind CSS 4
- Three.js
- @react-three/fiber
- @react-three/drei (OrbitControls, Sky, Environment, ContactShadows)
- GSAP (camera preset animation)

## Prerequisites & Installation Instructions

- Node.js 18 or newer
- npm 10 or newer

Install dependencies:

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Features & Controls Overview

- **Procedural castle:** main keep with spire, four cylindrical corner towers with conical roofs, curtain walls, crenellated battlements, a twin-tower gatehouse, a drawbridge, a moat, and courtyard structures
- **PBR materials:** `MeshStandardMaterial` with tuned roughness and metalness for stone, timber, roof tile, water, and gold accents
- **Dynamic lighting:** warm directional sun with real-time shadows, soft ambient and hemisphere fill, plus warm accent point lights
- **OrbitControls:** left-drag rotate, scroll to zoom, right-drag to pan (mouse and touch supported)
- **Preset viewpoints** animated with GSAP: Front Gate, Bird's Eye, Courtyard, Tower View
- **Auto-rotate toggle** for a graceful continuous orbit
- **Animated banners** that ripple on a gentle sine wave

### Camera Controls

- Left-drag: orbit the citadel
- Scroll / pinch: zoom in and out
- Right-drag / two-finger drag: pan
- Preset buttons: fly the camera to a specific vista
- Auto-Rotate: toggle continuous rotation

## Project Structure Breakdown

```text
castle-glm-5.2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── main-glm-5.2.jsx
    ├── App-glm-5.2.jsx
    ├── index-glm-5.2.css
    ├── generated-by-glm-5.2.js
    ├── data/
    │   └── cameraPresets-glm-5.2.js
    └── components/
        ├── Scene-glm-5.2.jsx
        ├── Castle-glm-5.2.jsx
        ├── Lighting-glm-5.2.jsx
        ├── Controls-glm-5.2.jsx
        └── UIOverlay-glm-5.2.jsx
```

- `src/App-glm-5.2.jsx` — application shell, auto-rotate state, and camera preset selection
- `src/components/Scene-glm-5.2.jsx` — Canvas, sky, environment, fog, and scene composition
- `src/components/Castle-glm-5.2.jsx` — procedural keep, towers, walls, gatehouse, moat, and terrain
- `src/components/Lighting-glm-5.2.jsx` — sun, fill, ambient, and accent lights
- `src/components/Controls-glm-5.2.jsx` — OrbitControls plus GSAP camera transitions
- `src/components/UIOverlay-glm-5.2.jsx` — floating HUD for presets and auto-rotate
- `src/data/cameraPresets-glm-5.2.js` — named viewpoints and look-at targets
- `src/generated-by-glm-5.2.js` — generation model identifier
