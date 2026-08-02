# Le Havre Aixois

A modern, bilingual (EN/FR) landing page for a vacation rental property in Aix-en-Provence, France. Built with Next.js, featuring GDPR-compliant contact forms, cookie consent, and optimized performance.

## ✨ Features

- 🌍 **Bilingual** - Full English and French translation support
- 📱 **Responsive Design** - Beautiful on all devices
- 🎨 **Modern UI** - Tailwind CSS with custom gradient accents
- 🖼️ **Image Carousels** - Showcasing property and local attractions
- 📧 **Contact Forms** - Google Apps Script backend with GDPR consent
- 🍪 **Cookie Consent** - EU-compliant cookie banner with privacy policy
- 🚀 **Performance Optimized** - Lazy loading, code splitting, optimized images
- 🔍 **SEO Ready** - OpenGraph, Twitter Cards, JSON-LD structured data
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🎯 **Analytics** - Google Analytics 4 with consent mode

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.33 (React 18)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: Google Apps Script backend
- **Cookie Consent**: vanilla-cookieconsent
- **Analytics**: Google Analytics 4
- **Hosting**: Railway (EU region)
- **Language**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/havreaixois.git
cd havreaixois

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Or build static site
npm run build:static

# Start production server
npm start
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t havreaixois:latest .

# Run container (CONTACT_ENDPOINT is read at runtime, not build time)
docker run -p 3000:80 -e CONTACT_ENDPOINT="https://script.google.com/macros/s/YOUR_ID/exec" havreaixois:latest

# Or use Docker Compose
docker compose up --build
```

## 📝 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Google Apps Script endpoint for contact forms (server-only; proxied via app/api/contact)
CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Airbnb and VRBO listing URLs
NEXT_PUBLIC_AIRBNB_URL=https://airbnb.com/rooms/XXXXXXX
NEXT_PUBLIC_VRBO_URL=https://vrbo.com/XXXXXXX
```

### Contact Form Setup

The contact forms use Google Apps Script as a backend. See `google-apps-script/Code.gs` for the implementation. To set up:

1. Create (or open) the Google Sheet where inquiries should be logged.
2. From that Sheet: **Extensions > Apps Script**. This binds the script to the sheet, which the code requires (`SpreadsheetApp.getActiveSpreadsheet()` only resolves for a bound script — creating a standalone project at script.google.com will fail at runtime).
3. Paste in the code from `google-apps-script/Code.gs`, replacing the boilerplate.
4. Deploy as a web app with "Anyone" access
5. Use the deployment URL as `CONTACT_ENDPOINT` (server-only — do not use a `NEXT_PUBLIC_` prefix, or the URL will be exposed in the public JS bundle and callable by anyone, bypassing the site)

## 🎨 Customization

### Content

Edit `components/Landing.tsx` to update:
- Property descriptions and features
- Image paths and alt text
- Translation strings (EN/FR dictionary)
- Colors and styling

### Styling

- Tailwind config: `tailwind.config.mjs`
- Global styles: `app/globals.css`
- Primary color: Rose (customizable via Tailwind)

### Images

Place images in `public/photos/` and update the configuration in `components/Landing.tsx`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for a vacation rental in Aix-en-Provence
- Images showcasing the property and local area
- Inspired by modern vacation rental websites

## 📞 Contact

For questions or inquiries about this codebase, please open an issue on GitHub.

---

**Note**: This is a public template. Remove or replace property-specific images and content before using for your own project.
