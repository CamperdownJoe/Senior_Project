import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import { site_url } from "@/config/site";
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(site_url),
  title: {
    default: 'AI Bookmark Manager | Organize Your Bookmarks Effortlessly',
    template: '%s | AI Bookmark Manager'
  },
  description: 'Streamline your browsing with our AI-powered Bookmark Manager. Remove duplicates, fix broken links, and automatically categorize your bookmarks.',
  keywords: ['AI bookmarks', 'organize bookmarks', 'remove duplicate bookmarks', 'fix broken bookmarks', 'export bookmarks', 'merge bookmarks'],
  authors: [{ name: 'Markly' }],
  creator: 'Markly',
  publisher: 'Markly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AI Bookmark Manager',
    description: 'Organize your bookmarks with AI-powered tools',
    url: site_url,
    siteName: 'AI Bookmark Manager',
    images: [
      {
        url: `${site_url}/og.png`, 
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'AI Bookmark Manager',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile />
      <NavBar scroll={true} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Script id="schema-org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Bookmark Manager",
            "url": "${site_url}",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${site_url}/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </Script>
    </div>
  );
}
