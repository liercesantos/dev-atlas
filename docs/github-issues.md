# 📌 DevAtlas — GitHub Issues Roadmap

This document converts the Development Plan into actionable GitHub Issues.

---

## 🧱 EPIC: Project Foundation

### Issue #1 — Initialize Monorepo & Tooling
**Type:** chore  
**Priority:** High

**Description:**  
Set up the monorepo structure, tooling, and code quality standards.

**Tasks:**
- [X] Initialize Git repository
- [X] Configure Gitflow branches
- [X] Setup PNPM workspace
- [X] Configure ESLint
- [X] Configure Prettier
- [X] Setup Husky + lint-staged
- [X] Add EditorConfig

---

### Issue #2 — Define Project Structure
**Type:** chore

**Description:**  
Create the base folder structure for frontend, backend, and shared packages.

**Tasks:**
- [X] Create `/apps/frontend`
- [X] Create `/apps/backend`
- [X] Create `/packages`
- [X] Create `/docs/adr`
- [X] Create `/docs/diagrams`

---

## ⚛️ EPIC: Frontend Core (Next.js)

### Issue #3 — Setup Next.js App Router
**Type:** feat

**Tasks:**
- [X] Initialize Next.js with App Router
- [X] Enable TypeScript strict mode
- [X] Configure base layout
- [X] Configure error and loading boundaries
- [X] Setup environment variables

---

### Issue #4 — Setup TailwindCSS
**Type:** feat

**Tasks:**
- [X] Install TailwindCSS
- [X] Configure theme tokens
- [X] Setup global styles
- [X] Add dark mode support
- [X] Apply accessibility defaults

---

### Issue #5 — Frontend Architecture (Feature-based)
**Type:** feat

**Tasks:**
- [X] Create feature-based folders
- [X] Setup shared UI components
- [X] Define hooks strategy
- [X] Setup lib utilities
- [X] Enforce architectural boundaries

---

## 🧠 EPIC: Backend Core (NestJS)

### Issue #6 — Setup NestJS Project
**Type:** feat

**Tasks:**
- [X] Initialize NestJS
- [X] Enable strict TypeScript
- [X] Setup environment validation
- [X] Configure logging
- [X] Configure CORS

---

### Issue #7 — Implement Modular Architecture
**Type:** feat

**Tasks:**
- [X] Create domain-oriented modules
- [X] Separate Application / Domain / Infra layers
- [X] Define base module template
- [X] Enforce dependency direction

---

### Issue #8 — Database Setup
**Type:** feat

**Tasks:**
- [X] Setup PostgreSQL
- [X] Configure Prisma ORM
- [X] Create schema
- [X] Run initial migration
- [X] Seed database

---

## 🔐 EPIC: Authentication & Authorization

### Issue #9 — JWT Authentication
**Type:** feat  
**Priority:** High

**Tasks:**
- [X] Implement login flow
- [X] Issue access tokens
- [X] Issue refresh tokens
- [X] Secure password hashing
- [X] Token rotation logic

---

### Issue #10 — Role-Based Access Control (RBAC)
**Type:** feat

**Tasks:**
- [X] Define roles and permissions
- [X] Create guards
- [X] Create decorators
- [X] Apply authorization rules
- [X] Protect admin routes

---

## 🌐 EPIC: API Strategy

### Issue #11 — REST API Implementation
**Type:** feat

**Tasks:**
- [X] Define REST endpoints
- [X] Add pagination & filtering
- [X] Standardize error responses
- [X] Add Swagger documentation

---

### Issue #12 — GraphQL API Implementation
**Type:** feat

**Tasks:**
- [X] Setup GraphQL module
- [X] Define schema
- [X] Implement resolvers
- [X] Enable playground
- [X] Apply authorization rules

---

## 🔄 EPIC: Frontend ↔ API Integration

### Issue #13 — REST Integration (Frontend)
**Type:** feat

**Tasks:**
- [X] Setup Axios instance
- [X] Add interceptors
- [X] Handle auth tokens
- [X] Global error handling

---

### Issue #14 — GraphQL Integration (Frontend)
**Type:** feat

**Tasks:**
- [X] Setup Apollo Client
- [X] Implement queries & mutations
- [X] Typed GraphQL responses
- [X] Error handling

---

## 🧪 EPIC: Testing

### Issue #15 — Frontend Testing Setup
**Type:** test

**Tasks:**
- [ ] Setup Jest
- [ ] Setup React Testing Library
- [ ] Test UI components
- [ ] Test hooks
- [ ] Test pages

---

### Issue #16 — Backend Testing Setup
**Type:** test

**Tasks:**
- [ ] Setup Jest for NestJS
- [ ] Unit tests for services
- [ ] Controller tests
- [ ] Integration tests

---

## ⚡ EPIC: Performance & SEO

### Issue #17 — Frontend Performance Optimization
**Type:** perf

**Tasks:**
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Font optimization
- [ ] Lighthouse ≥ 95

---

### Issue #18 — SEO Implementation
**Type:** feat

**Tasks:**
- [ ] Metadata API
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs

---

## 🔄 EPIC: CI/CD & Workflow

### Issue #19 — CI Pipeline Setup
**Type:** chore  
**Priority:** High

**Tasks:**
- [ ] GitHub Actions CI
- [ ] Lint on PR
- [ ] Test on PR
- [ ] Build validation

---

### Issue #20 — Release Automation
**Type:** chore

**Tasks:**
- [ ] Setup semantic-release
- [ ] Automated changelog
- [ ] GitHub releases

---

## 🚀 EPIC: Deployment

### Issue #21 — Docker Setup
**Type:** chore

**Tasks:**
- [ ] Dockerize frontend
- [ ] Dockerize backend
- [ ] Docker Compose

---

### Issue #22 — Production Deployment
**Type:** feat

**Tasks:**
- [ ] Setup production environment
- [ ] Setup staging
- [ ] Environment variables
- [ ] Monitoring & logs

---

## ⭐ EPIC: Portfolio Enhancements

### Issue #23 — Dark Mode & UX Enhancements
**Type:** feat

**Tasks:**
- [ ] Persist dark mode
- [ ] UI transitions
- [ ] Accessibility review

---

### Issue #24 — Documentation & Final Polish
**Type:** docs

**Tasks:**
- [ ] Final README review
- [ ] ADR completeness check
- [ ] Architecture diagrams review
- [ ] Portfolio presentation
