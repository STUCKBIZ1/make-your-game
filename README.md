<div align="center">

# 👾 Space Invaders: Zero-Canvas DOM Engine
  
*A highly optimized, 60 FPS, vanilla JavaScript game engine built entirely from scratch using pure DOM manipulation.*

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
</div>

<br />

## 🌠 The Vision

The goal of this project is to build a high-performance **Space Invaders** clone without relying on `<canvas>`, WebGL, or any external libraries. By mastering `requestAnimationFrame`, delta-time calculations, and hardware-accelerated CSS transforms, we achieve a butter-smooth **60 FPS** experience using only standard DOM nodes.

---

## 🏗️ System Architecture

To ensure parallel development and zero merge conflicts, the codebase is strictly separated into three domains: **The Core Engine**, **The Game Logic**, and **The UI & Rendering**.

<div align="center">
  <img src="assets/split_tasks.png" alt="Task Split Architecture" width="100%" />
</div>

<br />

| Domain | ⚙️ Dev 1: Core Engine | 👾 Dev 2: Game Logic | 🎨 Dev 3: UI & Rendering |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Loop Performance, Math, and Physics | Entities, Wave Spawning, and Rules | Visuals, DOM Rendering, and Menus |
| **Responsibilities** | Implements `rAF` loop & Delta-Time | Updates internal state of game objects | Updates DOM transforms based on state |
| **Input Handling** | Tracks exact key states continuously | Triggers bullet spawning & movement | Manages Start/Pause menus & UI clicks |
| **Collision System** | AABB Collision detection math | Defines win/lose logic upon collision | Triggers visual effects & DOM updates |
| **Specific Files** | `loop.js`, `input.js`, `physics.js` | `logic.js`, `entities.js` | `renderer.js`, `ui.js`, `state.js` |

---

## 🚀 Key Features & Constraints

- ⚡ **Strict 60 FPS Engine**: Built to avoid Layout Thrashing and Repaint bottlenecks.
- 🎯 **Delta-Time Consistency**: Game speed remains identical regardless of monitor refresh rates.
- 🎨 **Minimal Layer Strategy**: Restricting z-indexes and stacking contexts for peak DOM performance.
- ⌨️ **Flawless Input**: Continuous keyboard polling bypasses OS-level key-repeat delays.
