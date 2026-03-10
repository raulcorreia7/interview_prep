# Pastebin Backend Prep Plan

## Goal

Build one evolving TypeScript backend PoC to regain speed and practice software engineering patterns and backend fundamentals.

## Stack

- TypeScript
- Hono
- Zod
- Drizzle
- Vitest

## Primary objectives

- practice clean code and layering
- apply SOLID pragmatically
- use interfaces/contracts intentionally
- keep controllers thin
- keep business logic in services
- abstract persistence behind repositories
- evolve persistence from memory to SQLite to Postgres
- maintain unit, integration, and e2e tests from the start

---

## Architecture

### Layers

- **app**: wiring, routes, middleware, composition root
- **controllers**: HTTP in/out only
- **services**: business rules and orchestration
- **models**: types, schemas, domain errors, constants
- **repo**: persistence contracts and implementations
- **util**: small generic helpers

### Dependency direction

- controller -> service -> repo
- service -> models
- repo -> models
- app wires implementations together

### Rules

- controllers do not contain business logic
- services do not know Hono or DB details
- repositories do not enforce business rules
- validation happens at boundaries with Zod
- domain/app errors are explicit
- abstractions must pay for themselves

---

## Folder structure

```txt
src/
  app/
    app.ts
    routes.ts
    container.ts
    middleware.ts

  controllers/
    paste.controller.ts

  services/
    paste.service.ts
    paste.service.interface.ts

  models/
    paste.types.ts
    paste.schemas.ts
    paste.errors.ts
    paste.constants.ts

  repo/
    paste.repository.ts
    memory/
      paste.memory.repo.ts
    drizzle/
      client.ts
      schema.ts
      paste.drizzle.repo.ts

  util/
    slug.ts
    time.ts
    env.ts
    pagination.ts

  index.ts

tests/
  unit/
  integration/
  e2e/
```

---

## Domain

### Entity: Paste

Fields:

- `id`
- `slug`
- `title`
- `content`
- `language`
- `visibility`
- `expiresAt`
- `createdAt`
- `updatedAt`

### Initial API

- `POST /pastes`
- `GET /pastes/:slug`
- `GET /pastes`
- `DELETE /pastes/:slug`

### Initial constraints

- anonymous pastes only
- no frontend
- no auth at first
- no premature production complexity

---

## Interfaces

### Repository

Define the contract first. Implementations must be swappable:

- memory
- SQLite
- Postgres

### Service

Expose business operations only:

- create paste
- get paste by slug
- list pastes
- delete paste

---

## Testing strategy

### Unit

Pure logic and service behavior:

- service rules
- schema validation
- util helpers

### Integration

Real collaboration between components:

- repo implementations
- controller/service wiring

### E2E

Public API flows through the running app:

- create
- fetch
- list
- delete

---

## Iteration plan

### 0. Setup

- create repo
- add TS, Hono, Zod, Vitest
- create folder structure
- add `/health`

### 1. Core vertical slice

- build paste CRUD with in-memory repo
- add controller/service/repo split
- add interfaces
- add tests in all 3 layers

### 2. Validation and errors

- validate request bodies and query params with Zod
- add explicit domain errors
- standardize HTTP error mapping

### 3. SQLite

- add Drizzle schema
- implement SQLite repo
- keep service contract unchanged

### 4. Querying

- add filtering
- add pagination
- add sort order
- keep query handling clean

### 5. Expiration

- allow optional expiration
- expired paste reads return `410`
- exclude expired from list by default

### 6. Postgres

- add Postgres repo with Drizzle
- keep external behavior unchanged
- validate persistence portability

### 7. Refactor pass

- improve naming
- reduce duplication
- verify responsibilities
- document architectural choices

### 8. Auth and ownership

- add user context
- add ownership rules
- private pastes only visible to owner
- keep access logic in service layer

### 9. One production concern

Choose one:

- cleanup job for expired pastes
- audit logging
- rate limiting

### 10. Polish

- write README
- explain architecture
- document tradeoffs
- prepare interview talking points

---

## Engineering checklist

Use this continuously:

- is the controller thin?
- is the service the owner of business rules?
- does the service depend on abstractions only?
- can persistence be swapped without major rewrites?
- is validation at the boundary?
- are interfaces small and focused?
- are tests aligned with the layer?
- is this abstraction useful or just ceremony?

---

## Non-goals

- frontend
- microservices
- queues early
- event buses
- overengineered clean architecture
- unnecessary libraries
- patterns without clear value

---

## Deliverable standard

Each iteration is done when:

- the scope is implemented
- tests exist at the right level
- code respects the layering rules
- the architecture remains easy to explain in 2–3 minutes

If you want, I can turn this into a `README.md`-style project charter next.
