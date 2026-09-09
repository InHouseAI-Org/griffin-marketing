import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Griffin Marketing - Integrated Marketing Service',
  description: 'Your Marketing Team. In Your Office. Backed by Ours. Griffin gives you a dedicated marketing resource working 25–30 hours a week from your office.',
  keywords: ['marketing services', 'dedicated marketing', 'marketing team', 'WhatsApp marketing', 'Meta Ads', 'Griffin Marketing'],
  authors: [{ name: 'Corevtech Innovations LLP' }],
  creator: 'Griffin Marketing',
  publisher: 'Corevtech Innovations LLP',
  openGraph: {
    title: 'Griffin Marketing - Your Marketing Team',
    description: 'Dedicated marketing resource working from your office, backed by our central team',
    url: 'https://griffinmarketing.com',
    siteName: 'Griffin Marketing',
    images: [{
      url: '/griffin-logo.jpg',
      width: 1200,
      height: 630,
      alt: 'Griffin Marketing',
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Griffin Marketing - Your Marketing Team',
    description: 'Dedicated marketing resource working from your office, backed by our central team',
    images: ['/griffin-logo.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
