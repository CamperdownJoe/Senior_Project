import { Metadata } from 'next';
import { site_url } from '@/config/site';

export const metadata: Metadata = {
  title: 'Remove Duplicate Bookmarks | Clean Up Your Bookmark Collection',
  description: 'Easily identify and remove duplicate bookmarks from your collection. Streamline your bookmarks with our AI-powered duplicate detection tool.',
  keywords: [
    'remove duplicate bookmarks',
    'clean up bookmarks quickly',
    'delete duplicate URLs',
    'AI bookmark cleanup tool',
    'automatically remove duplicate bookmarks',
    'best tool for removing duplicate bookmarks',
    'bookmark management tool',
    'remove redundant bookmarks fast',
    'automated bookmark deduplication',
    'best bookmark manager for removing duplicates',
    'how to clean duplicate bookmarks in Chrome',
    'fix duplicate bookmarks across browsers'
  ],
  openGraph: {
    title: 'Remove Duplicate Bookmarks',
    description: 'Clean up your bookmark collection by removing duplicates',
    url: `${site_url}/remove-duplicate-bookmarks`, 
    siteName: 'AI Bookmark Manager',
    images: [
      {
        url: `${site_url}/og-remove-duplicate-bookmarks.png`, // Create this image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Duplicate Bookmarks',
    description: 'Clean up your bookmark collection by removing duplicates',
    images: [`${site_url}/og-remove-duplicate-bookmarks.png`], // Same as OG image
  },
};

export default function RemoveDuplicateBookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}