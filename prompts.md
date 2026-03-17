# Reusable Prompts — Knots With Love

Copy and adapt these prompts when asking Claude Code to perform recurring tasks. They encode the project's non-negotiable standards so you don't have to repeat them each time.

---

## Add a New Section / Page

```
Add a new [section name] section to the website.

Requirements:
- Component at components/sections/[SectionName].tsx
- Sanity schema at sanity/schemas/[sectionName].ts (additive, do not break existing schemas)
- Fetch data in the relevant page using a Sanity GROQ query with projections (select only needed fields)
- Use existing brand fonts (Dancing Script for headings, Mulish for body) and Tailwind
- Fallback static content in the component so the page renders before Sanity is seeded

After implementation, run the Evaluation Checklist from CLAUDE.md and report scores.
```

---

## Fix a Bug

```
Fix the bug: [describe bug]

- Read the relevant file(s) before making changes.
- Make the minimal change necessary — do not refactor surrounding code.
- Do not add comments or error handling beyond what is strictly needed.
- After the fix, check if any security or concurrency issue was introduced and report.
```

---

## Add / Modify an API Route

```
Add/modify the API route at app/api/[route]/route.ts for: [purpose]

Requirements:
- Validate all inputs at the boundary (never trust client data).
- Use async/await correctly — no blocking operations.
- Do not expose secrets. Use server-only environment variables.
- Return consistent JSON responses with appropriate HTTP status codes.

After implementation, run:
1. Security audit (security-auditor agent)
2. Performance evaluation (performance-evaluator agent)
Report scores. Rework any dimension below 85.
```

---

## Payment Gateway Integration

```
Integrate [payment provider] into the checkout flow.

Requirements (NON-NEGOTIABLE):
- All endpoints HTTPS only.
- Validate webhook signatures before processing any event.
- Never log or store raw card data.
- Use idempotency keys on charge requests.
- CSRF protection on all checkout endpoints.
- Confirm PCI-DSS scope is minimized (use hosted fields / redirect flows where possible).

After implementation, run the payment-guard agent review. Score must be ≥ 85.
```

---

## Security Audit (ad hoc)

```
Run a security audit on [file or module].

Use the security-auditor agent definition from agents.md.
Produce the full report with fixable and unfixable issues.
Fix all fixable issues in the code.
Document unfixable ones with mitigation suggestions in a comment block at the top of the file.
Report the final score.
```

---

## Evaluate Current State

```
Evaluate the current state of [file/module/feature] against all five dimensions in the Evaluation Checklist from CLAUDE.md:
- Software Principles
- Architecture
- Security
- Resilience
- Async / Concurrency

Score each 1–100. For any score below 85, identify the specific issue and fix it, then re-score.
```

---

## Concurrency / Load Test Logic Review

```
Review [file or feature] for correctness under 1000 concurrent users all performing [action: e.g. add-to-cart / checkout].

Check for:
- Race conditions in shared state (cart, inventory counts)
- Unhandled promise rejections under load
- Missing optimistic locking or idempotency
- Sanity rate limits — are requests batched or throttled?

Report issues found and fixes applied. Score with the performance-evaluator agent.
```
