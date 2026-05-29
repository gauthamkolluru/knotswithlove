# Agent instructions — Knots With Love

## Monorepo engineering standards (`11-projects`)

This project lives under the **`11-projects`** monorepo. Before substantive code or documentation changes, **locate the monorepo root** by walking up parent directories until you find **`ENGINEERING_GUIDELINES_VERBATIM.md`**, then:

1. Read and follow **`ENGINEERING_GUIDELINES_VERBATIM.md`** (canonical standards for humans and all agents).
2. Apply **`.cursor/rules/*.mdc`** from that root (treat as binding project standards; YAML frontmatter may be skipped outside Cursor).
3. Optional review workflow: **`.cursor/skills/grill-me/SKILL.md`** at that root.

If `ENGINEERING_GUIDELINES_VERBATIM.md` cannot be found (standalone checkout), ignore this section.

When adding **another** new project under `11-projects`, add **`CLAUDE.md`** and **`AGENTS.md`** at its root and include this same section.

---

## Project-specific context

- **Claude / stack overview:** **`CLAUDE.md`**
- **Code lookup:** **`CODEBASE_INDEX.md`**
- **Deferred work (rate limiting, checkout):** **`docs/FUTURE_WORK.md`**

---

# Specialized agent definitions

These are the specialized agents Claude Code can invoke for this project. Each agent has a narrow scope.

## 1. `security-auditor`

**Purpose:** Audit a file or module for security vulnerabilities.

**When to invoke:** After writing or significantly modifying any server-side code, API routes, Sanity schemas, or payment-related code.

**Responsibilities:**
- Check for OWASP Top-10 issues (injection, XSS, IDOR, broken auth, etc.).
- Verify no secrets are exposed client-side.
- Identify any input that is not validated at the system boundary.
- Produce a report: list fixable vulnerabilities (with fix), and unfixable ones (with mitigation suggestions).

## 2. `performance-evaluator`

**Purpose:** Evaluate a change for performance and concurrency correctness.

**When to invoke:** After any change to API routes, cart logic, Sanity query logic, or middleware.

**Responsibilities:**
- Identify blocking operations (synchronous I/O, unresolved promises).
- Check for race conditions in cart/checkout flows.
- Verify Sanity queries use projections (fetch only required fields).
- Confirm ISR revalidation is correctly configured for affected pages.

## 3. `architecture-reviewer`

**Purpose:** Evaluate overall architecture quality after significant structural changes.

**When to invoke:** When adding a new section, major component, API route group, or Sanity schema group.

**Responsibilities:**
- Check SOLID and DRY compliance.
- Verify separation of concerns (data fetching vs rendering vs business logic).
- Ensure Sanity schemas are additive and won't break existing content.

## 4. `payment-guard`

**Purpose:** Specialized security review for anything touching payment flows.

**When to invoke:** Whenever payment gateway code, webhook handlers, or checkout API routes are added or modified.

**Responsibilities:**
- Enforce HTTPS-only endpoints.
- Validate webhook signatures before processing.
- Ensure no card data is logged or stored.
- Verify idempotency keys are used where required.

## Usage

When Claude Code runs an evaluation after a significant change, it should invoke the relevant agents above and include their scores in the response. **Any score below 85 requires a rework pass before the task is considered done.**

See also **`docs/FUTURE_WORK.md`** for deferred checkout and rate-limiting work.
