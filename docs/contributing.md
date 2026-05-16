# Contributing to ClaudeCode Learn

感谢你对 ClaudeCode Learn 项目的贡献！本文档说明课程内容的 JSON 格式规范。

## 课程 JSON 格式

### 课程层级结构

```
Course
└── Level (入门/进阶/高级)
    └── Chapter (主题分组)
        └── Lesson (独立教程)
            └── Step (操作步骤)
```

### 完整示例

```json
{
  "id": "claudecode-learn",
  "title": "ClaudeCode Learn",
  "description": "学习 Claude Code 的互动教学平台",
  "locale": "zh",
  "levels": [
    {
      "id": "level-1",
      "title": "入门",
      "description": "Claude Code 基础知识",
      "chapters": [
        {
          "id": "ch1",
          "title": "认识 Claude Code",
          "description": "了解 Claude Code",
          "lessons": [
            {
              "id": "l1-1",
              "title": "什么是 Claude Code",
              "description": "了解 Claude Code 的基本概念",
              "difficulty": "beginner",
              "steps": [...]
            }
          ]
        }
      ]
    }
  ]
}
```

### 字段说明

#### Course (课程)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 课程唯一标识 |
| `title` | string | ✅ | 课程标题 |
| `description` | string | ✅ | 课程描述 |
| `locale` | string | ✅ | 语言代码（如 "zh"、"en"） |
| `levels` | Level[] | ✅ | 学习阶段数组 |

#### Level (学习阶段)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 阶段唯一标识 |
| `title` | string | ✅ | 阶段标题（如 "入门"、"进阶"、"高级"） |
| `description` | string | ✅ | 阶段描述 |
| `chapters` | Chapter[] | ✅ | 章节数组 |

#### Chapter (章节)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 章节唯一标识 |
| `title` | string | ✅ | 章节标题 |
| `description` | string | ✅ | 章节描述 |
| `lessons` | Lesson[] | ✅ | 课程数组 |

#### Lesson (课程)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 课程唯一标识 |
| `title` | string | ✅ | 课程标题 |
| `description` | string | ✅ | 课程描述 |
| `difficulty` | "beginner" \| "intermediate" \| "advanced" | ✅ | 难度等级 |
| `steps` | Step[] | ✅ | 步骤数组 |

### Step 类型

Step 是课程的最小操作单元，有 4 种类型：

#### 1. Guide Step (引导步骤)

展示图文说明，不需要终端操作。

```json
{
  "id": "step-1",
  "type": "guide",
  "instruction": "首先，我们需要打开终端应用。",
  "visual": "terminal-icon.png",
  "annotation": "在 macOS 中，终端叫 Terminal"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 步骤唯一标识 |
| `type` | "guide" | ✅ | 步骤类型 |
| `instruction` | string | ✅ | 说明文字 |
| `visual` | string | ❌ | 可选，图片路径 |
| `annotation` | string | ❌ | 可选，补充说明（"小知识"） |

#### 2. Terminal Step (终端步骤)

学习者在终端模拟器中输入命令。

```json
{
  "id": "step-2",
  "type": "terminal",
  "instruction": "检查你的 Node.js 版本。",
  "hint": "输入 `node --version` 然后按回车",
  "expectedInput": "node --version",
  "output": "v20.11.0",
  "outputAnimation": "typewriter",
  "feedback": {
    "success": "✅ 太棒了！你的 Node.js 版本是 v20.11.0",
    "failure": "❌ 不太对哦～试试输入 `node --version`"
  }
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 步骤唯一标识 |
| `type` | "terminal" | ✅ | 步骤类型 |
| `instruction` | string | ✅ | 说明文字 |
| `hint` | string | ❌ | 可选，提示文字 |
| `expectedInput` | string | ✅ | 期望输入的命令 |
| `output` | string | ✅ | 命令执行后的输出 |
| `outputAnimation` | "spinner" \| "typewriter" \| "instant" | ❌ | 可选，输出动画类型 |
| `feedback` | object | ✅ | 反馈信息 |
| `feedback.success` | string | ✅ | 正确时的反馈 |
| `feedback.failure` | string | ✅ | 错误时的反馈 |

#### 3. Animation Step (动画步骤)

展示概念可视化动画。

```json
{
  "id": "step-3",
  "type": "animation",
  "instruction": "了解 Claude Code 的工作原理：Agent Loop",
  "animationId": "agent-loop"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 步骤唯一标识 |
| `type` | "animation" | ✅ | 步骤类型 |
| `instruction` | string | ✅ | 说明文字 |
| `animationId` | string | ✅ | 动画类型标识 |

**可用的 animationId：**

| animationId | 说明 |
|-------------|------|
| `agent-loop` | Agent 循环动画 |
| `tool-dispatch` | 工具调用动画 |
| `context-window` | 上下文窗口动画 |
| `tdd-cycle` | TDD 循环动画 |

#### 4. Quiz Step (测验步骤)

互动问答，支持选择题。

```json
{
  "id": "step-4",
  "type": "quiz",
  "instruction": "测试你的理解：",
  "question": "Claude Code 的核心工作循环是什么？",
  "options": [
    { "id": "a", "text": "输入 → 输出" },
    { "id": "b", "text": "输入 → 思考 → 工具调用 → 结果 → 循环" },
    { "id": "c", "text": "读取 → 写入 → 执行" },
    { "id": "d", "text": "请求 → 响应" }
  ],
  "correctAnswer": "b"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 步骤唯一标识 |
| `type` | "quiz" | ✅ | 步骤类型 |
| `instruction` | string | ✅ | 说明文字 |
| `question` | string | ✅ | 问题内容 |
| `options` | QuizOption[] | ✅ | 选项数组 |
| `options[].id` | string | ✅ | 选项标识 |
| `options[].text` | string | ✅ | 选项文本 |
| `correctAnswer` | string | ✅ | 正确答案的选项 id |

### 难度等级

| 值 | 说明 |
|------|------|
| `beginner` | 入门级，无需前置知识 |
| `intermediate` | 进阶级，需要基础概念理解 |
| `advanced` | 高级，需要实践经验 |

### 验证

课程 JSON 数据会在加载时通过 Zod schema 进行运行时验证。如果格式不正确，会在控制台显示错误信息。

### 贡献流程

1. Fork 项目
2. 在 `src/data/` 目录下创建或编辑课程 JSON 文件
3. 确保格式符合上述规范
4. 运行 `pnpm test` 验证
5. 提交 Pull Request

### 常见问题

**Q: 如何添加新的 Step 类型？**

A: 在 `src/types/lesson.ts` 中添加新的类型定义，然后在 `StepEngine.tsx` 的 `StepRenderer` 中添加对应的渲染逻辑。

**Q: 如何添加新的动画类型？**

A: 在 `src/components/animations/` 目录下创建新的动画组件，然后在 `StepEngine.tsx` 的 `AnimationRouter` 中添加路由。

**Q: 课程 JSON 文件放在哪里？**

A: 放在 `src/data/` 目录下，文件名建议使用小写字母和连字符（如 `basics.json`）。
