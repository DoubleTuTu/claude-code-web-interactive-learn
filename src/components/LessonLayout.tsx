"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import type { Lesson, TerminalStep } from "@/types/lesson";
import { StepEngine } from "@/components/StepEngine";
import { Terminal } from "@/components/Terminal";
import { getAllLessons, getCourse } from "@/lib/course-loader";
import { getProgress, saveProgress, markCompleted } from "@/lib/progress";

interface LessonLayoutProps {
  lesson: Lesson;
}

const STEP_TYPE_LABELS: Record<string, string> = {
  guide: "图文引导",
  terminal: "终端操作",
  animation: "概念动画",
  quiz: "互动测验",
};

const STEP_TYPE_COLORS: Record<string, string> = {
  guide: "bg-[var(--accent-purple-subtle)] text-[var(--accent-purple-light)]",
  terminal: "bg-[var(--accent-green-subtle)] text-[var(--accent-green)]",
  animation: "bg-blue-500/15 text-blue-400",
  quiz: "bg-yellow-500/15 text-yellow-400",
};

export function LessonLayout({ lesson }: LessonLayoutProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const saved = getProgress(lesson.id);
    return saved?.currentStep ?? 0;
  });
  const [terminalCompleted, setTerminalCompleted] = useState(false);
  const currentStep = lesson.steps[currentStepIndex];
  const totalSteps = lesson.steps.length;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;
  const showTerminal = currentStep?.type === "terminal";
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  const nextLessonId = useMemo(() => {
    const allLessons = getAllLessons(getCourse());
    const idx = allLessons.findIndex((l) => l.id === lesson.id);
    return idx >= 0 && idx < allLessons.length - 1
      ? allLessons[idx + 1].id
      : undefined;
  }, [lesson.id]);

  const handleAdvance = useCallback(() => {
    setTerminalCompleted(false);
    setCurrentStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }, [totalSteps]);

  const handleBack = useCallback(() => {
    setTerminalCompleted(false);
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleTerminalComplete = useCallback(() => {
    setTerminalCompleted(true);
  }, []);

  const handleComplete = useCallback(() => {
    markCompleted(lesson.id);
    setCurrentStepIndex(0);
  }, [lesson.id]);

  // Save progress when step changes
  useEffect(() => {
    saveProgress(lesson.id, currentStepIndex);
  }, [lesson.id, currentStepIndex]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3 text-xs text-[var(--fg-secondary)] whitespace-nowrap">
          <Link
            href="/#courses"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            ← 返回
          </Link>
          <span className="text-[var(--border)]">·</span>
          <span className="font-semibold text-[var(--fg)] text-sm">
            {lesson.title}
          </span>
        </div>
        <div className="flex-1 h-2 bg-[var(--surface-elevated)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent-purple)] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs text-[var(--fg-muted)] whitespace-nowrap">
          Step {currentStepIndex + 1} / {totalSteps}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Step Guide (40%) */}
        <section className="w-2/5 min-w-[320px] border-r border-[var(--border)] flex flex-col overflow-hidden">
          {/* Step Header */}
          <div className="px-6 py-5 border-b border-[var(--border)]">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-2xl text-xs font-medium tracking-wider mb-3 ${STEP_TYPE_COLORS[currentStep?.type ?? "guide"]}`}
            >
              STEP {currentStepIndex + 1} — {STEP_TYPE_LABELS[currentStep?.type ?? "guide"]?.toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold leading-snug">
              {currentStep?.type === "guide"
                ? currentStep.instruction.slice(0, 60)
                : currentStep?.type === "terminal"
                  ? `终端操作: ${(currentStep as TerminalStep).expectedInput}`
                  : currentStep?.type === "quiz"
                    ? currentStep.question
                    : currentStep?.type === "animation"
                      ? currentStep.instruction.slice(0, 60)
                      : ""}
            </h2>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <StepEngine
              lesson={lesson}
              currentStepIndex={currentStepIndex}
              onAdvance={handleAdvance}
              onComplete={handleComplete}
              nextLessonId={nextLessonId}
              terminalCompleted={terminalCompleted}
            />
          </div>

          {/* Step Navigator */}
          <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--fg-secondary)] hover:bg-white/5 hover:text-[var(--fg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← 上一步
            </button>
            <div className="flex items-center gap-1.5">
              {lesson.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStepIndex(i)}
                  className={`transition-all rounded-full ${
                    i === currentStepIndex
                      ? "w-5 h-2 bg-[var(--accent-purple-light)]"
                      : i < currentStepIndex
                        ? "w-2 h-2 bg-[var(--accent-purple)]"
                        : "w-2 h-2 bg-[var(--surface-elevated)]"
                  }`}
                  aria-label={`跳转到第 ${i + 1} 步`}
                />
              ))}
            </div>
            {!isLastStep && currentStep.type !== "terminal" ? (
              <button
                onClick={handleAdvance}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)] text-white transition-colors"
              >
                下一步 →
              </button>
            ) : isLastStep ? (
              <Link
                href="/#courses"
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--fg-secondary)] hover:bg-white/5 hover:text-[var(--fg)] transition-all"
              >
                返回课程列表
              </Link>
            ) : null}
          </div>
        </section>

        {/* Right: Terminal (60%) */}
        <aside className="w-3/5 flex flex-col bg-[var(--terminal-bg)]">
          {showTerminal ? (
            <>
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono text-xs text-[var(--fg-muted)]">
                    claude-code-learn — zsh
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                  等待输入
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-4 overflow-hidden">
                <Terminal
                  step={currentStep as TerminalStep}
                  onComplete={handleTerminalComplete}
                />
              </div>

              {/* Task Indicator */}
              <div className="px-4 py-2.5 bg-[var(--surface)] border-t border-[var(--border)] flex items-center gap-2 text-sm text-[var(--fg-secondary)]">
                <span className="text-[var(--accent-purple-light)]">▸</span>
                <span>
                  任务：在终端中输入{" "}
                  <strong className="text-[var(--fg)] font-medium">
                    {(currentStep as TerminalStep).expectedInput}
                  </strong>
                </span>
              </div>
            </>
          ) : (
            /* Placeholder when no terminal */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-[var(--fg-muted)]">
                <div className="text-4xl mb-3 opacity-30">⌘</div>
                <p className="text-sm">终端区域</p>
                <p className="text-xs mt-1 opacity-60">在终端操作步骤时显示</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
