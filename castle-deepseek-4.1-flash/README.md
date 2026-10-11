# Dragonstone Bastion

An interactive, production-ready 3D medieval castle viewer. Orbit, pan, and zoom a procedurally generated fortress, fly the camera to cinematic viewpoints with smooth GSAP animations, or let the castle auto-rotate.

## Project Title & Short Description

**Dragonstone Bastion** is a single-page React application that renders a detailed procedural medieval castle in the browser using WebGL. It uses `@react-three/fiber` and `@react-three/drei` for declarative 3D rendering, GSAP for camera animations, and Tailwind CSS for a clean floating control overlay.

Generation model: `monkeycode-pro/deepseek-4.1-flash`

## Preview

![Dragonstone Bastion interactive demo](demo.gif)

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
- **PBR materials:** `MeshStandardMaterial` with tuned roughness and metalness for basalt stone, timber, terracotta roofs, water, and gold accents
- **Dynamic lighting:** warm directional sun with real-time shadows, soft ambient and hemisphere fill, and ember-toned accent point lights
- **OrbitControls:** left-drag rotate, scroll to zoom, right-drag to pan (mouse and touch supported)
- **Preset viewpoints** animated with GSAP: Front Gate, Bird's Eye, Courtyard, Tower View
- **Auto-rotate toggle** for a graceful continuous orbit
- **Animated banners** that ripple on a gentle sine wave

### Camera Controls

- Left-drag: orbit the bastion
- Scroll / pinch: zoom in and out
- Right-drag / two-finger drag: pan
- Preset buttons: fly the camera to a specific vista
- Auto-Rotate: toggle continuous rotation

## Project Structure Breakdown

```text
castle-deepseek-4.1-flash/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── main-deepseek-4.1-flash.jsx
    ├── App-deepseek-4.1-flash.jsx
    ├── index-deepseek-4.1-flash.css
    ├── generated-by-deepseek-4.1-flash.js
    ├── data/
    │   └── cameraPresets-deepseek-4.1-flash.js
    └── components/
        ├── Scene-deepseek-4.1-flash.jsx
        ├── Castle-deepseek-4.1-flash.jsx
        ├── Lighting-deepseek-4.1-flash.jsx
        ├── Controls-deepseek-4.1-flash.jsx
        └── UIOverlay-deepseek-4.1-flash.jsx
```

- `src/App-deepseek-4.1-flash.jsx` — application shell, auto-rotate state, and camera preset selection
- `src/components/Scene-deepseek-4.1-flash.jsx` — Canvas, sky, environment, fog, and scene composition
- `src/components/Castle-deepseek-4.1-flash.jsx` — procedural keep, towers, walls, gatehouse, moat, and terrain
- `src/components/Lighting-deepseek-4.1-flash.jsx` — sun, fill, ambient, and accent lights
- `src/components/Controls-deepseek-4.1-flash.jsx` — OrbitControls plus GSAP camera transitions
- `src/components/UIOverlay-deepseek-4.1-flash.jsx` — floating HUD for presets and auto-rotate
- `src/data/cameraPresets-deepseek-4.1-flash.js` — named viewpoints and look-at targets
- `src/generated-by-deepseek-4.1-flash.js` — generation model identifier
