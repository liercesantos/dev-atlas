# ADR 0010 — Structured Logging and Observability
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Implement a production-grade logging and error tracking system to improve observability and debugging.

---

## 📌 Context
As DevAtlas grows in complexity and aims to simulate a real-world production system, standard console logs are insufficient. We need:
- Structured logs (JSON) for better searchability and analysis.
- Different log levels (debug, info, warn, error).
- Human-readable logs during development.
- Automated error tracking and reporting in both frontend and backend.

---

## 🎯 Decision
We adopt **Pino** for structured logging in the backend and **Sentry** for error tracking across the entire stack.

### Key decisions:
1. Use `nestjs-pino` as the primary logging module for the backend.
2. Configure `pino-pretty` for development environments to ensure logs are readable by developers.
3. Enforce JSON format in production environments for compatibility with log aggregators.
4. Integrate **Sentry** for real-time error tracking and performance monitoring.
5. Initialize Sentry at the earliest possible stage in both Next.js (client/server/edge) and NestJS.

---

## 🧩 Implementation Details

### Backend (NestJS)
- **Library:** `nestjs-pino`, `pino`, `pino-pretty`
- **Configuration:** 
  - `debug` level in development, `info` in production.
  - Pretty printing enabled only in non-production.
  - Sentry initialized in `main.ts` using `SENTRY_DSN` environment variable.

### Frontend (Next.js)
- **Library:** `@sentry/nextjs`
- **Configuration:** 
  - Separate configurations for `client`, `server`, and `edge` environments.
  - Use `NEXT_PUBLIC_SENTRY_DSN` for client-side reporting.

---

## ⚖️ Consequences

### Positive
- Improved debugging and troubleshooting capabilities.
- Consistent logging format across backend services.
- Real-time alerts for production errors.
- Better performance compared to built-in NestJS logger.

### Trade-offs
- Additional external dependencies.
- Overhead of configuring Sentry across multiple environments.

---

## ✅ Outcome
DevAtlas now possesses a professional observability stack, matching the standards of high-scale production applications.
