import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getLessonById, getAllLessons } from "@/lib/course-loader";
import { SITE_URL } from "@/lib/constants";
import { LessonLayout } from "@/components/LessonLayout";

export function generateStaticParams() {
  const lessons = getAllLessons(getCourse());
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLessonById(id);

  return {
    title: lesson
      ? `${lesson.title} — ClaudeCode Learn`
      : "课程未找到 — ClaudeCode Learn",
    description:
      lesson?.description ??
      "在浏览器中操作终端模拟器，按步骤学习 Claude Code",
    alternates: { canonical: `/lessons/${id}` },
    openGraph: {
      title: lesson ? `${lesson.title} — ClaudeCode Learn` : undefined,
      description: lesson?.description,
      url: `${SITE_URL}/lessons/${id}`,
      type: "article",
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) notFound();

  return <LessonLayout lesson={lesson} />;
}
