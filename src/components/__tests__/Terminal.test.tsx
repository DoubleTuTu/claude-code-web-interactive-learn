import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Terminal } from "@/components/Terminal";

// Capture the onData callback registered by the component
let onDataCallback: ((data: string) => void) | null = null;

vi.mock("@xterm/xterm", () => {
  class MockTerminal {
    loadAddon = vi.fn();
    open = vi.fn();
    writeln = vi.fn();
    write = vi.fn();
    onData = vi.fn((cb: (data: string) => void) => {
      onDataCallback = cb;
      return { dispose: vi.fn() };
    });
    dispose = vi.fn();
  }
  return { Terminal: MockTerminal };
});

vi.mock("@xterm/addon-fit", () => ({
  FitAddon: class MockFitAddon {
    fit = vi.fn();
  },
}));

const terminalStep = {
  id: "step-2",
  type: "terminal" as const,
  instruction: "现在让我们检查你的 Node.js 版本。",
  hint: "输入 `node --version` 然后按回车",
  expectedInput: "node --version",
  output: "v20.11.0",
  feedback: {
    success: "✅ 太棒了！你的 Node.js 版本是 v20.11.0",
    failure: "❌ 不太对哦～试试输入 `node --version`",
  },
};

describe("Terminal component", () => {
  beforeEach(() => {
    onDataCallback = null;
  });

  it("renders a terminal container with application role", () => {
    render(<Terminal step={terminalStep} />);
    const terminal = screen.getByRole("application", {
      name: "终端模拟器",
    });
    expect(terminal).toBeInTheDocument();
  });

  it("shows success feedback on correct input", () => {
    render(<Terminal step={terminalStep} />);
    expect(onDataCallback).not.toBeNull();

    // Simulate typing "node --version" and pressing Enter
    act(() => {
      for (const ch of "node --version") {
        onDataCallback!(ch);
      }
      onDataCallback!("\r");
    });

    expect(screen.getAllByText(/太棒了/).length).toBeGreaterThan(0);
  });

  it("shows hint on wrong input", () => {
    render(<Terminal step={terminalStep} />);
    expect(onDataCallback).not.toBeNull();

    // Simulate typing wrong command and pressing Enter
    act(() => {
      for (const ch of "wrong") {
        onDataCallback!(ch);
      }
      onDataCallback!("\r");
    });

    // First failure should show the hint from step.hint
    expect(
      screen.getAllByText(/输入 `node --version` 然后按回车/).length
    ).toBeGreaterThan(0);
  });

  it("handles backspace correctly", () => {
    render(<Terminal step={terminalStep} />);
    expect(onDataCallback).not.toBeNull();

    // Type "node", backspace 4 times, then type "node --version"
    act(() => {
      for (const ch of "node") {
        onDataCallback!(ch);
      }
      onDataCallback!("\x7f"); // backspace
      onDataCallback!("\x7f"); // backspace
      onDataCallback!("\x7f"); // backspace
      onDataCallback!("\x7f"); // backspace
      for (const ch of "node --version") {
        onDataCallback!(ch);
      }
      onDataCallback!("\r");
    });

    expect(screen.getAllByText(/太棒了/).length).toBeGreaterThan(0);
  });

  it("cleans up terminal on unmount", () => {
    const { unmount } = render(<Terminal step={terminalStep} />);
    unmount();
    // No assertion needed — verifies the cleanup path runs without error
  });
});
