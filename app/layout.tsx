import "@/styles/globals.css";

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { site_url } from "@/config/site";
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import ModalProvider from "@/components/modals/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

interface RootLayoutProps {
  children: React.ReactNode;
}

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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>{children}</ModalProvider>
            <Analytics />
            <Toaster richColors closeButton />
            <TailwindIndicator />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
