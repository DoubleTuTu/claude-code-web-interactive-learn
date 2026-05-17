import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  AgentLoopAnimation,
  ToolDispatchAnimation,
  ContextWindowAnimation,
  TddCycleAnimation,
} from "@/components/animations";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

describe("AgentLoopAnimation", () => {
  it("renders title", () => {
    render(<AgentLoopAnimation />);
    expect(screen.getAllByText("Agent Loop").length).toBeGreaterThan(0);
  });

  it("renders phase labels", () => {
    render(<AgentLoopAnimation />);
    expect(screen.getAllByText("用户输入").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Claude 思考").length).toBeGreaterThan(0);
    expect(screen.getAllByText("工具调用").length).toBeGreaterThan(0);
    expect(screen.getAllByText("结果返回").length).toBeGreaterThan(0);
  });
});

describe("ToolDispatchAnimation", () => {
  it("renders title", () => {
    render(<ToolDispatchAnimation />);
    expect(screen.getAllByText("工具调用").length).toBeGreaterThan(0);
  });

  it("renders tool names", () => {
    render(<ToolDispatchAnimation />);
    expect(screen.getAllByText("Read").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Write").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Edit").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Bash").length).toBeGreaterThan(0);
  });
});

describe("ContextWindowAnimation", () => {
  it("renders title", () => {
    render(<ContextWindowAnimation />);
    expect(screen.getAllByText("上下文窗口").length).toBeGreaterThan(0);
  });

  it("renders context items", () => {
    render(<ContextWindowAnimation />);
    expect(screen.getAllByText("系统提示").length).toBeGreaterThan(0);
    expect(screen.getAllByText("用户消息").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Claude 响应").length).toBeGreaterThan(0);
  });
});

describe("TddCycleAnimation", () => {
  it("renders title", () => {
    render(<TddCycleAnimation />);
    expect(screen.getAllByText("TDD 循环").length).toBeGreaterThan(0);
  });

  it("renders phase labels", () => {
    render(<TddCycleAnimation />);
    expect(screen.getAllByText("RED").length).toBeGreaterThan(0);
    expect(screen.getAllByText("GREEN").length).toBeGreaterThan(0);
    expect(screen.getAllByText("REFACTOR").length).toBeGreaterThan(0);
  });
});
