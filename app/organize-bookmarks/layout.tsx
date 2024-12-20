import { Metadata } from 'next';
import { site_url } from '@/config/site';

export const metadata: Metadata = {
  title: 'Organize Bookmarks',
  description: 'Effortlessly organize and categorize your bookmarks with AI. Automatically remove duplicates, fix broken links, and create a customized structure for seamless browsing. Experience smarter bookmark management today!',
  keywords: [
    'organize bookmarks',
    'AI bookmark organizer',
    'smart bookmark sorting',
    'categorize bookmarks automatically',
    'remove duplicate bookmarks',
    'fix broken bookmarks quickly',
    'best bookmark manager',
    'customize bookmark structure',
    'AI-powered bookmark management tool',
    'streamline bookmarks',
    'automatic bookmark organization',
    'how to organize bookmarks efficiently'
  ],  
  openGraph: {
    title: 'Organize Your Bookmarks with AI',
    description: 'Use our AI-powered tool to effortlessly organize, categorize, and clean up your bookmarks',
    url: `${site_url}/organize-bookmarks`,
    siteName: 'AI Bookmark Manager',
    images: [
      {
        url: `${site_url}/og-organize-bookmarks.png`,
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organize Your Bookmarks with AI',
    description: 'Use our AI-powered tool to effortlessly organize, categorize, and clean up your bookmarks',
    images: [`${site_url}/og-organize-bookmarks.png`],
  },
};

export default function OrganizeBookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>;
}