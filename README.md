# TechMart

A full-stack electronics e-commerce application built with React, TypeScript, and Supabase — product catalogue, cart and checkout, user authentication, an admin dashboard, and two AI-assisted features running as Supabase Edge Functions: dynamic price prediction and transaction fraud detection.

![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF.svg)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%7C%20DB%20%7C%20Edge-3ECF8E.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4.svg)

<!-- If the UI was scaffolded from a template or generator, say so here in one line:
     "Initial UI scaffold generated with <tool>; all data layer, auth, cart logic and
     edge functions written by me." Then rename `vite_react_shadcn_ts` in package.json
     to `techmart` and delete this comment. -->

---

## Features

**Storefront**
- Product catalogue with category browsing, search, and detail views
- Deals page for discounted listings
- Persistent cart backed by React context
- Checkout flow with a payment modal
- Support page and user profile management

**Accounts**
- Email/password authentication via Supabase Auth
- Session-aware routing — protected profile and admin routes
- Per-user cart and order history

**Admin**
- Dashboard for product and inventory management
- Order overview with sales charts (Recharts)

**AI-assisted (Supabase Edge Functions)**
- `predict-price` — suggests a listing price from product attributes and category comparables
- `detect-fraud` — scores checkout transactions for anomalous patterns before order confirmation

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript, Vite |
| Routing | React Router |
| Styling | Tailwind CSS, shadcn/ui (Radix primitives) |
| State / data | React Context (auth, cart), TanStack Query |
| Forms & validation | React Hook Form + Zod |
| Backend | Supabase — Postgres, Auth, Row Level Security, Edge Functions (Deno) |
| Charts | Recharts |
| Icons / toasts | lucide-react, sonner |

---

## Project structure

```
techmart-web-forge/
├── src/
│   ├── components/          # Navbar, HeroSection, ProductCard,
│   │   ├── products/        # FeaturedProducts, PaymentModal, Footer
│   │   └── ui/              # shadcn/ui primitives
│   ├── pages/               # Index, Products, Deals, Cart, Auth,
│   │                        # Profile, Admin, Support, NotFound
│   ├── contexts/            # AuthContext, CartContext
│   ├── services/            # productService.ts, aiService.ts
│   ├── integrations/supabase/  # Client and generated types
│   ├── hooks/  lib/  data/
│   └── App.tsx
├── supabase/
│   ├── config.toml
│   └── functions/
│       ├── predict-price/
│       └── detect-fraud/
└── vite.config.ts
```

---

## Getting started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier is enough)

### Setup

```bash
git clone https://github.com/Shre2234/techmart-web-forge.git
cd techmart-web-forge
npm install
```

Create a `.env` file from the template below and fill in your own Supabase project values:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> Keep `.env` out of version control — commit a `.env.example` with empty values instead. The anon key is designed to be publishable, but it is only safe when Row Level Security is enabled on every table.

```bash
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint
```

### Deploying the edge functions

```bash
supabase link --project-ref <your-project-ref>
supabase functions deploy predict-price
supabase functions deploy detect-fraud
```

---

## Database

Tables live in Supabase Postgres with RLS policies restricting rows to their owning user:

| Table | Purpose |
|---|---|
| `products` | Catalogue: name, category, price, stock, images |
| `cart_items` | Per-user cart lines |
| `orders` / `order_items` | Placed orders and their contents |
| `profiles` | User profile data linked to `auth.users` |

<!-- Adjust to match your actual schema, and consider committing the SQL migrations
     under supabase/migrations/ so the project is reproducible from a clean project. -->

---

## Limitations & roadmap

- Payments are simulated through the modal — no live payment gateway integration yet
- Fraud scoring uses heuristic rules over transaction features, not a trained model
- No server-side rendering or SEO metadata per product
- Planned: Stripe/Razorpay checkout, product reviews, wishlist, order-status emails, and replacing the fraud heuristics with a model trained on labelled transaction data

---

## Author

**Shreyansh Singh** · [GitHub](https://github.com/Shre2234)
