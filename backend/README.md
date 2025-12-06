# 🧠 BrainArena - Backend API

RESTful API for BrainArena WebXR quiz game. Built with NestJS, TypeORM, and PostgreSQL.

## 🏗️ Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 15+
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or pnpm

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure your PostgreSQL credentials:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=brainarena
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:4000,http://localhost:5173
```

### 3. Database Setup

Create the database:

```sql
CREATE DATABASE brainarena;
```

The tables will be auto-created on first run (thanks to `synchronize: true` in development).

### 4. Seed Questions

Populate the database with quiz questions:

```bash
npm run seed
# or
npx ts-node src/questions/seed-questions.ts
```

### 5. Start Development Server

```bash
npm run start:dev
```

API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Questions

#### Get Random Questions
```http
GET /questions/random/:count
```

**Parameters:**
- `count` (number): Number of questions to fetch (default: 10)

**Response:**
```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "answers": ["London", "Berlin", "Paris", "Madrid"],
    "correctAnswer": 2,
    "category": "Geography",
    "difficulty": "easy"
  }
]
```

#### Get All Questions
```http
GET /questions
```

**Response:**
```json
[
  {
    "id": 1,
    "question": "...",
    "answers": [...],
    "correctAnswer": 2,
    "category": "Geography",
    "difficulty": "easy"
  }
]
```

#### Get Question by ID
```http
GET /questions/:id
```

#### Create Question
```http
POST /questions
Content-Type: application/json

{
  "question": "What is 2+2?",
  "answers": ["3", "4", "5", "6"],
  "correctAnswer": 1,
  "category": "Math",
  "difficulty": "easy"
}
```

#### Update Question
```http
PUT /questions/:id
Content-Type: application/json

{
  "question": "Updated question text",
  "difficulty": "medium"
}
```

#### Delete Question
```http
DELETE /questions/:id
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── questions/
│   │   ├── question.entity.ts      # TypeORM entity
│   │   ├── questions.service.ts    # Business logic
│   │   ├── questions.controller.ts # API routes
│   │   ├── questions.module.ts     # Module definition
│   │   ├── dto/
│   │   │   ├── create-question.dto.ts
│   │   │   └── update-question.dto.ts
│   │   └── seed-questions.ts       # Database seeder
│   ├── app.module.ts               # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                     # Entry point
├── .env.example                    # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Available Scripts

```bash
npm run start         # Production mode
npm run start:dev     # Development mode (watch)
npm run start:debug   # Debug mode
npm run build         # Build for production
npm run format        # Format with Prettier
npm run lint          # Lint with ESLint
npm run seed          # Seed database
```

## 🌍 CORS Configuration

CORS is configured via the `ALLOWED_ORIGINS` environment variable:

```bash
# Single origin
ALLOWED_ORIGINS=http://localhost:5173

# Multiple origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:4000,http://localhost:5173,https://brainarena.vercel.app
```

In development, localhost origins are automatically allowed.

## 🗄️ Database Schema

### Question Entity

| Column        | Type    | Constraints                   |
| ------------- | ------- | ----------------------------- |
| id            | integer | Primary Key, Auto-increment   |
| question      | text    | NOT NULL                      |
| answers       | text[]  | NOT NULL (array of 4 strings) |
| correctAnswer | integer | NOT NULL (0-3)                |
| category      | varchar | NOT NULL                      |
| difficulty    | varchar | NOT NULL (easy/medium/hard)   |

## 🚀 Production Deployment

### Build

```bash
npm run build
```

Compiled files will be in `dist/` folder.

### Environment Variables

Set the following on your hosting platform:

```bash
NODE_ENV=production
DB_HOST=<your-postgres-host>
DB_PORT=5432
DB_USERNAME=<your-username>
DB_PASSWORD=<your-password>
DB_DATABASE=brainarena
PORT=3000
ALLOWED_ORIGINS=<your-frontend-url>
```

### Start Production Server

```bash
npm run start:prod
```

## 📦 Database Migrations (Optional)

For production, disable `synchronize` and use migrations:

1. Update `app.module.ts`:
```typescript
synchronize: false, // Disable auto-sync
```

2. Generate migration:
```bash
npm run migration:generate -- src/migrations/InitialSchema
```

3. Run migrations:
```bash
npm run migration:run
```

## 🔒 Security Considerations

- ✅ CORS properly configured
- ✅ Environment variables for sensitive data
- ✅ Input validation with DTOs
- ⚠️ Add rate limiting for production (e.g., `@nestjs/throttler`)
- ⚠️ Add authentication/authorization if needed
- ⚠️ Use database migrations instead of `synchronize: true`

## 🐛 Troubleshooting

### Database Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Ensure PostgreSQL is running and credentials in `.env` are correct.

### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change `PORT` in `.env` or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### TypeORM Entity Not Found
**Solution:** Ensure entity is imported in `app.module.ts`:
```typescript
entities: [Question]
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👤 Author

**Alberto Presenti**

---

**Frontend Repository:** [../frontend](../frontend)