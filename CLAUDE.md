# Knots With Love — Claude Code Instructions

## Monorepo engineering standards (`11-projects`)

This project lives under the **`11-projects`** monorepo. Before substantive code or documentation changes, **locate the monorepo root** by walking up parent directories until you find **`ENGINEERING_GUIDELINES_VERBATIM.md`**, then:

1. Read and follow **`ENGINEERING_GUIDELINES_VERBATIM.md`** (canonical standards for humans and all agents).
2. Apply **`.cursor/rules/*.mdc`** from that root (treat as binding project standards; YAML frontmatter may be skipped outside Cursor).
3. Optional review workflow: **`.cursor/skills/grill-me/SKILL.md`** at that root.

If `ENGINEERING_GUIDELINES_VERBATIM.md` cannot be found (standalone checkout), ignore this section.

When adding **another** new project under `11-projects`, add **`CLAUDE.md`** and **`AGENTS.md`** at its root and include this same section.

---

This is a Next.js 15 + Sanity v3 e-commerce website for selling crochet patterns and products (knotswithlove.org). Content is managed by a non-technical user (Harshita) via Sanity Studio at `/studio`.

## Stack
- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity v3 (embedded studio at `/studio`, on-demand ISR revalidation)
- **Styling:** Plain CSS (`app/globals.css`), brand fonts: Dancing Script + Mulish
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
