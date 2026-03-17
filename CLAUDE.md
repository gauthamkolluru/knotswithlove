# Knots With Love — Claude Code Instructions

This is a Next.js 15 + Sanity v3 e-commerce website for selling crochet patterns and products (knotswithlove.org). Content is managed by a non-technical user (Harshita) via Sanity Studio at `/studio`.

## Stack
- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity v3 (embedded studio at `/studio`, on-demand ISR revalidation)
- **Styling:** Tailwind CSS, brand fonts: Dancing Script + Mulish
- **Cart:** localStorage + custom `kwl_cart_updated` events

## Core Principles (NON-NEGOTIABLE)

### 1. Sustainability & Maintainability
- Prefer simple, standard patterns over clever abstractions.
- Avoid dependencies that are poorly maintained or niche.
- Code must be readable and modifiable by a future developer with no context.

### 2. Modularity
- Every section/component must be independently modifiable without breaking others.
- Sanity schemas must be additive — never break existing content structures.

### 3. Security
- Always document vulnerabilities found in code — both fixable and unfixable ones.
- Fixable vulnerabilities must be fixed before the code is considered complete.
- Unfixable ones must be highlighted with mitigation suggestions.
- Payment gateway integration (upcoming): apply all OWASP top-10 mitigations, enforce HTTPS, never log card data, validate webhooks with signatures.
- Never expose secrets in client-side code. Use environment variables and `NEXT_PUBLIC_` prefix only for genuinely public values.

### 4. Performance & Concurrency
- Code must handle 1000 concurrent users adding/checking out products without race conditions or data loss.
- Use async/await correctly — never block the event loop.
- Use ISR + on-demand revalidation to minimize server load.
- Sanity queries must be efficient (select only required fields, use projections).

### 5. Evaluation Checklist (run on every significant change)
Score each dimension 1–100. If any score is below 85, rework that dimension before moving on.

| Dimension | What to evaluate |
|---|---|
| Software Principles | SOLID, DRY, separation of concerns |
| Architecture | Layering, data flow, API design |
| Security | OWASP top-10, secrets, auth |
| Resilience | Error boundaries, fallbacks, retry logic |
| Async / Concurrency | Correct use of async, no race conditions |

## Workflow Rules
- Read files before modifying them.
- Do not create new files unless strictly necessary.
- Do not add comments or docstrings to code you didn't change.
- Do not add features beyond what was asked.
- After implementing a significant change, run the Evaluation Checklist and report scores inline.
