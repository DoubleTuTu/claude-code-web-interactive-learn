"use client";

import { motion } from "framer-motion";

type TddCycleAnimationProps = Record<string, never>;

const phases = [
  {
    label: "RED",
    description: "先写测试，确保失败",
    icon: "🔴",
    color: "#f7768e",
  },
  {
    label: "GREEN",
    description: "写最少代码让测试通过",
    icon: "🟢",
    color: "#9ece6a",
  },
  {
    label: "REFACTOR",
    description: "优化代码，保持测试通过",
    icon: "🔵",
    color: "#7aa2f7",
  },
];

export function TddCycleAnimation({}: TddCycleAnimationProps) {
  return (
    <div className="tdd-cycle-animation">
      <h3 className="text-lg font-semibold text-white mb-4">TDD 循环</h3>

      <div className="flex items-center justify-center gap-4">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{
              opacity: [0.3, 1, 1, 0.3],
              scale: [0.9, 1.1, 1.1, 0.9],
            }}
            transition={{
              duration: 6,
              times: [
                index / phases.length,
                (index + 0.3) / phases.length,
                (index + 0.7) / phases.length,
                (index + 1) / phases.length,
              ],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${phase.color}30` }}
            >
              {phase.icon}
            </div>
            <span
              className="mt-2 font-semibold"
              style={{ color: phase.color }}
            >
              {phase.label}
            </span>
            <span className="text-xs text-white/60 text-center mt-1">
              {phase.description}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center mt-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-white/30 text-2xl">↻</span>
      </motion.div>

      <p className="text-center text-sm text-white/50 mt-2">
        测试驱动开发：先写测试，再写代码，最后重构
      </p>
    </div>
  );
}
