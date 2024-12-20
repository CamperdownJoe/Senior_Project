import Link from "next/link";
import { allGuides } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { constructMetadata, formatDate } from "@/lib/utils";
import { DocsPageHeader } from "@/components/docs/page-header";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const metadata = constructMetadata({
  title: "Master Advanced Bookmark Organization",
  description: "Comprehensive guides on advanced bookmark organization strategies, AI-powered sorting techniques, and optimizing your digital library.",
  keywords: [
    "bookmark organization",
    "digital library management",
    "AI-powered sorting techniques",
    "advanced bookmark organization strategies",
    "how to organize bookmarks",
    "best bookmark management guides",
    "optimize your digital library",
    "productivity guides for bookmark organization",
    "advanced bookmark techniques"
  ],
  openGraph: {
    type: "article",
    authors: ["Markly"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Bookmark Management Guides",
    description: "Master the art of bookmark organization with our in-depth guides.",
  },
});

export default function GuidesPage() {
  const guides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <MaxWidthWrapper className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Expert Bookmark Management Guides"
        text="Dive deep into advanced strategies for organizing, optimizing, and leveraging your bookmarks. Our comprehensive guides cover everything from AI-powered sorting to creating an efficient digital library."
      />
      {guides?.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
          {guides.map((guide) => (
            <article
              key={guide._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              {guide.featured && (
                <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
                  Featured
                </span>
              )}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {guide.title}
                  </h2>
                  {guide.description && (
                    <p className="text-muted-foreground">{guide.description}</p>
                  )}
                </div>
                {guide.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(guide.date)}
                  </p>
                )}
              </div>
              <Link href={guide.slug} className="absolute inset-0">
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No guides published yet. Check back soon for in-depth bookmark management strategies!</p>
      )}
    </MaxWidthWrapper>
  );
}
