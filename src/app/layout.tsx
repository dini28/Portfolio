import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Silkscreen } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './globals.css';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const silkscreen = Silkscreen({
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
  weight: ['400', '700'],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dipeshsoni.vercel.app'),
  title: 'Dipesh Soni | UI/UX Designer & Frontend Developer',
  description:
    'UI/UX Designer at Toba Tech and frontend developer working with Figma, React, Next.js and Tailwind CSS. B.Tech Computer Science, Udaipur.',
  authors: [{ name: 'Dipesh Soni' }],
  keywords: [
    'Dipesh Soni',
    'Frontend Developer',
    'UI/UX Designer',
    'React',
    'TypeScript',
    'Next.js',
    'Portfolio',
    'Tailwind CSS',
  ],
  openGraph: {
    type: 'website',
    title: 'Dipesh Soni | UI/UX Designer & Frontend Developer',
    description:
      'UI/UX Designer at Toba Tech and frontend developer working with Figma, React, Next.js and Tailwind CSS.',
    images: [{ url: '/preview.jpg', width: 1200, height: 630 }],
    siteName: 'Dipesh Soni Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dipesh Soni | UI/UX Designer & Frontend Developer',
    description:
      'UI/UX Designer at Toba Tech and frontend developer working with Figma, React, Next.js and Tailwind CSS.',
    images: ['/preview.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${silkscreen.variable} dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- the root layout covers every route; Geom is not in next/font, and an @import in globals.css lands after next/font's @font-face rules, which voids it. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100..900;1,100..900&family=Geom:ital,wght@0,300..900;1,300..900&display=swap"
        />
      </head>
      <body className="font-sans bg-ink text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ErrorBoundary>
          <Analytics />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
