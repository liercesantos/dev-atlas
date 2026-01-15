# ADR 0012 — MySQL for Presentation Environment Only
- **Status:** Accepted
- **Date:** 2026-01-15
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Allow the use of MySQL in a presentation/demo environment without impacting the core architecture or production decisions.

---

## 📌 Context
DevAtlas is architecturally designed and optimized for **PostgreSQL** as its primary database, as documented in previous ADRs.

However, in some **presentation, demo, or showcase environments**, external constraints may exist, such as:
- Hosting providers offering MySQL by default
- Limited database options in shared environments
- The need to quickly demonstrate the system without full production infrastructure

The system must be able to **adapt to these constraints without compromising architectural integrity**.

---

## 🎯 Decision
We allow the use of **MySQL as an alternative database only in presentation/demo environments**, under strict conditions that preserve the original architectural decisions.

Key decisions:
1. **PostgreSQL remains the canonical and production database**
2. **MySQL is permitted only in presentation/demo environments**
3. Database switching must be handled via configuration, not code changes
4. Domain and application layers must remain database-agnostic
5. No MySQL-specific logic is allowed in business code

---

## 🧩 Implementation Strategy

### ORM Abstraction
- Continue using **Prisma ORM**
- Prisma schema remains compatible with both PostgreSQL and MySQL
- Database provider is selected via environment configuration

Example:
```prisma
//schema.prisma
datasource db {
  provider = env("DATABASE_PROVIDER")
}
```
```ts
//prisma.config.ts
export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

---

### Environment Configuration
| Environment         |     Database |
|:--------------------|-------------:|
| Development         |   PostgreSQL |
| Staging             |   PostgreSQL |
| Production          |   PostgreSQL |
| Presentation / Demo |        MySQL |
>Switching databases requires only environment variable changes, never code modifications.

---

### 🧠 Architectural Safeguards
- No raw SQL queries tied to a specific database
- Avoid database-specific features (e.g., PostgreSQL-only extensions)
- All persistence logic goes through repositories
- Domain logic remains persistence-agnostic
- Migrations must be tested against both providers

---

### 🔐 Scope Limitation
This decision:
- ❌ Does NOT change the primary database choice
- ❌ Does NOT affect production architecture
- ❌ Does NOT introduce multi-database complexity in runtime
- ✅ ONLY supports presentation/demo needs

---

### 🔄 Alternatives Considered

#### Always PostgreSQL
- ❌ Limits presentation flexibility
- ❌ Increases demo friction in constrained environments
#### Full Multi-Database Support
- ❌ Unnecessary complexity
- ❌ Higher maintenance cost
- ❌ Not aligned with project goals

---

### ⚖️ Consequences

#### Positive
- Increased portability for demos
- Easier presentation in restricted environments
- No impact on core architecture
- Preserves long-term maintainability
#### Trade-offs
- Requires discipline in schema design
- Requires occasional cross-database validation
>These trade-offs are acceptable given the limited scope of this decision.

---

### 📐 Principles Enforced
- Production-first architecture
- Configuration over code changes
- Explicit environment boundaries
- No architectural compromise for demos

---

### 🔮 Future Considerations
- Automated validation of Prisma schema against both databases
- Read-only demo environments
- Temporary data seeding strategies for presentations

---

### ✅ Outcome
DevAtlas remains PostgreSQL-first and production-focused, while gaining the flexibility to be demonstrated using MySQL when required.

>**This ADR ensures adaptability for presentations without diluting architectural rigor.**
