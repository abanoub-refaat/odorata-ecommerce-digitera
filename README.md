# Odorata | Artisanal Fragrance Storefront

A responsive e-commerce storefront for a fictional luxury perfume house. Browse hand-blended fragrances by scent family, occasion, and collection, view product details, and manage a shopping cart.

**[Live Demo](https://odorata-mu.vercel.app)**

## Features

- **Product catalog** with search, filtering, and sorting
- **Scent-family browsing** (Floral, Woody, Oriental, Fresh)
- **Occasion curations** (personal ritual, ceremonial, gift sets, milestones)
- **Collections and categories** (Pure Extractions, Private Reserve, Atelier Oils, Discovery Vault)
- **Product detail pages** with dynamic routes
- **Shopping cart** with line items and totals, managed with Zustand
- **URL-driven filters**, so filtered views are shareable and survive refresh
- **Responsive design** across mobile, tablet, and desktop

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Data fetching | TanStack Query |
| State | Zustand (cart) |
| Testing | Jest, Cypress |
| Tooling | ESLint, Prettier, pnpm |
| Deployment | Vercel |

## Getting Started

**Prerequisites:** Node.js 20+ and pnpm 10+ (`corepack enable` is recommended).

```bash
git clone https://github.com/abanoub-refaat/perfume-ecommerce-digitera.git
cd perfume-ecommerce-digitera
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_USE_MOCK_API` | `true` (default) serves in-repo mock product data. Set to `false` once a real API exists. |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the catalog API. Leave empty while mocks are enabled. |

> **Note:** There is currently no backend. Product data is mocked in `src/features/products/services/`.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm typecheck` | Run the TypeScript compiler checks |
| `pnpm lint` | Lint with ESLint |
| `pnpm test` | Run Jest unit tests |
| `pnpm test:e2e` | Run Cypress end-to-end tests (app must be running) |
| `pnpm cypress:open` | Open the Cypress runner |

## Project Structure

The codebase is organized by feature. Routes stay thin and each feature owns its UI, hooks, services, types, and state.

```
src/
├── app/                 # Routes: map URLs to features
├── features/
│   ├── products/        # Catalog, search, filters, sorting, details
│   └── cart/            # Cart page, line items, totals, add-to-cart
├── components/ui/       # Shared UI primitives
└── lib/                 # Shared helpers
```

Each feature follows the same shape:

```
components/   hooks/   services/   store/   types/   utils/   index.ts
```

**Conventions**

- Features do not import each other's internals; they communicate through each feature's public `index.ts`.
- Server/cache state lives in TanStack Query; client state (the cart) lives in Zustand.
- Shared code stays minimal and genuinely reusable.

## Roadmap

Planned next steps to turn this into a full-stack application:

- [ ] REST API with NestJS, PostgreSQL, and Prisma
- [ ] Authentication (JWT) with user and admin roles
- [ ] Server-side persistent carts
- [ ] Orders and checkout with Stripe (test mode)
- [ ] Admin dashboard for product and order management
- [ ] CI pipeline and API documentation

## Author

**Abanoub Refaat**

- GitHub: [@abanoub-refaat](https://github.com/abanoub-refaat)
- LinkedIn: [abanoubrefaat](https://www.linkedin.com/in/abanoubrefaat/)
