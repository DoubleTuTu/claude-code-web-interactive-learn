import { describe, it, expect } from "vitest";
import { validateCourse, getAllLessons } from "@/lib/course-loader";
import type { Course } from "@/types/lesson";

const sampleCourse: Course = {
  id: "test-course",
  title: "Test Course",
  description: "A test course",
  locale: "zh",
  levels: [
    {
      id: "level-1",
      title: "入门",
      description: "基础",
      chapters: [
        {
          id: "ch1",
          title: "章节1",
          description: "第一章",
          lessons: [
            {
              id: "lesson-1",
              title: "课程1",
              description: "第一课",
              difficulty: "beginner",
              steps: [
                {
                  id: "step-1",
                  type: "guide",
                  instruction: "步骤1",
                },
              ],
            },
            {
              id: "lesson-2",
              title: "课程2",
              description: "第二课",
              difficulty: "beginner",
              steps: [
                {
                  id: "step-1",
                  type: "terminal",
                  instruction: "步骤1",
                  expectedInput: "test",
                  output: "result",
                  feedback: { success: "ok", failure: "no" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "level-2",
      title: "进阶",
      description: "进阶内容",
      chapters: [
        {
          id: "ch2",
          title: "章节2",
          description: "第二章",
          lessons: [
            {
              id: "lesson-3",
              title: "课程3",
              description: "第三课",
              difficulty: "intermediate",
              steps: [
                {
                  id: "step-1",
                  type: "animation",
                  instruction: "步骤1",
                  animationId: "agent-loop",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

describe("validateCourse", () => {
  it("accepts valid course data", () => {
    const result = validateCourse(sampleCourse);
    expect(result.id).toBe("test-course");
  });

  it("rejects invalid course data", () => {
    expect(() => validateCourse({ id: "test" })).toThrow();
  });
});

describe("getAllLessons", () => {
  it("returns all lessons from the course", () => {
    const lessons = getAllLessons(sampleCourse);
    expect(lessons.length).toBe(3);
    expect(lessons.map((l) => l.id)).toEqual([
      "lesson-1",
      "lesson-2",
      "lesson-3",
    ]);
  });
});
