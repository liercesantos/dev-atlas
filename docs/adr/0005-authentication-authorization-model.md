# ADR 0005 — Authentication & Authorization Model

- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Define a secure, scalable authentication and authorization model for the DevAtlas platform.

---

## 📌 Context

DevAtlas includes:
- Public, unauthenticated access to content
- Authenticated dashboards for content management
- Role-based access for administrative features
- Potential future expansion to multiple clients or roles

The authentication and authorization model must:
- Be secure by default
- Support fine-grained access control
- Integrate cleanly with frontend and backend architectures
- Be extensible without major refactoring

---

## 🎯 Decision

We adopt a **JWT-based authentication model** combined with **Role-Based Access Control (RBAC)**.

Key decisions:
1. Use **Access Tokens + Refresh Tokens**
2. Store tokens securely using **HTTP-only cookies**
3. Enforce authorization using **roles and permissions**
4. Centralize security logic using **NestJS guards and decorators**
5. Apply authentication consistently across REST and GraphQL APIs

---

## 🔐 Authentication Model

### Token Types

#### Access Token
- Short-lived
- Used for authenticated API requests
- Contains user ID and role claims

#### Refresh Token
- Long-lived
- Used to obtain new access tokens
- Rotated on each use

---

### Token Storage

- Stored in **HTTP-only cookies**
- SameSite policy applied
- Secure flag enabled in production
- Prevents XSS-based token theft

---

### Authentication Flow

```txt
User → Login → Access + Refresh Token issued
Access Token expires → Refresh Token used
Refresh Token rotated → New Access Token issued
Logout → Tokens invalidated
```

---

### 🛂 Authorization Model (RBAC)
- Roles
- Admin
- Editor
- User
- Public (unauthenticated)
- Permissions
- Managed at the application layer
- Enforced via decorators
- Evaluated by guards
- Enforcement Strategy
- Route-level guards
- Resolver-level guards (GraphQL)
- Permission decorators
- Explicit access rules per feature

---

### 🧩 Backend Implementation
- NestJS Components
- AuthModule
- JwtStrategy
- RefreshTokenStrategy
- AuthGuard
- RolesGuard
- Custom decorators (@Roles(), @Public())

---

### ⚛️ Frontend Integration
- Authentication state handled via Context API
- Silent token refresh
- Route protection via middleware
- Role-based UI rendering

---

### 🧪 Testing Strategy
- Authentication
- Token issuance tests
- Refresh flow tests
- Invalid token handling
- Authorization
- Guard unit tests
- Role-based access tests
- Permission enforcement tests

---

### 🔄 Alternatives Considered
- Session-based Authentication
- ❌ Poor scalability
- ❌ Increased server-side state
- OAuth-only
- ❌ Overkill for initial scope
- ❌ Reduced control for custom flows
- Client-side token storage
- ❌ Increased XSS risk

---

### ⚖️ Consequences
- Positive
- Secure and scalable authentication
- Clear authorization rules
- Works across REST and GraphQL
- Strong real-world alignment
- Trade-offs
- More complex token lifecycle
- Requires careful refresh logic
- These trade-offs are acceptable for a production-grade system.

---

### 📐 Principles Enforced
- Security by default
- Least privilege
- Explicit access control
- Defense in depth

---

### 🔮 Future Considerations
- OAuth provider integration
- Multi-factor authentication (MFA)
- Multi-tenant authorization
- Fine-grained permission policies

---

### ✅ Outcome
This authentication and authorization model provides a secure and extensible foundation for DevAtlas.

> **This ADR defines how identity and access are managed across the platform.**
