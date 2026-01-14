# ADR 0002 — Frontend Architecture (App Router + Feature-Based Structure)
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Define the frontend architecture to ensure scalability, performance, SEO, and maintainability.

---

## 📌 Context
DevAtlas is a content-driven and feature-rich platform that requires:
- Excellent SEO and performance
- Clear separation between public and protected areas
- Scalability as new features are introduced
- Strong typing and testability
- Modern React best practices
>The frontend must support both static and dynamic rendering strategies while maintaining a clean and predictable codebase.

---

## 🎯 Decision
We adopt **Next.js App Router** combined with a **feature-based architecture** to structure the frontend application.

Key decisions:
1. Use **Next.js App Router** instead of Pages Router
2. Organize business logic by **feature**, not by file type
3. Use **Server Components by default**, Client Components only when needed
4. Combine multiple state management strategies based on responsibility
5. Treat SEO and performance as first-class concerns

---

## 🧩 Architectural Structure

### App Router
- Routing defined by filesystem
- Layouts used to share UI and logic
- Route groups used for logical separation:
    - `(public)`
    - `(auth)`
    - `(dashboard)`

### Feature-Based Organization
Each feature owns its:
- UI components
- Hooks
- Services
- State management
- Types
>This reduces coupling and improves scalability.

---

## 🗂️ Folder Structure (Frontend)

```txt
apps/frontend/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── layout.tsx
│   └── error.tsx
│
├── features/
│   ├── auth/
│   ├── projects/
│   └── blog/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── feedback/
│
├── lib/
│   ├── api/
│   ├── seo/
│   └── constants.ts
│
├── store/
│   └── slices/
│
├── hooks/
├── styles/
└── tests/
```

---

## ⚛️ Component Strategy

### Server Components (Default)
- Data fetching
- SEO-critical pages
- Static content
- Performance-sensitive UI
### Client Components (Opt-in)
- Forms
- Interactive components
- Auth state
- Client-side navigation logic
>"use client" is explicitly declared only where required.

---

## 🧠 State Management Strategy
| Responsibility       | Tool              |
| -------------------- | ----------------- |
| Global UI state      | React Context API |
| Complex client state | Redux Toolkit     |
| Server state         | TanStack Query    |
| Auth/session         | Context + Cookies |
>This avoids overusing a single tool for all scenarios.

---

## 🌐 Data Fetching Strategy
- Server-side fetching via async Server Components
- Client-side fetching via TanStack Query
- Axios instance with interceptors
- Centralized error handling

---

## 🚀 Performance Strategy
- Code splitting by route
- Dynamic imports for heavy components
- Image optimization via next/image
- Font optimization
- Minimal client-side JavaScript

---

## 🔍 SEO Strategy
- Metadata API
- Open Graph & Twitter Cards
- Static generation for public content
- Canonical URLs
- Sitemap generation

---

## 🧪 Testing Strategy
- Unit tests for components
- Hook testing
- Page-level testing
- Mocked API responses

---

## 🔄 Alternatives Considered

### Pages Router
- ❌ Less flexible layouts
- ❌ Less alignment with Next.js roadmap
### Layer-based Architecture (components/services/hooks)
- ❌ Increased coupling
- ❌ Harder feature isolation

---

## ⚖️ Consequences

### Positive
- Clear ownership of features
- Predictable scalability
- Better performance by default
- SEO-friendly architecture
- Easier onboarding
### Trade-offs
- Requires discipline in feature boundaries
- Slightly higher upfront architectural effort

---

## 📐 Principles Enforced
- Feature isolation
- Explicit data flow
- Minimal client-side JavaScript
- Composition over inheritance

---

## ✅ Outcome
This frontend architecture ensures that DevAtlas remains scalable, performant, and maintainable as the platform grows.

>**This ADR defines the foundation for all frontend development decisions going forward.**
