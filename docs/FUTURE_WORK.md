# Future work

Tracked items deferred from the initial engineering pass. Address before production scale or checkout launch.

---

## Rate limiting — `/api/contact`

**Status:** Not implemented (infrastructure dependency)

**Problem:** Serverless/edge instances cannot share in-memory counters, so per-IP throttling needs an external store.

**Recommended options (pick one when ready):**

1. **Upstash Redis + `@upstash/ratelimit`** — good fit for Vercel; ~5 requests/minute per IP on `/api/contact`
2. **Vercel KV** — same pattern if already on Vercel Pro
3. **CDN/WAF** — Cloudflare Rate Limiting in front of the site (no app code)

**Also in place today:** honeypot field (`website`) on the contact form.

**Files to touch:** `app/api/contact/route.ts`, `docs/FUTURE_WORK.md` (mark done)

---

## Checkout & payments

**Status:** Hybrid v1 — dual USD/INR prices + geo default + currency toggle; **Buy now** / cart open external `checkoutUrlUsd` / `checkoutUrlInr` from Sanity (PayPal/Gumroad). On-site API checkout deferred ~3 months.

**Before on-site checkout:**

- PayPal Business (ITIN) and/or Gumroad links per product in Studio
- Server-side cart validation; never trust client prices
- Webhook signature verification, idempotency keys, HTTPS-only
- OWASP top-10 review per `CLAUDE.md` / `agents.md` → invoke `payment-guard` agent
- Multi-tab cart concurrency (localStorage read-modify-write races)
- Secure digital delivery after payment

**Files to touch:** new `app/api/checkout/*`, extend `lib/cart.ts`, `CartSection.tsx`

---

## Product schema migration

Legacy Sanity products may still have the hidden `price` string field. New products use `priceAmount` + `priceCurrency`. `resolveProductPrice()` in `lib/money.ts` handles both. Optionally run a one-time Sanity migration script to backfill numeric fields.
