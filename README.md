# Griffin Marketing

A standalone Next.js project for the Griffin Marketing landing page.

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create a static export in the `out` folder that can be deployed to any static hosting service.

### Start Production Server

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
griffin-marketing-nextjs/
├── app/
│   ├── GriffinMarketing.tsx  # Main component
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/
│   └── griffin-logo.jpg       # Logo asset
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## Features

- **Griffin Marketing Landing Page** - Complete marketing page with:
  - Hero section with model diagram
  - Problem/Solution sections
  - Service offerings
  - Capabilities grid
  - Team structure visualization
  - Pricing plans
  - WhatsApp marketing details
  - Multi-channel marketing
  - SEO + GEO services
  - Industry focus areas
  - Case studies
  - Contact form
  - Full footer

- **Built with:**
  - Next.js 15 (App Router)
  - TypeScript
  - React 18
  - Google Fonts (Sora)
  - Responsive design
  - Static export ready

## Deployment

The project is configured with `output: 'export'` in `next.config.js`, making it ready for static deployment to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

Simply run `npm run build` and deploy the `out` folder.

## License

Copyright © 2026 Griffin Marketing. All rights reserved.
