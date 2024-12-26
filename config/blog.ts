export const BLOG_CATEGORIES: {
  title: string;
  slug: "tips" | "updates";
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
      "how to manage bookmarks",
      "productivity hacks",
      "efficient browsing",
      "bookmark management tricks",
      "organize browser bookmarks",
      "time-saving bookmark tips",
      "best practices for bookmark management"
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
      "latest bookmark management news",
      "AI-powered bookmark updates",
      "new bookmark management features",
      "AI bookmark manager news"
    ],
  },
];

export const BLOG_AUTHORS = {
  markly: {
    name: "markly",
    image: "/_static/avatars/starweq.jpg",
    twitter: "starweq"
  },
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
