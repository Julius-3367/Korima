# Korima API

Node.js + Express API backed by MariaDB (via Prisma) that powers the Korima marketing site.

## Prerequisites

- Node.js 20+
- MariaDB 10.6+ (or MySQL 8+)

## Setup

```bash
cd backend
cp .env.example .env        # update DATABASE_URL
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

The API boots on `http://localhost:4000` by default.

## Available routes

- `GET /api/health` – readiness probe
- `GET /api/services` – list service offerings
- `GET /api/projects` – portfolio projects
- `GET /api/blog` – blog posts
- `GET /api/blog/:slug` – blog details
- `POST /api/contact` – stores a contact message

## Database models

Defined in `prisma/schema.prisma`. Update the schema, run `npx prisma migrate dev`, and regenerate the client with `npm run prisma:generate`.
