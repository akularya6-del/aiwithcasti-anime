<div align="center">

# aiwithcasti-anime

**Anime-themed 3D landing page with real-time camera tracking, WebGL shaders, and cinematic scroll animations.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-r168-white?style=flat-square&logo=three.js&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-GLSL-990000?style=flat-square)

</div>

---

## Overview

A cinematic marketing landing page built with a full 3D WebGL pipeline. MediaPipe reads your webcam in real-time and maps head movement to the Three.js scene — the 3D model tracks you as you move. Custom GLSL fragment shaders give the scene an iridescent, anime-style glow.

Five scroll-locked sections (Hero, RealStack, ColorMotion, AIShortcuts, Performance) each snap to scroll progress and animate independently.

## Features

- **Live camera tracking** — MediaPipe FaceMesh drives the 3D scene with your head position
- **Custom WebGL shaders** — GLSL vertex + fragment shaders for anime-style lighting and iridescence
- **Three.js 3D scene** — Orbital controls, post-processing effects, and React Three Fiber integration
- **Scroll-synced animations** — Five sections lock to scroll progress with `@react-spring/three`
- **Cinematic preloader** — Staged asset loading sequence before the first frame renders
- **Zustand state** — Lightweight global store for loader and scene state

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 App Router |
| 3D Engine | Three.js + React Three Fiber |
| Shaders | Custom GLSL |
| Camera AI | MediaPipe FaceMesh |
| Animation | @react-spring/three, camera-controls |
| Styling | Tailwind CSS |
| State | Zustand |

## Getting Started

```bash
git clone https://github.com/akularya6-del/aiwithcasti-anime
cd aiwithcasti-anime
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and allow camera access for the full experience.

## Project Structure

```
src/
├── app/               # Next.js App Router pages
├── components/
│   ├── three/         # Three.js scene, meshes, shaders
│   ├── sections/      # Hero, RealStack, ColorMotion, AIShortcuts, Performance
│   ├── loader/        # Staged preloader
│   └── ui/            # Shared UI primitives
├── shaders/           # GLSL vertex and fragment files
├── stores/            # Zustand global state
└── lib/               # Utility functions
public/
├── frames/            # Image sequence frames
├── models/            # 3D model files
└── textures/          # Material textures
```

- nextjs
- threejs
- webgl
- mediapipe
- typescript
- tailwindcss
- animation

## Getting Started

Clone the repo and follow the setup instructions in the code.
