# Precision Tradework

Professional renovation and finishing services website for Precision Tradework, serving Barrie, Simcoe County, and Muskoka.

**Live Site:** [precisiontradework.ca](https://precisiontradework.ca)

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Maps:** Mapbox GL JS
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend API
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel

## Features

- Responsive design optimized for mobile and desktop
- Service pages with detailed information and FAQs
- Multi-step contact form with validation
- Interactive service area map
- SEO optimized with Open Graph/Twitter cards
- Cookie consent and privacy compliance
- Rate limiting and honeypot spam protection

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/BradleyExton/precision-tradework.git
cd precision-tradework

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── faq/
│   ├── privacy/
│   └── services/[slug]/
├── components/          # React components
│   ├── analytics/
│   ├── contact/
│   ├── forms/
│   ├── home/
│   ├── layout/
│   └── ui/
├── lib/                 # Utilities and data
└── types/               # TypeScript types
```

## License

Private - All rights reserved.
