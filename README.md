# GreenLab - Coding Challenge

A full-stack field management application built with Node.js, Express, React, and PostgreSQL. Your task is to implement a sensor readings feature across the backend and frontend.

## Project Structure

```
greenlab-code-challenge/
├── packages/
│   ├── api/                    # Express + Kysely backend (port 3001)
│   │   ├── src/
│   │   │   ├── index.ts        # Express server entry point
│   │   │   ├── handlers/       # Route handlers
│   │   │   └── lib/            # Business logic + database client
│   │   └── db/
│   │       └── migrate.ts      # Database migrations
│   └── client/                 # React + Vite frontend (port 3000)
│       └── src/
│           ├── api/            # Axios HTTP client (pre-configured)
│           ├── hooks/          # React Query hooks
│           ├── pages/          # Page components
│           └── components/     # Shared components
├── docker-compose.yml          # PostgreSQL database
└── package.json                # Root monorepo config
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (v24 or higher)

### Installation

1. Start the PostgreSQL database (includes schema and seed data):

   ```bash
   docker-compose up -d
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development servers:
   ```bash
   pnpm dev
   ```

This will start:

- **API Server**: http://localhost:3001
- **Client App**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## Available Scripts

### Root Level

| Command      | Description                              |
| ------------ | ---------------------------------------- |
| `pnpm dev`   | Start API and client in development mode |
| `pnpm build` | Build all packages                       |
| `pnpm format`| Format code with Prettier                |

### API (`packages/api`)

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `pnpm dev`   | Start API with hot reload (port 3001) |
| `pnpm build` | Compile TypeScript                    |

### Client (`packages/client`)

| Command      | Description                       |
| ------------ | --------------------------------- |
| `pnpm dev`   | Start Vite dev server (port 3000) |
| `pnpm build` | Build for production              |

---

## The Task

### What to build

Add a **sensor readings** feature to the field detail page. When a user views a field, they should see the latest sensor readings for that field.

### Acceptance Criteria

1. Navigating to a field detail page shows the latest sensor readings for that field
2. Each reading displays the sensor type, value with unit, and timestamp
3. The data comes from the API (no hardcoded values)
4. Loading and error states are handled

---

### Tech Stack Reference

- **ORM**: [Kysely](https://kysely.dev/) - type-safe SQL query builder
- **HTTP Client**: [Axios](https://axios-http.com/) - pre-configured instance at `src/api/client.ts`
- **Data Fetching**: [React Query](https://tanstack.com/query) - see existing hooks in `src/hooks/` for examples
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS
