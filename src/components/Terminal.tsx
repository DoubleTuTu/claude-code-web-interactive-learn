"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import type { TerminalStep } from "@/types/lesson";

const PROMPT = "$ ";
const MAX_ATTEMPTS = 3;

interface TerminalProps {
  step: TerminalStep;
  onComplete?: () => void;
}

export function Terminal({ step, onComplete }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const inputBuffer = useRef("");
  const onCompleteRef = useRef(onComplete);
  const [attemptCount, setAttemptCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Notify parent when step completes
  useEffect(() => {
    if (status === "success") {
      onCompleteRef.current?.();
    }
  }, [status]);

  const writePrompt = useCallback((term: XTerminal) => {
    term.write("\r\n" + PROMPT);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new XTerminal({
      theme: {
        background: "#0A0E1A",
        foreground: "#E2E8F0",
        cursor: "#22C55E",
        cursorAccent: "#0A0E1A",
      },
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14,
      cursorBlink: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    try {
      term.open(containerRef.current);
      fitAddon.fit();
    } catch {
      term.dispose();
      return;
    }

    termRef.current = term;
    fitRef.current = fitAddon;

    // Show initial prompt only
    term.write(PROMPT);

    // Handle user input
    term.onData((data) => {
      if (data === "\r") {
        // Enter pressed
        const input = inputBuffer.current.trim();
        inputBuffer.current = "";

        if (input === step.expectedInput) {
          // Correct
          term.writeln("");
          step.output.split("\n").forEach((line) => {
            term.writeln(`\x1b[32m${line}\x1b[0m`);
          });
          setStatus("success");
          writePrompt(term);
        } else {
          // Wrong
          setAttemptCount((prev) => {
            const next = prev + 1;
            if (next >= MAX_ATTEMPTS) {
              // Show correct answer after 3 failures
              term.writeln("");
              term.writeln(`\x1b[33m正确命令: ${step.expectedInput}\x1b[0m`);
              step.output.split("\n").forEach((line) => {
                term.writeln(`\x1b[32m${line}\x1b[0m`);
              });
              setStatus("success");
              writePrompt(term);
            } else {
              term.writeln("");
              term.writeln(`\x1b[31m✗ 命令不正确\x1b[0m`);
              setStatus("failure");
              writePrompt(term);
            }
            return next;
          });
        }
      } else if (data === "\x7f") {
        // Backspace
        if (inputBuffer.current.length > 0) {
          inputBuffer.current = inputBuffer.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (data >= " ") {
        // Printable character
        inputBuffer.current += data;
        term.write(`\x1b[32m${data}\x1b[0m`);
      }
    });

    return () => {
      try {
        term.dispose();
      } finally {
        termRef.current = null;
        fitRef.current = null;
      }
    };
  }, [step.id, step.expectedInput, step.output, writePrompt]);

  // Fit on resize (throttled via rAF)
  useEffect(() => {
    let rafId = 0;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => fitRef.current?.fit());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getHint = () => {
    if (status !== "failure") return null;
    if (attemptCount === 1) {
      return { label: "💡 提示", text: step.hint || "再试一次" };
    }
    if (attemptCount === 2) {
      return {
        label: "📝 详细提示",
        text: `命令是 \`${step.expectedInput}\``,
      };
    }
    return null;
  };

  const hint = getHint();

  return (
    <div className="h-full flex flex-col">
      <div
        ref={containerRef}
        role="application"
        aria-label="终端模拟器"
        title="在此输入命令，按回车提交"
        className="flex-1 min-h-0"
      />
      {hint && (
        <div className="mt-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-3">
          <div className="text-xs font-medium tracking-wider uppercase text-yellow-400 mb-1">
            {hint.label}
          </div>
          <p className="text-sm text-[var(--fg-secondary)]">{hint.text}</p>
        </div>
      )}
      {status === "success" && (
        <div className="mt-3 bg-[var(--accent-green-subtle)] border border-[var(--accent-green)]/20 rounded-lg px-4 py-3 flex items-start gap-2.5">
          <span className="text-[var(--accent-green)]">✓</span>
          <div>
            <div className="text-sm font-medium text-[var(--accent-green)]">
              {step.feedback.success}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
