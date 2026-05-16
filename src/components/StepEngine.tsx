"use client";

import Image from "next/image";
import Link from "next/link";
import type { Lesson, Step } from "@/types/lesson";
import {
  AgentLoopAnimation,
  ToolDispatchAnimation,
  ContextWindowAnimation,
  TddCycleAnimation,
} from "@/components/animations";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useState } from "react";

interface StepEngineProps {
  lesson: Lesson;
  currentStepIndex: number;
  onAdvance: () => void;
  onComplete: () => void;
  nextLessonId?: string;
  terminalCompleted?: boolean;
}

export function StepEngine({
  lesson,
  currentStepIndex,
  onAdvance,
  onComplete,
  nextLessonId,
  terminalCompleted = false,
}: StepEngineProps) {
  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;

  if (totalSteps === 0) {
    return (
      <div className="text-center text-[var(--fg-muted)] py-8">
        <p>0 / 0</p>
      </div>
    );
  }

  // Terminal steps are rendered externally by LessonLayout
  if (currentStep.type === "terminal") {
    if (isLastStep && terminalCompleted) {
      return (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-green-subtle)] text-[var(--accent-green)] px-4 py-2 rounded-lg mb-4">
            <span>✓</span>
            <span className="font-medium">课程完成！</span>
          </div>
          <p className="text-sm text-[var(--fg-secondary)] mb-4">
            恭喜你完成了所有步骤 🎉
          </p>
          {nextLessonId ? (
            <Link
              href={`/lessons/${nextLessonId}`}
              className="inline-block px-5 py-2.5 bg-[var(--accent-green)] hover:brightness-110 text-white rounded-lg text-sm font-medium transition-all"
            >
              进入下一课 →
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-[var(--accent-green)] hover:brightness-110 text-white rounded-lg text-sm font-medium transition-all"
            >
              返回首页
            </Link>
          )}
        </div>
      );
    }
    if (terminalCompleted) {
      return (
        <div>
          <div className="bg-[var(--accent-green-subtle)] border border-[var(--accent-green)]/20 rounded-lg px-4 py-3 flex items-start gap-2.5">
            <span className="text-[var(--accent-green)]">✓</span>
            <div>
              <div className="text-sm font-medium text-[var(--accent-green)]">
                太棒了！命令执行成功
              </div>
              <p className="text-xs text-[var(--fg-secondary)] mt-1">
                点击下方按钮继续学习
              </p>
            </div>
          </div>
          <button
            onClick={onAdvance}
            className="mt-6 px-5 py-2.5 bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)] text-white rounded-lg text-sm font-medium transition-colors"
          >
            下一步 →
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <StepRenderer step={currentStep} onComplete={isLastStep ? onComplete : onAdvance} />

      {!isLastStep && (
        <button
          onClick={onAdvance}
          className="mt-6 px-5 py-2.5 bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)] text-white rounded-lg text-sm font-medium transition-colors"
        >
          下一步 →
        </button>
      )}

      {isLastStep && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-green-subtle)] text-[var(--accent-green)] px-4 py-2 rounded-lg mb-4">
            <span>✓</span>
            <span className="font-medium">课程完成！</span>
          </div>
          <p className="text-sm text-[var(--fg-secondary)] mb-4">
            恭喜你完成了所有步骤 🎉
          </p>
          {nextLessonId ? (
            <Link
              href={`/lessons/${nextLessonId}`}
              className="inline-block px-5 py-2.5 bg-[var(--accent-green)] hover:brightness-110 text-white rounded-lg text-sm font-medium transition-all"
            >
              进入下一课 →
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-[var(--accent-green)] hover:brightness-110 text-white rounded-lg text-sm font-medium transition-all"
            >
              返回首页
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function StepRenderer({
  step,
  onComplete,
}: {
  step: Step;
  onComplete: () => void;
}) {
  switch (step.type) {
    case "guide":
      return (
        <div>
          <MarkdownRenderer content={step.instruction} />
          {step.visual && (
            <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border border-[var(--border)]">
              <Image
                src={step.visual}
                alt={step.annotation || step.instruction}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          {step.annotation && (
            <div className="mt-4 bg-[var(--info)]/10 border border-[var(--info)]/20 rounded-lg px-4 py-3">
              <div className="text-xs font-medium tracking-wider uppercase text-[var(--info)] mb-1">
                💡 知识点
              </div>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                {step.annotation}
              </p>
            </div>
          )}
        </div>
      );

    case "animation":
      return (
        <div>
          <p className="text-[var(--fg)] leading-relaxed mb-4">{step.instruction}</p>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <AnimationRouter animationId={step.animationId} />
          </div>
        </div>
      );

    case "terminal":
      return null;

    case "quiz":
      return <QuizStep step={step} onComplete={onComplete} />;

    default: {
      const _exhaustive: never = step;
      return _exhaustive;
    }
  }
}

function QuizStep({
  step,
  onComplete,
}: {
  step: Extract<Step, { type: "quiz" }>;
  onComplete: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (optionId: string) => {
    if (answered) return;
    setSelectedId(optionId);
    setAnswered(true);
    if (optionId === step.correctAnswer) {
      requestAnimationFrame(() => {
        setTimeout(onComplete, 1000);
      });
    }
  };

  const isCorrect = selectedId === step.correctAnswer;

  return (
    <div>
      <p className="text-[var(--fg)] leading-relaxed">{step.instruction}</p>
      <p className="mt-2 text-[var(--fg-secondary)]">{step.question}</p>
      <div className="mt-4 space-y-2">
        {step.options.map((option) => {
          const isSelected = option.id === selectedId;
          const showCorrect = answered && option.id === step.correctAnswer;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={answered}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${
                showCorrect
                  ? "bg-[var(--accent-green-subtle)] text-[var(--accent-green)] border border-[var(--accent-green)]/30"
                  : showWrong
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : "bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--fg)] border border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`mt-4 rounded-lg px-4 py-3 flex items-start gap-2.5 ${
            isCorrect
              ? "bg-[var(--accent-green-subtle)] border border-[var(--accent-green)]/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          <span className={isCorrect ? "text-[var(--accent-green)]" : "text-red-400"}>
            {isCorrect ? "✓" : "✗"}
          </span>
          <div>
            <div className={`text-sm font-medium ${isCorrect ? "text-[var(--accent-green)]" : "text-red-400"}`}>
              {isCorrect ? "正确！" : "再想想～"}
            </div>
            {!isCorrect && step.explanation && (
              <p className="text-xs text-[var(--fg-secondary)] mt-1">
                {step.explanation}
              </p>
            )}
            {!isCorrect && !step.explanation && (
              <p className="text-xs text-[var(--fg-secondary)] mt-1">
                正确答案是：{step.options.find(o => o.id === step.correctAnswer)?.text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimationRouter({ animationId }: { animationId: string }) {
  switch (animationId) {
    case "agent-loop":
      return <AgentLoopAnimation />;
    case "tool-dispatch":
      return <ToolDispatchAnimation />;
    case "context-window":
      return <ContextWindowAnimation />;
    case "tdd-cycle":
      return <TddCycleAnimation />;
    default:
      return (
        <div className="p-4 bg-[var(--surface)] rounded text-center text-[var(--fg-muted)]">
          未知动画类型: {animationId}
        </div>
      );
  }
}
