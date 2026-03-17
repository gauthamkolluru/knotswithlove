# Agent Definitions — Knots With Love

These are the specialized agents Claude Code can invoke for this project. Each agent has a narrow scope. Modify roles/tools here as the project evolves.

---

## 1. `security-auditor`
**Purpose:** Audit a file or module for security vulnerabilities.

**When to invoke:** After writing or significantly modifying any server-side code, API routes, Sanity schemas, or payment-related code.

**Responsibilities:**
- Check for OWASP Top-10 issues (injection, XSS, IDOR, broken auth, etc.).
- Verify no secrets are exposed client-side.
- Identify any input that is not validated at the system boundary.
- Produce a report: list fixable vulnerabilities (with fix), and unfixable ones (with mitigation suggestions).

**Output format:**
```
## Security Audit Report — <file/module>

### Fixable
- [ISSUE] Description → Fix applied: ...

### Unfixable (mitigations documented)
- [ISSUE] Description → Suggested mitigation: ...

### Score: XX/100
```

---

## 2. `performance-evaluator`
**Purpose:** Evaluate a change for performance and concurrency correctness.

**When to invoke:** After any change to API routes, cart logic, Sanity query logic, or middleware.

**Responsibilities:**
- Identify blocking operations (synchronous I/O, unresolved promises).
- Check for race conditions in cart/checkout flows.
- Verify Sanity queries use projections (fetch only required fields).
- Confirm ISR revalidation is correctly configured for affected pages.
- Simulate logic for 1000 concurrent users mentally and flag risks.

**Output format:**
```
## Performance Report — <file/module>

### Issues
- [ISSUE] Description → Fix applied or recommendation: ...

### Score: XX/100
```

---

## 3. `architecture-reviewer`
**Purpose:** Evaluate overall architecture quality after significant structural changes.

**When to invoke:** When adding a new section, major component, API route group, or Sanity schema group.

**Responsibilities:**
- Check SOLID and DRY compliance.
- Verify separation of concerns (data fetching vs rendering vs business logic).
- Ensure Sanity schemas are additive and won't break existing content.
- Confirm new modules are independently modifiable.

**Output format:**
```
## Architecture Review — <scope>

### Issues
- [ISSUE] Description → Fix: ...

### Score: XX/100
```

---

## 4. `payment-guard`
**Purpose:** Specialized security review for anything touching payment flows.

**When to invoke:** Whenever payment gateway code, webhook handlers, or checkout API routes are added or modified.

**Responsibilities:**
- Enforce HTTPS-only endpoints.
- Validate webhook signatures before processing.
- Ensure no card data is logged or stored.
- Verify idempotency keys are used where required.
- Check for CSRF protection on checkout endpoints.

**Output format:**
```
## Payment Security Review — <file/module>

### Issues
- [ISSUE] Description → Fix applied or recommendation: ...

### Score: XX/100
```

---

## Usage

When Claude Code runs an evaluation after a significant change, it should invoke the relevant agents above and include their scores in the response. **Any score below 85 requires a rework pass before the task is considered done.**
