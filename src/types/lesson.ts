// ============================================================================
// Step types
// ============================================================================

export type StepType = "guide" | "terminal" | "animation" | "quiz";

// Feedback for interactive steps
export interface StepFeedback {
  success: string;
  failure: string;
}

// Base step interface
interface StepBase {
  id: string;
  instruction: string;
}

// Guide step — shows text/visual guidance, no terminal interaction
export interface GuideStep extends StepBase {
  type: "guide";
  visual?: string;
  annotation?: string;
}

// Terminal step — user types commands into the terminal simulator
export interface TerminalStep extends StepBase {
  type: "terminal";
  hint?: string;
  expectedInput: string;
  output: string;
  outputAnimation?: "spinner" | "typewriter" | "instant";
  feedback: StepFeedback;
}

// Animation step — concept visualization (Agent Loop, Tool Use, etc.)
export interface AnimationStep extends StepBase {
  type: "animation";
  animationId: string;
}

// Quiz option
export interface QuizOption {
  id: string;
  text: string;
}

// Quiz step — interactive quiz (multiple choice, matching, scenario)
export interface QuizStep extends StepBase {
  type: "quiz";
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation?: string;
}

// Union of all step types
export type Step = GuideStep | TerminalStep | AnimationStep | QuizStep;

// Recording — a pre-recorded lesson session (drives the terminal simulator)
export interface Recording {
  lessonId: string;
  claudeCodeVersion: string;
  title: string;
  locale: string;
  steps: Step[];
}

// ============================================================================
// Course hierarchy: Course → Level → Chapter → Lesson → Step
// ============================================================================

// Difficulty levels
export type Difficulty = "beginner" | "intermediate" | "advanced";

// Lesson — a single tutorial within a chapter
export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  steps: Step[];
}

// Chapter — a thematic group of lessons within a level
export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// Level — a major phase of learning within a course
export interface Level {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

// Course — the top-level container for all learning content
export interface Course {
  id: string;
  title: string;
  description: string;
  locale: string;
  levels: Level[];
}
