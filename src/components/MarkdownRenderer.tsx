"use client";

import { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderMarkdown(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = escapeHtml(code.trim());
    return `<pre class="bg-[var(--terminal-bg)] rounded-lg p-4 overflow-x-auto border border-[var(--border)]"><code class="text-sm font-mono text-[var(--terminal-output)]">${escaped}</code></pre>`;
  });

  // Inline code (`...`)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-[var(--surface-elevated)] px-1.5 py-0.5 rounded text-sm font-mono text-[var(--accent-green)]">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3 text-[var(--fg)]">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-8 mb-4 text-[var(--fg)]">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-[var(--fg)]">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-[var(--fg)]">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[var(--accent-purple)] pl-4 py-1 my-4 text-[var(--fg-secondary)] italic">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>');

  // Tables (basic support)
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, body) => {
    const headers = header.split("|").filter(Boolean).map((h: string) =>
      `<th class="px-3 py-2 text-left border-b border-[var(--border)] text-[var(--fg)]">${h.trim()}</th>`
    ).join("");
    const rows = body.trim().split("\n").map((row: string) => {
      const cells = row.split("|").filter(Boolean).map((c: string) =>
        `<td class="px-3 py-2 border-b border-[var(--border)]">${c.trim()}</td>`
      ).join("");
      return `<tr>${cells}</tr>`;
    }).join("");
    return `<table class="w-full my-4"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Paragraphs (wrap remaining lines)
  html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="mb-3 leading-relaxed text-[var(--fg-secondary)]">$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-3 leading-relaxed text-\[var\(--fg-secondary\)\]"><\/p>/g, "");

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
