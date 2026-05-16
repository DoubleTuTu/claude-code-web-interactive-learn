import Link from "next/link";
import type { Difficulty } from "@/types/lesson";
import { getCourse, getLessonCount, getAllLessons } from "@/lib/course-loader";
import { getAllCompleted } from "@/lib/progress";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: "bg-[var(--accent-green-subtle)] text-[var(--accent-green)]",
  intermediate: "bg-[var(--accent-purple-subtle)] text-[var(--accent-purple-light)]",
  advanced: "bg-red-500/15 text-red-400",
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
};

const FEATURES = [
  {
    icon: "⌨",
    title: "真实终端体验",
    desc: "基于 xterm.js 的终端模拟器，绿色光标闪烁，就像在你自己电脑上敲命令一样。",
    color: "purple" as const,
  },
  {
    icon: "✓",
    title: "即时反馈",
    desc: "每完成一步立刻告诉你对不对。错了给提示，三次机会后显示答案。不让你卡住。",
    color: "green" as const,
  },
  {
    icon: "↺",
    title: "自动保存进度",
    desc: "关掉浏览器没关系，下次打开从你停下的地方继续学。不需要登录注册。",
    color: "purple" as const,
  },
  {
    icon: "◇",
    title: "零配置",
    desc: "不用安装任何东西。打开网页就能开始学。教学环境我们帮你准备好了。",
    color: "green" as const,
  },
  {
    icon: "⚡",
    title: "5 分钟一课",
    desc: "每节课 5-15 分钟，碎片时间就能学。不用专门腾出两个小时来上课。",
    color: "purple" as const,
  },
  {
    icon: "☆",
    title: "正向鼓励",
    desc: "每完成一步都有温暖鼓励。学编程很难坚持？我们把学习变成闯关游戏。",
    color: "green" as const,
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "ClaudeCode Learn — 互动教学平台",
  description: "在浏览器中操作终端模拟器，按步骤学习 Claude Code 的使用方法",
  provider: {
    "@type": "Organization",
    name: "ClaudeCode Learn",
    url: "https://claude-code-web-interactive-learn.vercel.app",
  },
};

export default function Home() {
  const course = getCourse();
  const totalLessons = getLessonCount();
  const completedLessons = getAllCompleted();

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-12 py-4 border-b border-[var(--border)] sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <span className="w-7 h-7 bg-[var(--accent-purple)] rounded-md flex items-center justify-center font-mono text-sm font-medium text-white">
            &gt;_
          </span>
          ClaudeCode Learn
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#courses" className="text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--fg)] transition-colors">
            课程
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex items-center justify-between px-12 py-20 max-w-[1400px] mx-auto w-full gap-16">
        <div className="flex-1 max-w-[560px]">
          <div className="inline-flex items-center gap-1.5 bg-[var(--accent-green-subtle)] text-[var(--accent-green)] text-xs font-medium tracking-wider px-3.5 py-1.5 rounded-2xl mb-6">
            <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full animate-pulse" />
            免费开源 · 浏览器内学习
          </div>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            在终端里<br />
            <span className="bg-gradient-to-r from-[var(--accent-purple-light)] to-[var(--accent-green)] bg-clip-text text-transparent">
              学会 Claude Code
            </span>
          </h1>
          <p className="text-[var(--fg-secondary)] text-lg leading-relaxed mb-8">
            不用看视频、不用翻文档。打开浏览器，左边跟着教程走，右边直接在终端里敲命令。
            每完成一步都有即时反馈 —— 学编程就该这么简单。
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/lessons/l1-1"
              className="bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)] text-white px-6 py-3 rounded-lg text-base font-medium transition-colors"
            >
              免费开始学习 →
            </Link>
            <Link
              href="#courses"
              className="border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-white/5 text-[var(--fg-secondary)] hover:text-[var(--fg)] px-6 py-3 rounded-lg text-base font-medium transition-all"
            >
              查看课程大纲
            </Link>
          </div>
        </div>

        {/* Hero Terminal Preview */}
        <div className="flex-1 max-w-[520px] bg-[var(--terminal-bg)] rounded-xl border border-[var(--border)] overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-[var(--border)]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="flex-1 text-center font-mono text-xs text-[var(--fg-muted)]">claude-code — zsh</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed">
            <div className="mb-1"><span className="text-[var(--terminal-prompt)]">$ </span><span className="text-[var(--terminal-cursor)]">claude</span></div>
            <div className="mb-1 text-[var(--terminal-output)]">Welcome to Claude Code!</div>
            <div className="mb-1">&nbsp;</div>
            <div className="mb-1"><span className="text-[var(--terminal-prompt)]">$ </span><span className="text-[var(--terminal-cursor)]">claude &quot;帮我创建一个 React 组件&quot;</span></div>
            <div className="mb-1 text-[var(--accent-green)]">✓ 已创建 src/components/Hello.tsx</div>
            <div className="mb-1 text-[var(--accent-green)]">✓ 已更新 src/App.tsx</div>
            <div className="mb-1">&nbsp;</div>
            <div><span className="text-[var(--terminal-prompt)]">$ </span><span className="inline-block w-2 h-4 bg-[var(--terminal-cursor)] animate-pulse align-text-bottom" /></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-12 py-20 max-w-[1400px] mx-auto w-full">
        <div className="text-xs font-medium tracking-wider uppercase text-[var(--accent-purple-light)] mb-3">
          为什么选择我们
        </div>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          边学边练，不是边看边忘
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:bg-[var(--surface-elevated)] hover:border-[var(--border-hover)] transition-all group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 ${
                  f.color === "purple"
                    ? "bg-[var(--accent-purple-subtle)] text-[var(--accent-purple-light)]"
                    : "bg-[var(--accent-green-subtle)] text-[var(--accent-green)]"
                }`}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course List */}
      <section id="courses" className="px-12 py-20 max-w-[1400px] mx-auto w-full">
        <div className="text-xs font-medium tracking-wider uppercase text-[var(--accent-purple-light)] mb-3">
          学习路径
        </div>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          从零开始，循序渐进
        </h2>
        <div className="flex flex-col gap-4">
          {course.levels.map((level) =>
            level.chapters.map((chapter) =>
              chapter.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="flex items-center gap-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-6 py-5 hover:bg-[var(--surface-elevated)] hover:border-[var(--border-hover)] transition-all group"
                >
                  <span className="font-mono text-xs text-[var(--fg-muted)] w-8 shrink-0">
                    {String(
                      getAllLessons(getCourse()).findIndex((l) => l.id === lesson.id) + 1
                    ).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold mb-1 group-hover:text-[var(--accent-purple-light)] transition-colors">
                      {lesson.title}
                    </div>
                    <div className="text-sm text-[var(--fg-secondary)] truncate">
                      {lesson.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--fg-muted)] shrink-0">
                    {completedLessons[lesson.id] && (
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-green-subtle)] flex items-center justify-center text-[var(--accent-green)] text-xs">
                        ✓
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-2xl font-medium text-[0.6875rem] ${DIFFICULTY_STYLES[lesson.difficulty]}`}>
                      {DIFFICULTY_LABELS[lesson.difficulty]}
                    </span>
                    <span>{lesson.steps.length} 步</span>
                  </div>
                </Link>
              ))
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 text-center max-w-[700px] mx-auto w-full">
        <h2 className="text-3xl font-bold tracking-tight mb-4">准备好了吗？</h2>
        <p className="text-[var(--fg-secondary)] text-lg leading-relaxed mb-8">
          打开浏览器，5 分钟后你就能用 Claude Code 写出你的第一行代码。
        </p>
        <Link
          href="/lessons/l1-1"
          className="inline-block bg-[var(--accent-purple)] hover:bg-[var(--accent-purple-light)] text-white px-8 py-3.5 rounded-lg text-base font-medium transition-colors"
        >
          立即开始，免费学习 →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-12 py-8 text-center text-xs text-[var(--fg-muted)]">
        ClaudeCode Learn · 开源项目 · 用 ❤️ 为开发者打造 · 共 {totalLessons} 节课程
      </footer>
    </div>
  );
}
