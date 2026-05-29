# Codebase index — Knots With Love

Terse lookup for symbols, routes, and commands. Update on every code change.

## Entry points

| Name | Where | What |
|------|-------|------|
| `Home` | `app/page.tsx` | Server page; fetches all Sanity sections in parallel |
| `RootLayout` | `app/layout.tsx` | Metadata, fonts, global shell |
| `StudioPage` | `app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio |

## API routes

| Name | Where | What |
|------|-------|------|
| `POST` contact | `app/api/contact/route.ts` | Validates form, saves to Sanity, sends email via Resend |
| `POST` revalidate | `app/api/revalidate/route.ts` | Webhook; `revalidatePath('/')` when secret matches |

## Lib

| Name | Where | What |
|------|-------|------|
| `logger` | `lib/logger.ts` | Structured JSON logging (server + client) |
| `formatMoney`, `resolveProductPrice`, `parseLegacyPriceString`, `sumMoney`, `lineTotal` | `lib/money.ts` | USD/INR formatting and cart math |
| `loadCart`, `addToCart`, `removeFromCart`, `cartItemCount`, `cartItemMoney` | `lib/cart.ts` | localStorage cart + `kwl_cart_updated` event |
| `validateContactBody`, `buildEmailSubject`, `resolveContactDeliveryStatus` | `lib/contact/validate.ts` | Contact API validation and delivery status |
| `urlFor` | `lib/imageUrl.ts` | Sanity image URL builder |
| `DEFAULT_BRAND_NAME` | `lib/constants.ts` | Shared brand default string |

## Sanity

| Name | Where | What |
|------|-------|------|
| `sanityFetch` | `sanity/lib/client.ts` | Read client fetch with 60s revalidate |
| `productsQuery`, etc. | `sanity/lib/queries.ts` | GROQ queries per section |
| `Product`, `SiteSettings`, … | `sanity/lib/types.ts` | Shared CMS TypeScript types |
| Schemas | `sanity/schemas/*.ts` | product, inspirationPost, about, contact, siteSettings, contactSubmission |

## Components

| Name | Where | What |
|------|-------|------|
| `Navbar` | `components/Navbar.tsx` | Nav, scroll state, cart badge via `lib/cart` |
| `ShopSection` | `components/sections/ShopSection.tsx` | Product grid; `formatMoney` for display |
| `CartSection` | `components/sections/CartSection.tsx` | Cart table; consistent `formatMoney` |
| `ContactSection` | `components/sections/ContactSection.tsx` | Form + honeypot; partial delivery messages |
| Other sections | `components/sections/*.tsx` | Home, Inspiration, About, Contact |

## Data flow

1. `app/page.tsx` → `sanityFetch` + GROQ → section components (with fallbacks)
2. Shop → `addToCart(name, money)` → localStorage → `CART_EVENT` → Navbar + CartSection
3. Contact form → `POST /api/contact` → Sanity + Resend → JSON `{ status, message }`

## Commands

| Command | What |
|---------|------|
| `npm run dev` | Dev server (:3000) + Studio (/studio) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright e2e |

## Conventions

- Prices: `priceAmount` + `priceCurrency` in Sanity; display via `formatMoney` only
- Styling: plain CSS in `app/globals.css` (not Tailwind)
- Agent docs: `CLAUDE.md`, `AGENTS.md`, specialized roles in `agents.md`
- Deferred work: `docs/FUTURE_WORK.md`
