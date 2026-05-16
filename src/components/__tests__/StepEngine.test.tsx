import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepEngine } from "@/components/StepEngine";
import type { Lesson } from "@/types/lesson";

const mockLesson: Lesson = {
  id: "lesson-1",
  title: "测试课程",
  description: "这是一个测试课程",
  difficulty: "beginner",
  steps: [
    {
      id: "step-1",
      type: "guide",
      instruction: "第一步：打开终端",
    },
    {
      id: "step-2",
      type: "terminal",
      instruction: "第二步：输入命令",
      expectedInput: "node --version",
      output: "v20.11.0",
      feedback: { success: "✅ 正确", failure: "❌ 错误" },
    },
    {
      id: "step-3",
      type: "guide",
      instruction: "第三步：完成",
    },
  ],
};

describe("StepEngine", () => {
  it("renders the first step instruction", () => {
    render(
      <StepEngine
        lesson={mockLesson}
        currentStepIndex={0}
        onAdvance={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(screen.getByText("第一步：打开终端")).toBeInTheDocument();
  });

  it("shows Next button for guide steps", () => {
    render(
      <StepEngine
        lesson={mockLesson}
        currentStepIndex={0}
        onAdvance={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(screen.getAllByText(/下一步/).length).toBeGreaterThan(0);
  });

  it("calls onAdvance when Next is clicked", () => {
    const onAdvance = vi.fn();
    const { container } = render(
      <StepEngine
        lesson={mockLesson}
        currentStepIndex={0}
        onAdvance={onAdvance}
        onComplete={vi.fn()}
      />
    );
    const button = container.querySelector("button")!;
    fireEvent.click(button);
    expect(onAdvance).toHaveBeenCalled();
  });

  it("returns null for terminal steps", () => {
    const { container } = render(
      <StepEngine
        lesson={mockLesson}
        currentStepIndex={1}
        onAdvance={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(container.innerHTML).toBe("");
  });

  it("handles single-step lesson", () => {
    const singleStepLesson: Lesson = {
      ...mockLesson,
      steps: [{ id: "step-1", type: "guide", instruction: "唯一一步" }],
    };
    render(
      <StepEngine
        lesson={singleStepLesson}
        currentStepIndex={0}
        onAdvance={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(screen.getByText("课程完成！")).toBeInTheDocument();
  });

  it("handles empty lesson", () => {
    const emptyLesson: Lesson = {
      ...mockLesson,
      steps: [],
    };
    render(
      <StepEngine
        lesson={emptyLesson}
        currentStepIndex={0}
        onAdvance={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(screen.getByText("0 / 0")).toBeInTheDocument();
  });
});
