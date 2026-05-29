# Knots with Love — Next.js + Sanity

Single-page website for Knots with Love, rebuilt with Next.js 15 and Sanity v3.
Harshita manages all content (products, inspiration posts, about, contact) through
the Sanity Studio at `/studio`. Changes go live in seconds via on-demand revalidation.

---

## Prerequisites

- Node.js 18+
- A free [Sanity](https://sanity.io) account

---

## 1. Create a Sanity project

```bash
# Install the Sanity CLI globally (once)
npm install -g sanity@latest

# Log in (opens browser)
sanity login

# Create a new project — choose "production" as the dataset name
sanity init --bare
```

> Note the **Project ID** shown after creation (e.g. `abc123xy`).

---

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_REVALIDATE_SECRET=choose-any-random-string
SANITY_WRITE_TOKEN=your_write_token
RESEND_API_KEY=your_resend_key
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=hello@example.com
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Run locally

```bash
npm run dev
```

| URL | What it is |
|-----|-----------|
| `http://localhost:3000` | The website |
| `http://localhost:3000/studio` | Sanity Studio (content management portal) |

Open the Studio, click **Site Settings**, and fill in your name, description, and hero image.
Then add products under **Products** (use **Price amount** + **Currency**), and posts under **Inspiration Feed**.

---

## 5. Tests

```bash
npm test          # Vitest unit tests (money, contact validation)
npm run test:e2e  # Playwright smoke tests (starts dev server)
```

---

## 6. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add the same environment variables from `.env.local` to your Vercel project.

---

## 7. Set up instant revalidation webhook

After deploying:

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **Webhooks**
2. Add webhook URL: `https://your-site.vercel.app/api/revalidate?secret=your-secret`
3. Trigger on Create / Update / Delete, method POST

---

## Project structure

See **`CODEBASE_INDEX.md`** for symbol lookup.

```
app/                 Pages, API routes, globals.css
components/          Navbar, Footer, section components
lib/                 cart, money, logger, contact validation
sanity/              Schemas, queries, types, client
docs/FUTURE_WORK.md  Rate limiting & checkout (deferred)
```

---

## Content management (for Harshita)

| I want to… | Go to… |
|---|---|
| Add / edit a product | Studio → Products → set Price amount + Currency |
| View contact form submissions | Studio → Contact Submissions |
| Add inspiration photo | Studio → Inspiration Feed |
| Update story / contact / settings | Studio → About Me / Contact / Site Settings |

Prices display consistently site-wide via `formatMoney` (USD and INR, with decimals).

Deferred work (rate limiting, checkout): **`docs/FUTURE_WORK.md`**.
