# ADR 0006 — State Management Strategy
- **Status:** Accepted
- **Date:** 2026-01-14
- **Deciders:** DevAtlas Core Team
- **Technical Story:** Define a clear and scalable state management strategy for the DevAtlas frontend application.

---

## 📌 Context
DevAtlas is a modern frontend application built with **Next.js App Router** and **React 18**, supporting:
- Server Components and Client Components
- Public and authenticated areas
- Complex user interactions
- Multiple data sources (REST and GraphQL)
>Different types of state exist in the application, each with different lifecycles and responsibilities.  
>A single state management solution would either be insufficient or overly complex.

---

## 🎯 Decision
We adopt a **multi-layered state management strategy**, selecting the most appropriate tool based on the **nature of the state**, not convenience.

Key decisions:
1. Prefer **Server State** over Client State whenever possible
2. Use **React Server Components** for data fetching by default
3. Use **TanStack Query** for asynchronous server state
4. Use **React Context API** for lightweight global UI state
5. Use **Redux Toolkit** only for complex client-side state
6. Avoid storing derived or cacheable data in global stores

---

## 🧩 State Categories & Tools

### 1️⃣ Server State

#### **Definition:**  
Data fetched from APIs that represents backend state.

#### **Tools:**
- Next.js Server Components
- TanStack Query (React Query)

#### **Examples:**
- Projects list
- Blog posts
- User profile data
- Dashboard metrics

#### **Rationale:**
- Built-in caching
- Automatic refetching
- Reduced global state complexity
- Better performance and consistency

---

### 2️⃣ Global UI State

#### **Definition:**  
State related to UI behavior that must be shared across components.

#### **Tool:**
- React Context API

#### **Examples:**
- Theme (dark/light mode)
- Auth session context
- Feature flags
- Layout preferences

#### **Rationale:**
- Lightweight
- Minimal boilerplate
- Easy to reason about
- No need for advanced tooling

---

### 3️⃣ Complex Client State

#### **Definition:**  
State that involves complex interactions, workflows, or non-trivial updates.

#### **Tool:**
- Redux Toolkit

#### **Examples:**
- Multi-step forms
- Complex dashboard filters
- Client-side data composition
- Optimistic UI workflows

#### **Rationale:**
- Predictable state transitions
- Centralized logic
- Excellent debugging capabilities
- Scales well for complex flows

---

### 4️⃣ Local Component State

#### **Definition:**  
State local to a component.

#### **Tool:**
- `useState`
- `useReducer`

#### **Examples:**
- Form inputs
- Modal visibility
- Toggle states

#### **Rationale:**
- Simple
- Encapsulated
- Avoids unnecessary abstraction

---

## 🧠 State Ownership Rules
- Server state **must not** be duplicated in Redux or Context
- Derived data should be computed at render time
- Global state should be minimal and intentional
- State should live as close as possible to where it is used

---

## 🔄 Data Flow Summary

```txt
API → Server Components → UI
API → TanStack Query → UI
Context → UI
Redux → UI
```
>Each layer has a single responsibility and does not overlap unnecessarily.

---

## 🧪 Testing Strategy

### Server State
- Mock API responses
- Test loading, success, and error states
### Context
- Provider-level tests
- Consumer behavior tests
### Redux
- Reducer unit tests
- Selector tests
- Integration tests with components

---

## 🔄 Alternatives Considered

### Redux Everywhere
- ❌ Excessive boilerplate
- ❌ Unnecessary complexity
- ❌ Poor alignment with Server Components
### Context Only
- ❌ Performance issues at scale
- ❌ Harder to debug complex flows
### Client-Side State Only
- ❌ Misses Next.js performance advantages
- ❌ Increases hydration and JS cost

---

## ⚖️ Consequences

### Positive
- Clear separation of concerns
- Reduced global state complexity
- Better performance
- Improved developer experience
- Strong alignment with modern React patterns
### Trade-offs
- Requires discipline and decision-making
- Developers must understand state categories
>These trade-offs are acceptable given the platform’s goals.

---

## 📐 Principles Enforced
Prefer server state
Minimize global state
Explicit ownership
Predictable data flow
Performance-first mindset

---

## 🔮 Future Considerations
State machine adoption for complex flows
Advanced caching strategies
Real-time state via WebSockets
Cross-tab synchronization if required

---

## ✅ Outcome
This state management strategy ensures DevAtlas remains scalable, performant, and maintainable as complexity grows.

>**This ADR defines how state must be handled across the frontend moving forward.**
