# 截图说明

这个目录用于存放项目的截图和 GIF 动画，用于 README.md 的展示。

## 需要的截图

### 1. homepage.png
- **描述**: 首页截图
- **尺寸**: 800x600 或 1200x800
- **内容**: 展示课程列表、功能介绍、深色主题

### 2. lesson.png
- **描述**: 课程页面截图
- **尺寸**: 800x600 或 1200x800
- **内容**: 展示左教程+右终端的布局

### 3. terminal.png
- **描述**: 终端模拟截图
- **尺寸**: 800x600 或 1200x800
- **内容**: 展示 xterm.js 终端，绿色光标

### 4. animation.gif
- **描述**: 动画演示 GIF
- **尺寸**: 800x600 或 1200x800
- **内容**: 展示 Agent Loop 或工具调用的动画过程
- **时长**: 3-5 秒

## 如何截图

### 使用浏览器截图

1. 启动开发服务器: `pnpm dev`
2. 打开浏览器访问 http://localhost:3000
3. 使用浏览器开发者工具截图:
   - Chrome: `Ctrl+Shift+I` → `Ctrl+Shift+P` → "Capture screenshot"
   - Firefox: `Ctrl+Shift+I` → "Screenshot" 按钮

### 使用系统截图工具

- **Mac**: `Cmd+Shift+4` (区域截图)
- **Windows**: `Win+Shift+S` (区域截图)
- **Linux**: `Print Screen` 或使用 GNOME Screenshot

### 录制 GIF

推荐工具:
- [LICEcap](https://www.cockos.com/licecap/) (免费，跨平台)
- [ScreenToGif](https://www.screentogif.com/) (免费，Windows)
- [Kap](https://getkap.co/) (免费，Mac)

## 截图最佳实践

1. **使用深色主题** - 与项目风格一致
2. **隐藏敏感信息** - 不要显示 API Key、密码等
3. **保持简洁** - 不要显示太多无关内容
4. **高分辨率** - 使用 2x 分辨率，保证清晰
5. **统一尺寸** - 所有截图使用相同尺寸

## 文件命名

```
docs/screenshots/
├── homepage.png          # 首页截图
├── lesson.png            # 课程页面截图
├── terminal.png          # 终端模拟截图
├── animation.gif         # 动画演示 GIF
├── mobile.png            # 移动端截图 (可选)
└── dark-light.png        # 深色/浅色对比 (可选)
```

## 上传到 GitHub

1. 将截图文件添加到这个目录
2. 提交到 Git 仓库
3. README.md 中的图片链接会自动生效

```bash
git add docs/screenshots/
git commit -m "Add screenshots"
git push
```

## 注意事项

- 图片文件不要太大 (< 1MB)
- GIF 文件不要太长 (< 10 秒)
- 使用有意义的文件名
- 定期更新截图 (UI 变化时)
