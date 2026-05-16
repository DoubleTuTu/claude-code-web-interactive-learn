import type { MetadataRoute } from "next";
import { getCourse, getAllLessons } from "@/lib/course-loader";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons(getCourse());

  const lessonUrls = lessons.map((lesson) => ({
    url: `${SITE_URL}/lessons/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...lessonUrls,
  ];
}
