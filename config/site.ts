import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

export const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "SmartMark",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/StarWeQ",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@smartmark.me",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      // { title: "About", href: "#" },
      // { title: "Enterprise", href: "#" },
      { title: "Security", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Organize bookmarks", href: "/organize-bookmarks" },
      { title: "Remove Broken bookmarks", href: "/remove-broken-bookmarks" },
      { title: "Remove Duplicate bookmarks", href: "/remove-duplicate-bookmarks" },
      
      // { title: "Security", href: "#" },
      // { title: "Customization", href: "#" },

      // { title: "Customers", href: "#" },
      // { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Guide",
    items: [
      { title: "Introduction", href: "#" },
      // { title: "Installation", href: "#" },
      // { title: "Components", href: "#" },
      // { title: "Code Blocks", href: "#" },
    ],
  },
];
