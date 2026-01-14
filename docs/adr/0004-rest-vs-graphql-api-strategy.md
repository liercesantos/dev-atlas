# ADR 0004 — REST vs GraphQL API Strategy
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Define when and how REST and GraphQL APIs are used within the DevAtlas platform.

---

## 📌 Context

### DevAtlas exposes data to multiple frontend surfaces, including:
- Public, SEO-driven pages
- Authenticated dashboards
- Potential future clients (mobile, third-party integrations)

### The API layer must:
- Remain flexible as requirements evolve
- Avoid unnecessary complexity
- Promote clarity and long-term maintainability
- Demonstrate real-world API design skills
>Using both REST and GraphQL can provide the best trade-off if responsibilities are clearly defined.

---

## 🎯 Decision
We adopt a **hybrid API strategy**, using **REST and GraphQL side by side**, each where it provides the most value.

Key decisions:
1. Use **REST** for simple, predictable, and cache-friendly operations
2. Use **GraphQL** for complex, client-driven data requirements
3. Share application and domain logic between REST and GraphQL
4. Avoid duplicating business logic across API layers

---

## 🧩 REST API Strategy

### Use REST when:
- Operations are CRUD-oriented
- Responses have stable shapes
- HTTP semantics (status codes, caching) are valuable
- Simplicity and debuggability are priorities

### REST Characteristics:
- Versioned endpoints (`/api/v1`)
- Standard HTTP verbs
- Clear error contracts
- Easy integration with external systems

### Example Use Cases:
- Authentication
- Project CRUD
- Admin actions
- Health checks

---

## 🧬 GraphQL API Strategy

### Use GraphQL when:
- Clients require flexible data shapes
- Multiple resources must be fetched in a single request
- Over-fetching or under-fetching becomes an issue
- Client-driven queries are beneficial

### GraphQL Characteristics:
- Strongly typed schema
- Single endpoint
- Declarative data fetching
- Schema-driven development

### Example Use Cases:
- Public portfolio pages
- Project listings with nested relations
- Blog content with related metadata
- Analytics dashboards

---

## 🔄 Shared Business Logic

### Both REST controllers and GraphQL resolvers:
- Delegate to the same **Application services**
- Operate on the same **Domain entities**
- Share validation and authorization rules

### This ensures:
- Consistency
- Testability
- Single source of truth

---

## 🔐 Security Considerations
- Authentication enforced at application boundaries
- Authorization via RBAC guards
- GraphQL depth limiting
- Input validation for both APIs
- Rate limiting where appropriate

---

## 🧪 Testing Strategy

### REST
- Controller unit tests
- Integration tests with HTTP requests

### GraphQL
- Resolver tests
- Schema validation tests

### Shared
- Application and domain tests reused across both APIs

---

## 🔄 Alternatives Considered

### REST-only
- ❌ Limited flexibility for complex UI needs
- ❌ Increased number of round-trips

### GraphQL-only
- ❌ Added complexity for simple operations
- ❌ Caching and monitoring overhead
- ❌ Harder integration with external systems

### BFF (Backend for Frontend)
- ❌ Increased maintenance cost
- ❌ Not justified at current scale

---

## ⚖️ Consequences

### Positive
- Clear API responsibilities
- Flexible frontend data access
- Reduced over-fetching
- Strong portfolio signal

### Trade-offs
- Increased conceptual complexity
- Requires discipline to avoid misuse
>These trade-offs are acceptable given the platform’s goals.

---

## 📐 Principles Enforced
- Use the simplest tool that solves the problem
- Avoid premature optimization
- Explicit API contracts
- Shared domain logic

---

## 🔮 Future Considerations
- GraphQL federation
- Public API exposure
- API rate limiting strategies
- Schema versioning

---

## ✅ Outcome
This hybrid API strategy ensures that DevAtlas remains flexible, maintainable, and aligned with real-world production patterns.

> **This ADR defines how APIs must be designed and consumed across the platform.**
