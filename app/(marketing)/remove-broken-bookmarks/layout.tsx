import { Metadata } from 'next';
import { site_url } from '@/config/site';

export const metadata: Metadata = {
  title: 'Remove Broken Bookmarks | Clean Invalid URLs',
  description: 'Easily identify and remove broken or invalid URLs from your bookmarks. Clean up your bookmark collection with our AI-powered tool.',
  keywords: [
    'remove broken bookmarks',
    'clean up broken bookmarks',
    'fix invalid URLs in bookmarks',
    'AI bookmark cleanup tool',
    'bookmark management tool',
    'remove outdated links',
    'automated bookmark cleanup',
    'best bookmark manager for fixing broken links'
  ],
  openGraph: {
    title: 'Remove Broken Bookmarks',
    description: 'Clean up your bookmarks by removing invalid URLs',
    url: `${site_url}/remove-broken-bookmarks`, 
    siteName: 'AI Bookmark Manager',
    images: [
      {
        url: `${site_url}/og-remove-broken-bookmarks.png`,
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en-US',

    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Broken Bookmarks',
    description: 'Clean up your bookmarks by removing invalid URLs',
    images: [`${site_url}/og-remove-broken-bookmarks.png`], // Same as OG image
  },
};


export default function RemoveBrokenBookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}