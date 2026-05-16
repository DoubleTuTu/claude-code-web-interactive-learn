"use client";

import { motion } from "framer-motion";

type ContextWindowAnimationProps = Record<string, never>;

const contextItems = [
  { type: "system", label: "系统提示", color: "#bb9af7" },
  { type: "user", label: "用户消息", color: "#7aa2f7" },
  { type: "assistant", label: "Claude 响应", color: "#9ece6a" },
  { type: "tool", label: "工具结果", color: "#e0af68" },
  { type: "user", label: "用户消息", color: "#7aa2f7" },
  { type: "assistant", label: "Claude 响应", color: "#9ece6a" },
];

export function ContextWindowAnimation({}: ContextWindowAnimationProps) {
  return (
    <div className="context-window-animation">
      <h3 className="text-lg font-semibold text-white mb-4">上下文窗口</h3>

      <div className="relative border border-white/20 rounded-lg p-4 bg-white/5">
        <div className="text-xs text-white/50 mb-3">
          Context Window (200K tokens)
        </div>

        <div className="space-y-2">
          {contextItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-2 rounded border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: [0, 1, 1, index === contextItems.length - 1 ? 1 : 0.5],
                height: ["0px", "auto", "auto", "auto"],
              }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                repeat: Infinity,
                repeatDelay: contextItems.length * 0.5,
              }}
              style={{ backgroundColor: `${item.color}20` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-white">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute bottom-2 right-2 text-xs text-white/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          压缩中...
        </motion.div>
      </div>

      <p className="text-center text-sm text-white/50 mt-4">
        上下文窗口随对话增长，必要时需要压缩
      </p>
    </div>
  );
}
