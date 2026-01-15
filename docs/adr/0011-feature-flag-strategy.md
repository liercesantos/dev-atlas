# ADR 0011 — Feature Flag Strategy
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Implement a flexible feature flag system to enable progressive delivery and experimental features.

---

## 📌 Context
To support rapid development and testing of new features without impacting all users, a feature flag (or feature toggle) system is required. This allows:
- Decoupling deployment from release.
- Enabling/disabling features via configuration or environment variables.
- Controlling feature visibility in the frontend based on backend state.

---

## 🎯 Decision
We implement a lightweight, custom-built feature flag system integrated into both the NestJS backend and Next.js frontend.

### Key decisions:
1. Create a `FeatureFlagsModule` in the backend to manage and expose flags.
2. Use environment variables via `ConfigService` to override default flag values.
3. Expose flags via a public REST endpoint (`/api/v1/feature-flags`) for frontend consumption.
4. Use **TanStack Query** in the frontend to fetch and cache flag states.
5. Provide a `Feature` component and a `useFeatureFlags` hook for easy consumption in the frontend.

---

## 🧩 Implementation Details

### Backend
- **Service:** `FeatureFlagsService` provides flag states, merging defaults with environment overrides.
- **Controller:** `FeatureFlagsController` exposes flags to the public.

### Frontend
- **Service:** `featureFlagsService` fetches flags from the backend API.
- **Hook:** `useFeatureFlags` manages state using TanStack Query with sensible defaults and caching.
- **Component:** `<Feature name="FLAG_NAME">` conditionally renders content.

---

## ⚖️ Consequences

### Positive
- Safer feature releases.
- Easy to disable broken features in production without a redeploy.
- Clean separation between experimental and stable code.

### Trade-offs
- Increased code complexity (conditional logic).
- Slight overhead in API calls (mitigated by caching).
- Need for periodic cleanup of old flags.

---

## ✅ Outcome
DevAtlas now supports a robust feature flagging system, enabling modern deployment strategies like canary releases or "dark" launches.
