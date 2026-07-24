# Prompt Vault

Prompt Vault is a full-stack AI prompt management platform that provides JWT-based authentication and taxonomy management (categories and tags) for organizing prompt collections.

## What is implemented

- **Authentication module**
  - User registration
  - Login with username or email
  - JWT token issuance and stateless auth
  - Protected profile endpoint (`/auth/me`)
- **Category module**
  - Create, list, get by id/slug, update, delete categories
  - Slug generation and uniqueness validation
- **Tag module**
  - Create, list, search, get by slug, delete tags
  - Normalization to lowercase + slug generation
- **Seed data**
  - Default roles (`ROLE_USER`, `ROLE_ADMIN`)
  - Default users (`admin/admin123`, `user/user123`)
  - Starter categories and tags

---

## Architecture

### Frontend
- **React + TypeScript + Vite + Tailwind CSS**
- Routing with `react-router-dom`
- Auth state managed via `AuthContext`
- Axios client with request/response interceptors for JWT handling
- Protected routes for authenticated pages

### Backend
- **Spring Boot 2.7 + Spring Security + Spring Data JPA**
- Layered design:
  - `controller` → REST endpoints
  - `service` / `service.impl` → business logic
  - `repository` → persistence
  - `entity` + `dto` + `mapper`
- Global exception handling with unified `ApiResponse<T>` envelope
- JWT filter in security chain

### Data
- Current app config uses **H2 in-memory DB** (`backend/src/main/resources/application.yml`)
- `docker-compose.yml` provides a **MySQL 8** container for external DB usage

---

## Repository structure

```text
prompt-vault/
├── frontend/                  # React app (UI, routing, API integration)
│   ├── src/
│   │   ├── api/axios.ts
│   │   ├── components/Navbar.tsx
│   │   ├── context/AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── CategoriesPage.tsx
│   │   └── types/
│   └── package.json
├── backend/                   # Spring Boot API
│   ├── src/main/java/com/promptvault/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── service/impl/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── config/
│   │   ├── entity/
│   │   ├── dto/
│   │   ├── mapper/
│   │   └── exception/
│   ├── src/main/resources/application.yml
│   └── pom.xml
├── docker-compose.yml         # MySQL service
└── package.json               # Root helper scripts
```

---

## API usage (current endpoints)

Base URL: `/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (requires authentication)

### Categories (authenticated)
- `POST /categories`
- `GET /categories`
- `GET /categories/{id}`
- `GET /categories/slug/{slug}`
- `PUT /categories/{id}`
- `DELETE /categories/{id}`

### Tags (authenticated)
- `POST /tags`
- `GET /tags`
- `GET /tags/search?query=...`
- `GET /tags/slug/{slug}`
- `DELETE /tags/{id}`

All responses follow a common structure:

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "timestamp": "..."
}
```

---

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Java 16, Spring Boot, Spring Security, Spring Data JPA, JWT (jjwt)
- **Database:** H2 (active default), MySQL (via Docker)

---

## Local setup

## 1) Prerequisites

- Node.js 18+
- npm 9+
- Java 16+
- Maven 3.8+ (or use Maven wrapper where available)
- Docker (optional, for MySQL)

## 2) Install frontend dependencies

```bash
cd frontend
npm install
```

## 3) Run backend

From `backend/`:

```bash
mvn spring-boot:run
```

(Windows wrapper in repo: `mvnw.cmd spring-boot:run`)

Backend runs on: `http://localhost:8080`

## 4) Run frontend

From `frontend/`:

```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

Vite proxies `/api` requests to backend (`frontend/vite.config.ts`).

## 5) Optional: start MySQL container

From repo root:

```bash
docker compose up -d
```

> Note: backend currently points to H2 by default. Update datasource settings in `backend/src/main/resources/application.yml` to use MySQL.

---

## Demo credentials (seeded)

- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`

Use for local development only.

---

## Current product state

This repository currently implements:
- Module 1: Authentication Core
- Module 2: Category & Tag Management

Prompt CRUD, sharing, and advanced discovery/ranking are not yet implemented in this codebase.
