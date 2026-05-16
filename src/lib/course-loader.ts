import { z } from "zod";
import type { Course, Lesson } from "@/types/lesson";

// Zod schemas for runtime validation
const stepFeedbackSchema = z.object({
  success: z.string(),
  failure: z.string(),
});

const stepBaseSchema = z.object({
  id: z.string(),
  instruction: z.string(),
});

const guideStepSchema = stepBaseSchema.extend({
  type: z.literal("guide"),
  visual: z.string().optional(),
  annotation: z.string().optional(),
});

const terminalStepSchema = stepBaseSchema.extend({
  type: z.literal("terminal"),
  hint: z.string().optional(),
  expectedInput: z.string(),
  output: z.string(),
  outputAnimation: z.enum(["spinner", "typewriter", "instant"]).optional(),
  feedback: stepFeedbackSchema,
});

const animationStepSchema = stepBaseSchema.extend({
  type: z.literal("animation"),
  animationId: z.string(),
});

const quizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

const quizStepSchema = stepBaseSchema.extend({
  type: z.literal("quiz"),
  question: z.string(),
  options: z.array(quizOptionSchema),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
});

const stepSchema = z.discriminatedUnion("type", [
  guideStepSchema,
  terminalStepSchema,
  animationStepSchema,
  quizStepSchema,
]);

const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: difficultySchema,
  steps: z.array(stepSchema),
});

const chapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  lessons: z.array(lessonSchema),
});

const levelSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  chapters: z.array(chapterSchema),
});

const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  locale: z.string(),
  levels: z.array(levelSchema),
});

/**
 * Validate course data against the schema
 */
export function validateCourse(data: unknown): Course {
  const result = courseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid course data: ${result.error.message}`);
  }
  return result.data;
}

/**
 * Get all lessons from a course
 */
export function getAllLessons(course: Course): Lesson[] {
  const lessons: Lesson[] = [];
  for (const level of course.levels) {
    for (const chapter of level.chapters) {
      lessons.push(...chapter.lessons);
    }
  }
  return lessons;
}

// Module-level cached instances (evaluated once)
import coursesData from "@/data/courses.json";

const course = validateCourse(coursesData);
const allLessons = getAllLessons(course);

export function getCourse(): Course {
  return course;
}

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

export function getLessonCount(): number {
  return allLessons.length;
}

