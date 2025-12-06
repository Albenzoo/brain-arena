# 🧠 BrainArena - AR Quiz Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Augmented Reality (WebXR) quiz game with general knowledge questions. One wrong answer ends the game!

## 🏗️ Architecture

- **Frontend**: TypeScript + Vite + Three.js + WebXR
- **Backend**: NestJS + PostgreSQL + TypeORM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Meta Quest 3 (for AR) or WebXR-compatible browser

### Local Setup

#### 1. Backend
```bash
cd brainarena-backend
npm install
cp .env.example .env
# Configure .env with your PostgreSQL credentials
npm run start:dev
```

#### 2. Frontend
```bash
cd brainarena-frontend
npm install
cp .env.example .env
npm start
```

#### 3. Seed Database
```bash
cd brainarena-backend
npx ts-node src/questions/seed-questions.ts
```

### Testing on Quest 3
See [Frontend README](brainarena-frontend/README.md#testing-on-meta-quest-3)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Alberto Presenti**