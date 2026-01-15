# 🚀 DevAtlas
![Coverage](https://img.shields.io/codecov/c/github/liercesantos/dev-atlas/main)
![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-strict-blue)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38bdf8)


DevAtlas is a **production-grade fullstack web platform** built to showcase modern software engineering practices.  
It is designed not as a simple portfolio, but as a **real-world system** demonstrating architecture, scalability, performance, security, and maintainability.

---

## ✨ Overview

DevAtlas combines a **Next.js frontend** with a **NestJS backend**, using **TypeScript across the entire stack**, and follows industry-standard architectural and development practices.

The platform includes:
- SEO-optimized public pages
- Authenticated dashboards
- Modular backend APIs (REST & GraphQL)
- Strong testing strategy
- CI/CD-ready infrastructure

---

## 🧠 Key Principles

- Production-first mindset
- Explicit architecture decisions (ADR-driven)
- Feature-based frontend organization
- Domain-oriented backend design
- Security by default
- Performance and SEO as first-class concerns

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React 18**
- **TypeScript (strict)**
- **TailwindCSS**
- Context API + Redux Toolkit
- TanStack Query
- Jest + React Testing Library

### Backend
- **Node.js**
- **NestJS**
- **TypeScript**
- REST & GraphQL APIs
- JWT Authentication + RBAC
- Prisma ORM

### Database
- PostgreSQL

### Tooling & Infra
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Gitflow workflow
- ESLint & Prettier
- Conventional Commits

---

## 📐 Architecture Overview

DevAtlas follows a **modular, domain-oriented architecture**.

### High-Level Components
- **Frontend:** Next.js with SSR, SSG, and ISR
- **Backend:** NestJS with layered domain modules
- **APIs:** REST for simple operations, GraphQL for complex queries
- **Data:** PostgreSQL with Prisma
- **Security:** JWT-based authentication with role-based authorization

Detailed architectural decisions are documented using **Architecture Decision Records (ADR)**. 
Check out the [ADR directory](/docs/adr) and [Diagrams directory](/docs/diagrams/archtecture.md) for more details.

---

## 📁 Project Structure

```txt
devatlas/
├── apps/
│   ├── frontend/        # Next.js application
│   └── backend/         # NestJS API
│
├── packages/            # Shared configs and libraries
├── docs/
│   ├── adr/             # Architecture Decision Records
│   ├── diagrams/        # Architecture diagrams
│   └── project-structure.md
│
├── .github/             # CI/CD workflows
├── README.md
└── dev-plan.md
```

A detailed structure is documented in **[Project Structure](/docs/project-structure.md)**.

---

## 🔐 Authentication & Authorization
- JWT-based authentication
- Access & Refresh tokens
- HTTP-only cookies
- Role-Based Access Control (RBAC)
- Guard-based enforcement (NestJS)
- Middleware-based route protection (Next.js)

---

## 🌐 API Strategy
- DevAtlas uses a hybrid API approach:
  - REST
  - Authentication
  - CRUD operations
  - Admin actions
  - GraphQL
  - Public portfolio data
  - Complex nested queries
  - Analytics and dashboards
  - Both APIs share the same domain and application logic.

---

## 🧪 Testing Strategy
- Frontend
    - Component tests
    - Hook tests
  - Page-level tests
  - Snapshot tests (where applicable)
- Backend
    - Unit tests (domain & services)
    - Controller and resolver tests
  - Integration tests with an isolated database
  - Testing is treated as a core architectural requirement, not an afterthought.

---

## ⚡ Performance & SEO
- Server Components by default
- Minimal client-side JavaScript
- Image optimization via next/image
- Font optimization
- Caching strategies (HTTP, ISR)
- Lighthouse score target: 95+
- Full SEO metadata coverage

---

## 🔄 Git Workflow
- Gitflow branching model
- Conventional Commits
- Automated changelogs
- Pull Request templates
- CI validation on every PR

---

## 🚀 Getting Started
- Prerequisites
- Node.js (18+)
- PNPM
- Docker (optional but recommended)

Install dependencies
```bash
pnpm install
```
Run frontend
```bash
pnpm --filter frontend dev
```
Run backend
```bash
pnpm --filter backend start:dev
```

---

## 📚 Documentation
- [Architecture Decisions](/docs/adr)
- [Diagrams](/docs/diagrams)
- [Development Plan](/dev-plan.md)
- [Next Steps](/next-steps.md)
- [Project Structure](/docs/project-structure.md)
- [Differentiators](/docs/differentiators.md)
- [Performance Benchmarks](/docs/performance.md)

---

## 🏆 Portfolio Presentation

DevAtlas is designed to showcase high-level engineering proficiency. Key highlights include:

- **Clean Architecture:** Strict separation of concerns and domain-driven design.
- **Full-Stack Type Safety:** Shared types and strict TypeScript configuration across the monorepo.
- **Production-Ready API:** Hybrid REST and GraphQL approach with robust authentication and RBAC.
- **Performance Optimized:** 95+ Lighthouse scores, ISR, and efficient caching.
- **Testing Discipline:** Layered testing strategy with unit, integration, and snapshot tests.
- **Observability:** Structured logging with Pino and error tracking with Sentry.
- **Developer Experience:** Standardized tooling, Gitflow, and automated CI/CD.

---

## 📊 Reports
- **Test Coverage:** Run `pnpm coverage` to generate the latest report. 
- **Lighthouse:** Run `pnpm lhci autorun` for performance audits.

---

## 🎯 Project Goals
- This project aims to:
- Demonstrate senior-level engineering skills
- Reflect real-world architectural decisions
- Serve as a living, evolvable system
- Act as a strong technical portfolio artifact

---

## 📄 License
This project is licensed under the MIT License.
- This project is intended as a professional portfolio and technical showcase.

---

>DevAtlas is not a demo.
It is a deliberate, production-minded engineering showcase.
