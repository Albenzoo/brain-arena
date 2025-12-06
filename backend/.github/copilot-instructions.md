# API Server Development Guidelines

## Project Overview

This repository contains the backend API made in NestJs for a cultural quiz game in Augmented Reality (WebXR). The game presents questions and options integrated into the real world. The base mode is similar to "Who Wants to Be a Millionaire": one mistake ends the game.

### Core Features

- **RESTful API** for managing quiz questions, game sessions, scoring, and user progress.
- **Game Rules**:
  - 10 questions per session (configurable)
  - 30 seconds per question (configurable)
  - 1 mistake ends the session
  - Questions are randomized, no repeats in a session
  - Backend tracks recent questions to avoid repetition across sessions
- **Scoring System**:
  - Easy: +10 points (+10 speed bonus if answered within half the time)
  - Medium: +20 points (+10 speed bonus)
  - Hard: +30 points (+10 speed bonus)
- **Question Structure**:
  - id: number
  - text: string
  - options: string[4]
  - correctIndex: number (0–3)
  - difficulty: 'easy' | 'medium' | 'hard'
  - category: string (optional)
  - image: string (optional, URL or Base64)

## Programming Language: TypeScript

**TypeScript Best Practices:**

- Use strict TypeScript configuration with `"strict": true`
- Prefer interfaces over type aliases for object shapes
- Use explicit return types for all public functions
- Avoid `any` type - use `unknown` or proper typing instead
- Use utility types (Pick, Omit, Partial) for type transformations
- Implement proper null/undefined checking

## Framework: NestJS

## Code Style: Clean Code

**Clean Code Principles:**

- Write self-documenting code with meaningful names
- Keep functions small and focused on a single responsibility
- Avoid deep nesting and complex conditional statements
- Use consistent formatting and indentation
- Write code that tells a story and is easy to understand
- Refactor ruthlessly to eliminate code smells

## AI Code Generation Preferences

When generating code, please:

- Generate complete, working code examples with proper imports
- Include inline comments for complex logic and business rules
- Follow the established patterns and conventions in this project
- Suggest improvements and alternative approaches when relevant
- Consider performance, security, and maintainability
- Include error handling and edge case considerations
- Generate appropriate unit tests when creating new functions
- Follow accessibility best practices for UI components
- Use semantic HTML and proper ARIA attributes when applicable
