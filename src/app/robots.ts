import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/test-terminal/",
    },
    sitemap: "https://claude-code-web-interactive-learn.vercel.app/sitemap.xml",
  };
}
