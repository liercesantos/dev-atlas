# 📁 DevAtlas — Project Folder Structure

Monorepo structure designed for scalability, maintainability, and real-world production use.

---

## 🧩 Root Structure

```txt
dev-atlas/
├── apps/
│   ├── frontend/              # Next.js + React + TypeScript
│   └── backend/               # NestJS + Node.js + TypeScript
│
├── packages/                  # Shared code and configs
│   ├── eslint-config/
│   ├── tsconfig/
│   └── ui/                    # Shared UI components (optional)
│
├── .github/
│   ├── workflows/             # CI/CD pipelines
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/                      # Architecture & technical docs
│   ├── adr/                   # Architecture Decision Records
│   ├── diagrams/              # Architecture diagrams
│   ├── dev-plan.md
│   └── project-structure.md
│
├── .editorconfig
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json                 # (optional) Turborepo config
└── README.md
```
## ⚛️ Frontend Structure

```txt
apps/frontend/
├── app/                       # App Router
│   ├── (public)/              # Public routes
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       └── page.tsx
│   │
│   ├── (auth)/                # Auth routes
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/           # Protected routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects/
│   │       └── page.tsx
│   │
│   ├── api/                   # Next.js API routes (if needed)
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── layout.tsx             # Root layout
│   ├── error.tsx              # Global error boundary
│   ├── loading.tsx            # Global loading
│   └── not-found.tsx
│
├── components/                # Reusable UI components
│   ├── ui/
│   ├── layout/
│   └── feedback/
│
├── features/                  # Feature-based modules
│   ├── auth/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   ├── projects/
│   └── blog/
│
├── hooks/                     # Global reusable hooks
│   ├── useAuth.ts
│   └── useTheme.ts
│
├── store/                     # Redux Toolkit
│   ├── index.ts
│   └── slices/
│
├── lib/                       # Utilities & configs
│   ├── api/
│   │   ├── axios.ts
│   │   └── graphql.ts
│   ├── seo/
│   ├── auth/
│   └── constants.ts
│
├── styles/
│   └── globals.css
│
├── tests/
│   ├── components/
│   ├── hooks/
│   └── pages/
│
├── public/
│   ├── images/
│   └── icons/
│
├── middleware.ts              # Auth & route protection
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🧠 Backend Structure

```txt
apps/backend/
├── src/
│   ├── main.ts                # App bootstrap
│   ├── app.module.ts
│
│   ├── config/                # App configuration
│   │   ├── env.ts
│   │   └── database.ts
│
│   ├── modules/               # Domain modules
│   │   ├── auth/
│   │   │   ├── application/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── dto/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   └── repositories/
│   │   │   ├── infra/
│   │   │   │   ├── controllers/
│   │   │   │   ├── guards/
│   │   │   │   └── strategies/
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── users/
│   │   ├── projects/
│   │   └── blog/
│   │
│   ├── shared/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── graphql/               # GraphQL setup
│   │   ├── schema.gql
│   │   └── resolvers/
│   │
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
│
├── test/
│   ├── unit/
│   └── integration/
│
├── prisma/
│   └── seed.ts
│
├── Dockerfile
├── tsconfig.json
└── package.json
```

## 📦 Shared Packages

```txt
packages/
├── eslint-config/
│   ├── index.js
│   └── package.json
│
├── tsconfig/
│   ├── base.json
│   └── next.json
│
└── ui/
├── components/
├── styles/
└── index.ts
```

## 📚 Documentation

```txt
docs/
├── adr/
├── adr/
├── adr/
│   ├── 0001-use-nextjs-app-router.md
│   ├── 0002-nestjs-modular-architecture.md
│   └── 0003-rest-vs-graphql.md
│
└── diagrams/
    ├── architecture.md
    └── auth-flow.png
```
