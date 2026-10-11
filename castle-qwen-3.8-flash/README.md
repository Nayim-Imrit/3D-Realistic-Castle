# Ironhold Keep

An interactive, production-ready 3D medieval castle viewer. Orbit, pan, and zoom a procedurally generated fortress under a twilight sky, fly the camera to cinematic viewpoints with smooth GSAP animations, or let the keep auto-rotate.

## Project Title & Short Description

**Ironhold Keep** is a single-page React application that renders a detailed procedural medieval castle in the browser using WebGL. It uses `@react-three/fiber` and `@react-three/drei` for declarative 3D rendering, GSAP for camera animations, and Tailwind CSS for a clean floating control overlay.

Generation model: `monkeycode-basic/qwen3.8-flash`

## Preview

![Ironhold Keep interactive demo](demo.gif)

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

- **Procedural castle:** main keep with a tall spire, four cylindrical corner towers with conical roofs, curtain walls, crenellated battlements, a twin-tower gatehouse, a drawbridge, a moat, and courtyard structures
- **PBR materials:** `MeshStandardMaterial` with tuned roughness and metalness for stone, timber, teal roof tiles, water, and gold accents
- **Dynamic lighting:** warm directional sun with real-time shadows, cool ambient and hemisphere fill, plus teal and violet accent point lights
- **OrbitControls:** left-drag rotate, scroll to zoom, right-drag to pan (mouse and touch supported)
- **Preset viewpoints** animated with GSAP: Front Gate, Bird's Eye, Courtyard, Tower View
- **Auto-rotate toggle** for a graceful continuous orbit
- **Animated banners** that ripple on a gentle sine wave

### Camera Controls

- Left-drag: orbit the keep
- Scroll / pinch: zoom in and out
- Right-drag / two-finger drag: pan
- Preset buttons: fly the camera to a specific vista
- Auto-Rotate: toggle continuous rotation

## Project Structure Breakdown

```text
castle-qwen-3.8-flash/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── main-qwen-3.8-flash.jsx
    ├── App-qwen-3.8-flash.jsx
    ├── index-qwen-3.8-flash.css
    ├── generated-by-qwen-3.8-flash.js
    ├── data/
    │   └── cameraPresets-qwen-3.8-flash.js
    └── components/
        ├── Scene-qwen-3.8-flash.jsx
        ├── Castle-qwen-3.8-flash.jsx
        ├── Lighting-qwen-3.8-flash.jsx
        ├── Controls-qwen-3.8-flash.jsx
        └── UIOverlay-qwen-3.8-flash.jsx
```

- `src/App-qwen-3.8-flash.jsx` — application shell, auto-rotate state, and camera preset selection
- `src/components/Scene-qwen-3.8-flash.jsx` — Canvas, sky, environment, fog, and scene composition
- `src/components/Castle-qwen-3.8-flash.jsx` — procedural keep, towers, walls, gatehouse, moat, and terrain
- `src/components/Lighting-qwen-3.8-flash.jsx` — sun, fill, ambient, and accent lights
- `src/components/Controls-qwen-3.8-flash.jsx` — OrbitControls plus GSAP camera transitions
- `src/components/UIOverlay-qwen-3.8-flash.jsx` — floating HUD for presets and auto-rotate
- `src/data/cameraPresets-qwen-3.8-flash.js` — named viewpoints and look-at targets
- `src/generated-by-qwen-3.8-flash.js` — generation model identifier
