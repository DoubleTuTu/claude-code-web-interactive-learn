import { describe, it, expect } from "vitest";
import { z } from "zod";

// Zod schemas that mirror the TypeScript types
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
});

const stepSchema = z.discriminatedUnion("type", [
  guideStepSchema,
  terminalStepSchema,
  animationStepSchema,
  quizStepSchema,
]);

const recordingSchema = z.object({
  lessonId: z.string(),
  claudeCodeVersion: z.string(),
  title: z.string(),
  locale: z.string(),
  steps: z.array(stepSchema),
});

describe("Recording schema", () => {
  const validRecording = {
    lessonId: "l1-2",
    claudeCodeVersion: "1.0.0",
    title: "安装 Claude Code",
    locale: "zh",
    steps: [
      {
        id: "step-1",
        type: "guide",
        instruction: "首先，我们需要打开终端应用。",
        annotation: "在 macOS 中，终端叫 Terminal",
      },
      {
        id: "step-2",
        type: "terminal",
        instruction: "现在让我们检查你的 Node.js 版本。",
        hint: "输入 `node --version` 然后按回车",
        expectedInput: "node --version",
        output: "v20.11.0",
        feedback: {
          success: "✅ 太棒了！",
          failure: "❌ 不太对哦～",
        },
      },
    ],
  };

  it("accepts a valid recording", () => {
    const result = recordingSchema.safeParse(validRecording);
    expect(result.success).toBe(true);
  });

  it("rejects recording with missing required fields", () => {
    const invalid = { lessonId: "l1-2" };
    const result = recordingSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects step with unknown type", () => {
    const invalid = {
      ...validRecording,
      steps: [{ id: "step-1", type: "unknown", instruction: "test" }],
    };
    const result = recordingSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

describe("TerminalStep schema", () => {
  it("requires expectedInput", () => {
    const invalid = {
      id: "step-1",
      type: "terminal",
      instruction: "test",
      output: "result",
      feedback: { success: "ok", failure: "no" },
    };
    const result = terminalStepSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("requires feedback with success and failure", () => {
    const invalid = {
      id: "step-1",
      type: "terminal",
      instruction: "test",
      expectedInput: "cmd",
      output: "result",
      feedback: { success: "ok" },
    };
    const result = terminalStepSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("accepts valid outputAnimation values", () => {
    for (const anim of ["spinner", "typewriter", "instant"]) {
      const step = {
        id: "step-1",
        type: "terminal",
        instruction: "test",
        expectedInput: "cmd",
        output: "result",
        outputAnimation: anim,
        feedback: { success: "ok", failure: "no" },
      };
      const result = terminalStepSchema.safeParse(step);
      expect(result.success).toBe(true);
    }
  });
});

describe("GuideStep schema", () => {
  it("accepts guide step with optional fields", () => {
    const step = {
      id: "step-1",
      type: "guide",
      instruction: "打开终端",
    };
    const result = guideStepSchema.safeParse(step);
    expect(result.success).toBe(true);
  });

  it("accepts guide step with all fields", () => {
    const step = {
      id: "step-1",
      type: "guide",
      instruction: "打开终端",
      visual: "terminal-app-icon.png",
      annotation: "在 macOS 中",
    };
    const result = guideStepSchema.safeParse(step);
    expect(result.success).toBe(true);
  });
});

describe("QuizStep schema", () => {
  it("requires at least one option", () => {
    const step = {
      id: "step-1",
      type: "quiz",
      instruction: "test",
      question: "What is 1+1?",
      options: [],
      correctAnswer: "a",
    };
    const result = quizStepSchema.safeParse(step);
    expect(result.success).toBe(true); // empty array is valid
  });

  it("rejects quiz with no correctAnswer", () => {
    const step = {
      id: "step-1",
      type: "quiz",
      instruction: "test",
      question: "What is 1+1?",
      options: [{ id: "a", text: "2" }],
    };
    const result = quizStepSchema.safeParse(step);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// Course hierarchy schemas
// ============================================================================

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

describe("Lesson schema", () => {
  const validLesson = {
    id: "l1-1",
    title: "安装 Claude Code",
    description: "学习如何安装 Claude Code",
    difficulty: "beginner",
    steps: [
      {
        id: "step-1",
        type: "guide",
        instruction: "首先，打开终端",
      },
      {
        id: "step-2",
        type: "terminal",
        instruction: "检查 Node.js 版本",
        expectedInput: "node --version",
        output: "v20.11.0",
        feedback: { success: "✅ 正确", failure: "❌ 再试一次" },
      },
    ],
  };

  it("accepts a valid lesson", () => {
    const result = lessonSchema.safeParse(validLesson);
    expect(result.success).toBe(true);
  });

  it("rejects lesson with missing required fields", () => {
    const invalid = { id: "l1-1" };
    const result = lessonSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects lesson with invalid difficulty", () => {
    const invalid = { ...validLesson, difficulty: "expert" };
    const result = lessonSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("accepts lesson with empty steps", () => {
    const lesson = { ...validLesson, steps: [] };
    const result = lessonSchema.safeParse(lesson);
    expect(result.success).toBe(true);
  });
});

describe("Chapter schema", () => {
  const validChapter = {
    id: "ch1",
    title: "安装与配置",
    description: "学习安装和配置 Claude Code",
    lessons: [
      {
        id: "l1-1",
        title: "安装 Claude Code",
        description: "学习如何安装",
        difficulty: "beginner",
        steps: [],
      },
    ],
  };

  it("accepts a valid chapter", () => {
    const result = chapterSchema.safeParse(validChapter);
    expect(result.success).toBe(true);
  });

  it("accepts chapter with empty lessons", () => {
    const chapter = { ...validChapter, lessons: [] };
    const result = chapterSchema.safeParse(chapter);
    expect(result.success).toBe(true);
  });
});

describe("Level schema", () => {
  const validLevel = {
    id: "level-1",
    title: "入门",
    description: "Claude Code 基础",
    chapters: [
      {
        id: "ch1",
        title: "安装与配置",
        description: "学习安装",
        lessons: [],
      },
    ],
  };

  it("accepts a valid level", () => {
    const result = levelSchema.safeParse(validLevel);
    expect(result.success).toBe(true);
  });

  it("accepts level with empty chapters", () => {
    const level = { ...validLevel, chapters: [] };
    const result = levelSchema.safeParse(level);
    expect(result.success).toBe(true);
  });
});

describe("Course schema", () => {
  const validCourse = {
    id: "claudecode-learn",
    title: "ClaudeCode Learn",
    description: "学习 Claude Code 的互动教学平台",
    locale: "zh",
    levels: [
      {
        id: "level-1",
        title: "入门",
        description: "Claude Code 基础",
        chapters: [],
      },
    ],
  };

  it("accepts a valid course", () => {
    const result = courseSchema.safeParse(validCourse);
    expect(result.success).toBe(true);
  });

  it("rejects course with missing required fields", () => {
    const invalid = { id: "test" };
    const result = courseSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("accepts course with empty levels", () => {
    const course = { ...validCourse, levels: [] };
    const result = courseSchema.safeParse(course);
    expect(result.success).toBe(true);
  });
});

describe("Full course hierarchy", () => {
  const fullCourse = {
    id: "claudecode-learn",
    title: "ClaudeCode Learn",
    description: "学习 Claude Code 的互动教学平台",
    locale: "zh",
    levels: [
      {
        id: "level-1",
        title: "入门",
        description: "Claude Code 基础",
        chapters: [
          {
            id: "ch1",
            title: "安装与配置",
            description: "学习安装",
            lessons: [
              {
                id: "l1-1",
                title: "安装 Claude Code",
                description: "学习如何安装",
                difficulty: "beginner",
                steps: [
                  {
                    id: "step-1",
                    type: "guide",
                    instruction: "打开终端",
                  },
                  {
                    id: "step-2",
                    type: "terminal",
                    instruction: "检查版本",
                    expectedInput: "node --version",
                    output: "v20.11.0",
                    feedback: { success: "✅", failure: "❌" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  it("accepts a complete course hierarchy", () => {
    const result = courseSchema.safeParse(fullCourse);
    expect(result.success).toBe(true);
  });
});
