export const BLOG_CATEGORIES: {
  title: string;
  slug: "tips" | "updates" | "uncategorized";
  description: string;
  keywords: string[];
}[] = [
  {
    title: "Tips & Tricks",
    slug: "tips",
    description: "Quick tips and tricks for efficient bookmark management.",
    keywords: [
      "bookmark tips",
      "bookmark organization",
      "productivity hacks",
      "efficient browsing",
      "bookmark management tricks"
    ],
  },
  {
    title: "Updates",
    slug: "updates",
    description: "Latest news and feature updates about our AI Bookmark Manager.",
    keywords: [
      "AI bookmark manager updates",
      "new features",
      "bookmark tool improvements",
      "software updates",
      "bookmark management news"
    ],
  },
  {
    title: "Uncategorized",
    slug: "uncategorized",
    description: "Miscellaneous articles related to bookmarks and productivity.",
    keywords: [
      "bookmark articles",
      "productivity tips",
      "browser management",
      "digital organization",
      "web browsing efficiency"
    ],
  },
];

export const BLOG_AUTHORS = {
  mickasmt: {
    name: "mickasmt",
    image: "/_static/avatars/mickasmt.png",
    twitter: "miickasmt",
  },
  shadcn: {
    name: "shadcn",
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
};
