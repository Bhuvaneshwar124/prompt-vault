# 🚀 Prompt Vault — Enterprise AI Prompt Engine & Tech Stack Marketplace

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Railway](https://img.shields.io/badge/Railway-Production-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

**Prompt Vault** is an enterprise AI prompt management platform and tech stack marketplace. It enables developers, prompt engineers, and AI creators to index external chat locations across **ChatGPT, Google Gemini, Groq LPU, Claude, DeepSeek, and Midjourney**, fill dynamic `{{variable}}` placeholders in 1-click, and discover community-rated prompts.

---

## 🔗 Live Production Links

- **Live Backend Production API**: [https://prompt-vault-production-f93d.up.railway.app/api/v1](https://prompt-vault-production-f93d.up.railway.app/api/v1)
- **Interactive Swagger UI Docs**: [https://prompt-vault-production-f93d.up.railway.app/swagger-ui/index.html](https://prompt-vault-production-f93d.up.railway.app/swagger-ui/index.html)
- **Database Service**: PostgreSQL Hosted on Supabase Cloud

---

## ✨ Features & Modules

### 1. 🤖 External AI Chat Location Indexing
- Index chat sessions from **ChatGPT, Gemini, Groq, Claude, DeepSeek, and Midjourney**.
- Store direct web links to past chat sessions (`https://chatgpt.com/c/...`), target AI models (`GPT-4o`, `Gemini 1.5 Pro`, `LLaMA 3 70B`, `Claude 3.5 Sonnet`, `DeepSeek R1`), and chat outcome summaries.

### 2. 🧩 Dynamic Variable Template Engine
- Write prompts using placeholders like `{{language}}`, `{{framework}}`, or `{{code_snippet}}`.
- Fill dynamic variables using an interactive 1-click modal and copy ready-to-run prompts directly into any AI model.

### 3. 🌐 Public Tech Stack Marketplace (`/explore`)
- Public access without mandatory sign-in.
- Filter prompts by tech stack: **Java / Spring Boot**, **React / Next.js**, **Python / ML**, **SQL / Databases**, **Docker / DevOps**, **Node.js**, **Tailwind CSS**.

### 4. 🌟 5-Star Ratings, Likes & Community Reviews
- Rate prompts from **1 to 5 Stars** with real-time average score calculation.
- Community comment threads and review discussions per prompt.

### 5. 🔐 Enterprise JWT Authentication & Vault
- Stateless JWT authentication with **BCrypt password hashing** and role-based access control (`ROLE_USER`, `ROLE_ADMIN`).
- Manage personal prompts, favorite starred items, and index private AI chats.

---

## 🏛️ System Architecture

```text
  [ React 18 + TypeScript + Vite + Tailwind CSS ] 
                         |
           (Axios REST + JWT Bearer Token)
                         |
                         v
   [ Spring Boot 3 Java Backend (Hosted on Railway) ]
                         |
           (Spring Data JPA + Security)
                         |
                         v
  [ PostgreSQL Database (Hosted on Supabase Cloud) ]
```

---

## 📁 Repository Structure

```text
prompt-vault/
├── frontend/                     # React 18 + TypeScript Client Application
│   ├── src/
│   │   ├── api/axios.ts          # Axios client (points to Railway production endpoint)
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Glassmorphism header with active state navigation
│   │   │   ├── Footer.tsx        # Universal footer with system status indicator
│   │   │   ├── PromptCard.tsx    # Dual-mode card (mode="indexer" vs mode="community")
│   │   │   ├── CreatePromptModal.tsx    # Instant prompt creation modal
│   │   │   ├── VariableFillerModal.tsx  # Dynamic {{placeholder}} form filler
│   │   │   ├── PromptDetailsModal.tsx   # 5-Star rating & review discussion modal
│   │   │   ├── RatingStars.tsx          # Interactive 5-star rating widget
│   │   │   └── AiToolBadge.tsx          # AI Provider badges & direct chat URL links
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx   # Product overview with live interactive demo
│   │   │   ├── ExplorePage.tsx   # Public Tech Stack Marketplace & ratings
│   │   │   ├── DashboardPage.tsx # Personal Vault & AI Chat Indexer
│   │   │   ├── LoginPage.tsx     # Sign In page
│   │   │   └── RegisterPage.tsx  # Sign Up page
│   │   ├── App.tsx               # Client routes & layout
│   │   └── index.css             # Tailwind & Glassmorphism styles
│   ├── tsconfig.json             # TypeScript compiler settings
│   └── package.json
│
├── backend/                      # Spring Boot 3 Java API Backend
│   ├── src/main/java/com/promptvault/
│   │   ├── config/
│   │   │   ├── WebSecurityConfig.java   # Spring Security & CORS rules
│   │   │   └── DataInitializer.java     # Seeds roles, admin user, & sample prompts
│   │   ├── controller/
│   │   │   ├── AuthController.java      # Sign up & login endpoints
│   │   │   ├── PromptController.java    # Prompt search, CRUD, & favorites
│   │   │   └── CommunityController.java # Ratings (1-5 stars), comments, & likes
│   │   ├── entity/                      # User, Prompt, PromptRating, Comment, Role
│   │   ├── dto/                         # Request & Response DTOs
│   │   ├── repository/                  # Spring Data JPA Repositories & Specifications
│   │   └── service/                     # Business logic services
│   ├── src/main/resources/
│   │   └── application.yml              # Supabase PostgreSQL datasource configuration
│   └── pom.xml                          # Maven dependencies (Spring Boot, PostgreSQL, JWT)
│
├── ARCHITECTURE_AND_CHANGES.txt # Technical system documentation
└── README.md
```

---

## ⚡ API Endpoints Summary

Base URL: `https://prompt-vault-production-f93d.up.railway.app/api/v1`

### 🔑 Authentication
- `POST /auth/register` — Register a new account
- `POST /auth/login` — Authenticate and receive JWT token
- `GET /auth/me` — Get current logged-in user profile

### 📑 Prompts & Indexer
- `GET /prompts` — Search prompts by keyword, tech stack, or AI tool (Public access)
- `GET /prompts/{id}` — Get single prompt details & increment view count (Public access)
- `POST /prompts` — Index new prompt and chat URL (Requires Auth)
- `PUT /prompts/{id}` — Update prompt details (Owner only)
- `DELETE /prompts/{id}` — Delete prompt (Owner only)
- `PATCH /prompts/{id}/favorite` — Toggle star/favorite status

### 🌟 Ratings, Reviews & Community
- `GET /prompts/{id}/ratings` — Retrieve prompt star rating summary (Public access)
- `POST /prompts/{id}/ratings` — Submit 1 to 5 star rating (Requires Auth)
- `GET /prompts/{id}/comments` — Retrieve community comments (Public access)
- `POST /prompts/{id}/comments` — Post comment/review (Requires Auth)
- `DELETE /comments/{id}` — Delete own comment (Requires Auth)
- `POST /prompts/{id}/like` — Toggle prompt like counter

---

## 🛠️ Local Development Setup

### 1) Prerequisites
- **Node.js**: v18 or higher
- **Java JDK**: 17 or higher
- **Maven**: 3.8+ (or use included `mvnw.cmd` wrapper)

### 2) Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3) Run Backend Locally

From the `backend/` directory:

```bash
mvn spring-boot:run
```

*(On Windows PowerShell: `.\mvnw.cmd spring-boot:run`)*

Backend runs on: `http://localhost:8080`

---

## 🔑 Seeded Demo Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **System Admin** | `admin` | `admin123` |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
