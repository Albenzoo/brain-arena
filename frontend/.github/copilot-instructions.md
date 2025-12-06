# Frontend AI Coding Agent Guidelines

## Project Overview

This is a TypeScript/Vite frontend for a cultural quiz game in Augmented Reality (WebXR) using Three.js. The app overlays quiz questions in the real world, with game logic inspired by "Who Wants to Be a Millionaire" (one error ends the session).

## Architecture & Major Components

- **Entry Point:** `src/main.ts` initializes the app, sets up the main Three.js scene, and starts the animation loop.
- **Scene Management:** `src/scenes/MainScene.ts` encapsulates all 3D/AR logic, including camera, renderer, controller setup, and event handling. All AR input (controller) logic is managed here.
- **Quiz Logic:** `src/services/QuizService.ts` provides quiz data management (loading, randomization, etc.).
- **Data Models:** `src/models/Question.ts` defines the quiz question structure.
- **Utilities:** `src/utils/index.ts` for generic helpers (e.g., clamp).
- **UI Components:** Place reusable UI overlays in `src/components/` (not yet present).
- **Styles:** CSS lives in `src/styles/` and `src/style.css`.

## Data Flow & Integration

- The frontend expects to communicate with a RESTful backend (not present here) for quiz/session management.
- All Three.js/AR logic is encapsulated in scene classes; main.ts only orchestrates initialization.
- QuizService is designed for future API integration; currently, it uses local data.

## Developer Workflow

- **Start Dev Server:** `npm run dev` (see README.md)
- **Build:** `npm run build` (TypeScript + Vite)
- **Preview:** `npm run preview`
- **Type Checking:** Strict mode enforced via `tsconfig.json` (`strict: true`)
- **Testing:** Place tests in `tests/` (no framework present yet)

## Project-Specific Conventions

- Use TypeScript interfaces for all data models (see `Question.ts`).
- Avoid `any` type; prefer explicit types or `unknown`.
- Scene classes encapsulate all 3D/AR logic, including event listeners and controller setup.
- UI logic and AR logic are kept separate; add overlays/components in `src/components/`.
- Use utility functions for math/helpers in `src/utils/`.
- Always check DOM elements before use (see main.ts for container check).

## External Dependencies

- **Three.js** for 3D/AR rendering
- **@types/three** for type safety
- **Vite** for dev/build tooling

## Example Patterns

- **Scene Initialization:**
  ```ts
  import { MainScene } from "./scenes/MainScene";
  const mainScene = new MainScene(container, animate);
  ```
- **QuizService Usage:**
  ```ts
  import { QuizService } from "../services/QuizService";
  const quizService = new QuizService();
  quizService.loadQuestions();
  ```

## Key Files & Directories

- `src/main.ts` — app entry, orchestrates scene
- `src/scenes/MainScene.ts` — main AR/3D logic
- `src/services/QuizService.ts` — quiz data logic
- `src/models/Question.ts` — question data model
- `src/utils/` — helpers
- `src/components/` — UI overlays/components
- `tests/` — test files

## AI Agent Preferences

- Generate complete, working code with correct imports
- Use inline comments for non-trivial logic
- Follow the modular structure and file placement above
- Suggest improvements only if they fit current patterns
- Consider performance, maintainability, and type safety
