"use client";

import { motion } from "framer-motion";

type AgentLoopAnimationProps = Record<string, never>;

const CYCLE_DURATION = 2;
const PAUSE_BETWEEN = 0.5;

interface Phase {
  label: string;
  description: string;
  icon: string;
  color: string;
}

const phases: Phase[] = [
  {
    label: "用户输入",
    description: "用户输入消息或命令",
    icon: "⌨️",
    color: "#7aa2f7",
  },
  {
    label: "Claude 思考",
    description: "模型处理并生成响应",
    icon: "🧠",
    color: "#bb9af7",
  },
  {
    label: "工具调用",
    description: "调用 Read、Edit、Bash 等工具",
    icon: "🔧",
    color: "#7dcfff",
  },
  {
    label: "结果返回",
    description: "工具执行结果反馈给模型",
    icon: "✅",
    color: "#9ece6a",
  },
];

export function AgentLoopAnimation({}: AgentLoopAnimationProps) {
  return (
    <div className="agent-loop-animation">
      <h3 className="text-lg font-semibold text-white mb-4">Agent Loop</h3>

      <div className="grid grid-cols-2 gap-3">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.label}
            className="p-3 rounded-lg border border-white/10 bg-white/5"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{
              opacity: [0.3, 1, 1, 0.3],
              scale: [0.95, 1.02, 1.02, 0.95],
            }}
            transition={{
              duration: (CYCLE_DURATION + PAUSE_BETWEEN) * phases.length,
              times: [
                index / phases.length,
                (index + 0.3) / phases.length,
                (index + 0.7) / phases.length,
                (index + 1) / phases.length,
              ],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ borderLeftColor: phase.color, borderLeftWidth: 3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{phase.icon}</span>
              <span className="text-white font-medium">{phase.label}</span>
            </div>
            <p className="text-sm text-white/60 mt-1">{phase.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-4 text-2xl text-white/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        ↻
      </motion.div>

      <p className="text-center text-sm text-white/50 mt-2">
        Claude Code 重复执行此循环直到任务完成
      </p>
    </div>
  );
}
