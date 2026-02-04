# How to start

change all `projectname` to `yourprojectname`
change all `ProjectName` to `YourProjectName`

# ProjectName

![Snipaste_2026-02-04_14-07-12.png](https://s2.loli.net/2026/02/04/uIe3QOlHAwVnkYh.png)

ProjectName is a full-stack project solution built as a monorepo using [Turborepo](https://turbo.build/) and [pnpm workspaces](https://pnpm.io/workspaces). It features a modern React-based frontend and a robust NestJS backend.

## 🚀 Tech Stack

### Frontend (@projectname/app)

- **Framework:** React 19
- **Build Tool:** Vite 7
- **UI Library:** Ant Design 6
- **Routing:** React Router v7
- **State Management:** Zustand
- **HTTP Client:** Axios

### Backend (@projectname/api)

- **Framework:** NestJS
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Caching/Queue:** Redis
- **Authentication:** Passport (JWT)
- **Documentation:** Swagger / OpenAPI

### Shared (@projectname/shared)

- Shared TypeScript types and utilities between frontend and backend.

## 📂 Project Structure

```
.
├── api/                # Backend application (@projectname/api)
├── app/                # Frontend application (@projectname/app)
├── shared/             # Shared code library (@projectname/shared)
├── docker-compose.yaml # Infrastructure configuration
└── package.json        # Root configuration
```

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.0.0 recommended)
- [pnpm](https://pnpm.io/) (Latest version)
- [Docker](https://www.docker.com/) & Docker Compose

## 🏁 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd ProjectName
pnpm install
```

### 2. Environment Setup

Configure environment variables for both applications.

**Backend (@projectname/api):**
Copy `api/.env.sample` to `api/.env` and update the values if necessary.

**Frontend (@projectname/app):**
Copy `app/.env.sample` to `app/.env` and update the values.

### 3. Start Infrastructure

Start PostgreSQL and Redis using Docker Compose:

```bash
docker-compose up -d
```

### 4. Database Setup

Initialize the database schema and seed data:

```bash
# Push schema to database
pnpm prisma:push

# Seed database with initial data
pnpm prisma:seed

# Optional: Generate Prisma Client
pnpm prisma:generate
```

### 5. Running the Application

Start both Frontend and Backend in development mode:

```bash
pnpm dev
```

This will run:

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:3000](http://localhost:3000)
- **API Documentation:** [http://localhost:3000/apidoc](http://localhost:3000/apidoc)

## 📦 Scripts

- `pnpm dev`: Start all applications in development mode.
- `pnpm build`: Build all applications.
- `pnpm lint`: Run linting across all packages.
- `pnpm format`: Format code using Prettier.

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
