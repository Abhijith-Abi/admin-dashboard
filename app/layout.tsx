import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://admin-dasboard.abisolutions.online'),
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
  description: 'Production-ready Admin Dashboard built with Next.js',
  keywords: ['Admin', 'Dashboard', 'React', 'Next.js', 'Tailwind CSS'],
  authors: [{ name: 'Admin Team' }],
  icons: {
    icon: '/globe.svg',
    apple: '/globe.svg',
    shortcut: '/globe.svg',
  },
  openGraph: {
    title: 'Admin Dashboard',
    description: 'Production-ready Admin Dashboard built with Next.js',
    url: '/',
    siteName: 'Admin Dashboard',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard',
    description: 'Production-ready Admin Dashboard built with Next.js',
    images: ['/images/opengraph-image.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
