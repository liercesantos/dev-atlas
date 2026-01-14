# ADR 0003 — Backend Modular & Domain-Oriented Architecture
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Define a scalable, testable, and maintainable backend architecture for the DevAtlas platform.

---

## 📌 Context
DevAtlas requires a backend architecture that:
- Scales as new business domains are introduced
- Enforces clear separation of responsibilities
- Is easy to test and reason about
- Supports both REST and GraphQL APIs
- Applies security and cross-cutting concerns consistently
>The backend must behave like a real-world production system rather than a simple portfolio API.

---

## 🎯 Decision
We adopt a **modular, domain-oriented architecture** using **NestJS**, with explicit boundaries between **Application**, **Domain**, and **Infrastructure** layers.

Key decisions:
1. Organize code by **business domain**, not by technical concern
2. Enforce layered separation within each module
3. Centralize cross-cutting concerns
4. Use dependency inversion to decouple infrastructure from business logic
5. Design APIs with long-term evolution in mind

---

## 🧩 Architectural Structure

### Domain-Oriented Modules
Each domain is implemented as a self-contained module:
- Auth
- Users
- Projects
- Blog

Each module follows the same internal structure:
```txt
module/
├── application/
│   ├── services/
│   └── dto/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── repositories/
├── infra/
│   ├── controllers/
│   ├── resolvers/
│   ├── repositories/
│   └── mappers/
└── module.module.ts
```

---

## 🧠 Layer Responsibilities

### 1️⃣ Domain Layer
- Pure business logic
- Entities and invariants
- Domain rules and validations
- No framework dependencies

---

### 2️⃣ Application Layer
- Use cases
- Orchestration of domain logic
- Input/output boundaries (DTOs)
- Transaction coordination

---

### 3️⃣ Infrastructure Layer
- HTTP controllers (REST)
- GraphQL resolvers
- Database repositories
- External service integrations

---

## 🔄 Dependency Rule

### Dependencies flow inward only:
- Infrastructure → Application → Domain

### The domain layer never depends on:
- Frameworks
- Databases
- Transport protocols

---

## 🔐 Security & Cross-Cutting Concerns
- Centralized at the framework level:
  - Authentication (JWT)
  - Authorization (RBAC)
  - Validation pipes
  - Exception filters
  - Logging interceptors
  - Applied consistently across all modules.

---

## 🌐 API Strategy
- REST APIs for simple and cacheable operations
- GraphQL for flexible client-driven queries
- Shared business logic between REST and GraphQL
- Versioned REST endpoints

---

## 🧪 Testing Strategy

### Domain
- Pure unit tests
- No mocks required
### Application
- Service-level unit tests
- Mocked repositories
### Infrastructure
- Controller and resolver tests
- Integration tests with a test database

---

## 🔄 Alternatives Considered

### Layer-based Architecture (Controllers/Services/Repositories):
- ❌ Weak domain boundaries
- ❌ Harder to scale feature complexity
### Microservices Architecture:
- ❌ Overhead isn’t justified at the current scale
- ❌ Increased operational complexity
### Anemic Domain Model:
- ❌ Business logic leaks into services
- ❌ Harder to maintain invariants

---

## ⚖️ Consequences

### Positive
- High cohesion within modules
- Clear ownership of business logic
- Strong testability
- Easier refactoring
- Predictable scalability
### Trade-offs
- More files and folders
- Higher initial complexity
- Requires discipline in boundaries
>These trade-offs are acceptable given the long-term goals of the platform.

---

## 📐 Architectural Principles
- Domain-centric design
- Separation of concerns
- Dependency inversion
- Explicit boundaries
- Test-first development

---

## 🔮 Future Considerations
- Event-driven communication between modules
- CQRS for high-read scenarios
- Background job processing
- Module extraction into microservices if required

---

## ✅ Outcome
This backend architecture establishes a strong, maintainable foundation that supports growth, testing, and real-world complexity.

> **This ADR defines how all backend modules must be designed and implemented going forward.**
