import { MetadataRoute } from "next"
import { site_url } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${site_url}/sitemap.xml`,
  }
}
