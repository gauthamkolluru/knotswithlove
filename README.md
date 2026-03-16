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
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy        # from step 1
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_REVALIDATE_SECRET=choose-any-random-string
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
Then add products under **Products**, and posts under **Inspiration Feed**.
The website fetches from Sanity and shows content immediately on each page refresh during development.

---

## 5. Seed initial content (optional)

You can enter content directly in the Studio. Start with:

1. **Site Settings** — brand name, greeting, hero image
2. **Products** — add each product with photo, price, badge
3. **Inspiration Feed** — add posts with photos and captions
4. **About Me** — your story and values
5. **Contact** — your email, Instagram, WhatsApp

---

## 6. Deploy to Vercel

```bash
# Install Vercel CLI (once)
npm install -g vercel

# Deploy
vercel
```

During setup, add the same environment variables from `.env.local` to your Vercel project
(Settings → Environment Variables).

---

## 7. Set up instant revalidation webhook (makes updates go live in ~5 seconds)

After deploying to Vercel:

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **Webhooks**
2. Click **Add webhook** and fill in:
   - **Name**: `Revalidate Next.js`
   - **URL**: `https://your-site.vercel.app/api/revalidate?secret=your-secret`
     (use the same secret you put in `SANITY_REVALIDATE_SECRET`)
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **HTTP method**: `POST`
3. Save.

Now every time Harshita publishes in the Studio, the site updates within seconds.

---

## Project structure

```
app/
  layout.tsx                    Root layout (fonts, metadata)
  page.tsx                      Main SPA page — fetches all data from Sanity
  globals.css                   All brand styles (colours, fonts, components)
  api/revalidate/route.ts       Webhook endpoint — triggers instant cache bust
  studio/[[...tool]]/page.tsx   Embedded Sanity Studio

components/
  Navbar.tsx                    Fixed navbar with scroll transparency & cart badge
  Footer.tsx                    Footer
  sections/
    HomeSection.tsx             Hero with name, description, image
    ShopSection.tsx             Product grid with add-to-cart
    InspirationSection.tsx      Instagram-style photo grid
    AboutSection.tsx            Story + values cards
    ContactSection.tsx          Contact channels + message form
    CartSection.tsx             localStorage cart with table & summary

sanity/
  schemas/                      Content schemas (product, post, about, contact, settings)
  lib/client.ts                 Sanity client + fetch helper
  lib/queries.ts                GROQ queries for each section
  env.ts                        Env variable validation

lib/
  imageUrl.ts                   Sanity image URL builder helper
```

---

## Content management quick reference (for Harshita)

| I want to… | Go to… |
|---|---|
| Add / edit a product | Studio → Products → + Create |
| Add a new inspiration photo | Studio → Inspiration Feed → + Create |
| Update my story or photo | Studio → About Me |
| Change contact details | Studio → Contact |
| Update site name or hero | Studio → Site Settings |

After clicking **Publish** in the Studio, the website updates automatically within a few seconds.
