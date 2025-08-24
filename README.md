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


## To Do

- Create booking.com and VRBO listings
- Improve apartment photo selection
- Purchase domain
- Find hosting solution
- Fix/finalize all links
- Proofread the French version
- fix CSS issue at the bottom of the page
