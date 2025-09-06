# Le Havre Aixois — Landing Page (Next.js)

A visually rich, bilingual (EN/FR) landing page for an Airbnb listing in Aix‑en‑Provence. Includes SEO (OpenGraph/Twitter/JSON‑LD) and a lightweight inquiry form that opens a pre‑filled email to your inbox.

## Prerequisites
- Node.js 18+
- npm (or pnpm/yarn)

## Quick Start
```bash
# 1) Install deps
npm install

# 2) Set your contact email (used by the inquiry form)
#    You can also create a .env.local file instead of exporting
export NEXT_PUBLIC_CONTACT_EMAIL="contact@havreaixois.com"

# 3) Run locally
npm run dev
# Visit http://localhost:3000

```

## Production build

```bash
# Build static site (outputs to ./out)
npm run build:static
```

## Docker (Nginx)

```bash
# Build container
docker build -t havreaixois:static .

# Run container
docker run --rm -p 3001:80 havreaixois:static
# Or use docker compose
docker compose up --build
# Visit http://localhost:3001
```

## To Do

- Improve apartment photo selection
- Purchase domain

- Fix/finalize all links
