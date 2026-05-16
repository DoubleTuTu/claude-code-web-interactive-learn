<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ClaudeCode Learn 项目指南

## 项目概述
ClaudeCode Learn 是一个互动教学平台，用于学习 Claude Code。用户通过浏览器中的终端模拟器，按步骤学习 Claude Code 的各种功能。

## 技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript (strict 模式)
- **样式**: Tailwind CSS 4
- **终端模拟**: xterm.js
- **动画**: Framer Motion
- **测试**: Vitest + Playwright
- **包管理**: pnpm

## 项目结构
```
src/
├── app/           # Next.js App Router 页面
├── components/    # React 组件
├── data/          # 课程数据 (JSON)
├── lib/           # 工具函数和业务逻辑
└── types/         # TypeScript 类型定义
```

## 编码规范
1. **TypeScript strict 模式**: 所有代码必须通过类型检查
2. **Zod 验证**: 课程数据在加载时自动验证
3. **组件设计**: 使用 React 19 特性，遵循 Server Components 优先原则
4. **样式**: 使用 Tailwind CSS 变量系统，深色主题
5. **测试**: 核心组件必须有单元测试，关键流程有 E2E 测试

## 开发流程
1. **安装依赖**: `pnpm install`
2. **开发服务器**: `pnpm dev`
3. **运行测试**: `pnpm test` (单元测试) / `pnpm test:e2e` (E2E 测试)
4. **类型检查**: `pnpm typecheck`
5. **代码检查**: `pnpm lint`

## 课程数据格式
课程数据存储在 `src/data/courses.json`，使用 Zod schema 验证：
- Course → Level → Chapter → Lesson → Step
- Step 类型: guide, terminal, animation, quiz
- 每个 ID 必须在同级别内唯一

## 部署
- 使用 Vercel 部署
- 配置文件: `vercel.json` (包含安全头)
- 环境变量: 无敏感信息，纯前端应用

## 注意事项
1. **Chapter ID 唯一性**: 确保 `courses.json` 中的 Chapter ID 在整个文件中唯一
2. **终端模拟**: xterm.js 组件需要客户端渲染，注意 SSR 兼容性
3. **进度保存**: 使用 localStorage 保存学习进度
4. **SEO**: 已配置 Open Graph、JSON-LD、sitemap、robots.txt
