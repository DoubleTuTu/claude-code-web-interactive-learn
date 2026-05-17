import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LessonLayout } from "@/components/LessonLayout";
import type { Lesson } from "@/types/lesson";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

// Mock xterm.js
vi.mock("@xterm/xterm", () => {
  return {
    Terminal: class MockTerminal {
      open = vi.fn();
      write = vi.fn();
      writeln = vi.fn();
      onData = vi.fn(() => ({ dispose: vi.fn() }));
      dispose = vi.fn();
      loadAddon = vi.fn();
    },
  };
});

vi.mock("@xterm/addon-fit", () => {
  return {
    FitAddon: class MockFitAddon {
      fit = vi.fn();
    },
  };
});

const mockLesson: Lesson = {
  id: "lesson-1",
  title: "测试课程",
  description: "这是一个测试课程",
  difficulty: "beginner",
  steps: [
    {
      id: "step-1",
      type: "guide",
      instruction: "第一步：了解基础概念",
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

describe("LessonLayout", () => {
  it("renders lesson title", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(screen.getAllByText("测试课程").length).toBeGreaterThan(0);
  });

  it("renders step counter", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(screen.getAllByText(/Step 1 \/ 3/).length).toBeGreaterThan(0);
  });

  it("renders first step instruction", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(
      screen.getAllByText(/第一步：了解基础概念/).length
    ).toBeGreaterThan(0);
  });

  it("renders back button", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(screen.getAllByText(/← 返回/).length).toBeGreaterThan(0);
  });

  it("renders next button for non-terminal steps", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(screen.getAllByText(/下一步/).length).toBeGreaterThan(0);
  });

  it("advances to next step when next button is clicked", () => {
    render(<LessonLayout lesson={mockLesson} />);
    const nextButtons = screen.getAllByText(/下一步/);
    fireEvent.click(nextButtons[0]);
    expect(screen.getAllByText(/Step 2 \/ 3/).length).toBeGreaterThan(0);
  });

  it("renders terminal header for terminal steps", () => {
    render(<LessonLayout lesson={mockLesson} />);
    // Go to terminal step
    const nextButtons = screen.getAllByText(/下一步/);
    fireEvent.click(nextButtons[0]);
    // Should show terminal header
    expect(
      screen.getAllByText(/claude-code-learn — zsh/).length
    ).toBeGreaterThan(0);
  });

  it("renders placeholder for non-terminal steps", () => {
    render(<LessonLayout lesson={mockLesson} />);
    expect(screen.getAllByText(/终端区域/).length).toBeGreaterThan(0);
  });

  it("renders step dots", () => {
    render(<LessonLayout lesson={mockLesson} />);
    const dots = screen.getAllByLabelText(/跳转到第 \d+ 步/);
    expect(dots.length).toBeGreaterThan(0);
  });
});
