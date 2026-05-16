"use client";

import { motion } from "framer-motion";

type ToolDispatchAnimationProps = Record<string, never>;

const tools = [
  { name: "Read", description: "读取文件内容", icon: "📖", color: "#7aa2f7" },
  { name: "Write", description: "写入文件", icon: "✏️", color: "#9ece6a" },
  { name: "Edit", description: "编辑文件", icon: "🔧", color: "#e0af68" },
  { name: "Bash", description: "执行命令", icon: "💻", color: "#f7768e" },
  { name: "Grep", description: "搜索代码", icon: "🔍", color: "#bb9af7" },
  { name: "Glob", description: "查找文件", icon: "📁", color: "#7dcfff" },
];

export function ToolDispatchAnimation({}: ToolDispatchAnimationProps) {
  return (
    <div className="tool-dispatch-animation">
      <h3 className="text-lg font-semibold text-white mb-4">工具调用</h3>

      <div className="space-y-2">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            className="flex items-center gap-3 p-2 rounded-lg border border-white/10 bg-white/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 1, 1, 0.5],
              x: [-20, 0, 0, 0],
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.3,
              repeat: Infinity,
              repeatDelay: tools.length * 0.3,
            }}
            style={{ borderLeftColor: tool.color, borderLeftWidth: 3 }}
          >
            <span className="text-lg">{tool.icon}</span>
            <div>
              <span className="text-white font-medium">{tool.name}</span>
              <span className="text-sm text-white/60 ml-2">
                {tool.description}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-white/50 mt-4">
        Claude Code 根据需要调用不同的工具
      </p>
    </div>
  );
}
