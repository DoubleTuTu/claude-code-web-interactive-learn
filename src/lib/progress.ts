const STORAGE_KEY = "claudecode-progress";

interface ProgressEntry {
  currentStep: number;
  completed: boolean;
}

type ProgressData = Record<string, ProgressEntry>;

function getAll(): ProgressData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getProgress(lessonId: string): ProgressEntry | null {
  return getAll()[lessonId] ?? null;
}

export function saveProgress(lessonId: string, stepIndex: number): void {
  const data = getAll();
  data[lessonId] = { ...data[lessonId], currentStep: stepIndex, completed: false };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markCompleted(lessonId: string): void {
  const data = getAll();
  data[lessonId] = { currentStep: 0, completed: true };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isCompleted(lessonId: string): boolean {
  return getAll()[lessonId]?.completed ?? false;
}

export function getAllCompleted(): Record<string, boolean> {
  const data = getAll();
  return Object.fromEntries(
    Object.entries(data).map(([id, entry]) => [id, entry.completed])
  );
}
