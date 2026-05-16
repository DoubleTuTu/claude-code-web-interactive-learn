import { test, expect } from "@playwright/test";

test.describe("Lesson page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lessons/l1-2");
    await page.waitForLoadState("networkidle");
  });

  test("page loads and shows lesson title", async ({ page }) => {
    // Verify the lesson title
    await expect(page.locator("text=安装 Claude Code")).toBeVisible();
  });

  test("shows step counter", async ({ page }) => {
    // Verify step counter
    await expect(page.locator("text=Step 1 / 5")).toBeVisible();
  });

  test("shows first step instruction", async ({ page }) => {
    // Verify first step instruction
    await expect(
      page.locator("text=Claude Code 需要 Node.js 环境")
    ).toBeVisible();
  });

  test("shows terminal area placeholder", async ({ page }) => {
    // First step is guide, should show placeholder
    await expect(page.locator("text=终端区域")).toBeVisible();
  });

  test("advances to terminal step", async ({ page }) => {
    // Click next button
    await page.click("text=下一步 →");

    // Should show terminal header
    await expect(page.locator("text=claude-code-learn — zsh")).toBeVisible();
  });

  test("shows progress bar", async ({ page }) => {
    // Verify progress bar exists
    const progressBar = page.locator(".h-2.bg-\\[var\\(--surface-elevated\\)\\]");
    await expect(progressBar).toBeVisible();
  });
});
