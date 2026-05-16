# Claude Code 常用命令参考

## 基础命令
```bash
# 启动 Claude Code
claude

# 带提示启动
claude "你的问题或任务"

# 非交互模式（直接输出结果）
claude -p "你的问题"

# 恢复上次会话
claude --resume

# 查看版本
claude --version

# 查看帮助
claude --help
```

## 斜杠命令
```bash
# 查看可用技能
/skills

# 加载技能
/load-skill <skill-name>

# 查看 Hooks
/hooks

# 查看 MCP 服务器
/mcp

# 查看权限配置
/permissions

# 压缩上下文
/compact

# 查看团队（如果有）
/team

# 查看任务板（如果有）
/tasks
```

## 常用操作
### 文件操作
```bash
# 读取文件
claude "Read package.json"

# 创建文件
claude "Create a file called hello.py that prints 'Hello, World!'"

# 编辑文件
claude "Edit hello.py to add a main guard"

# 搜索文件
claude "Find all TypeScript files in src/"
```

### 代码操作
```bash
# 运行测试
claude "Run the tests"

# 代码审查
claude "Review the code in src/components/"

# 重构代码
claude "Refactor the auth module to use async/await"

# 添加类型
claude "Add TypeScript types to utils.ts"
```

### Git 操作
```bash
# 查看状态
claude "Show git status"

# 创建提交
claude "Commit the changes with a descriptive message"

# 创建分支
claude "Create a new feature branch called user-auth"

# 查看差异
claude "Show the diff of the last commit"
```

## 高级操作
### 使用子代理
```bash
# 使用子代理完成任务
claude "Use a subtask to find all test files"

# 委托复杂任务
claude "Delegate: read all Python files and summarize each one"
```

### 后台任务
```bash
# 在后台运行命令
claude "Run npm install in the background"

# 检查后台任务状态
claude "Check the status of background tasks"
```

### 团队协作
```bash
# 创建队友
claude "Spawn alice as coder"

# 发送消息
claude "Send a message to alice:请检查登录模块"

# 查看团队
claude "/team"
```

## 配置管理
### CLAUDE.md
```bash
# 创建 CLAUDE.md
claude "Create a CLAUDE.md file for this project"

# 查看 CLAUDE.md
cat CLAUDE.md
```

### 权限配置
```bash
# 查看权限
claude "/permissions"

# 允许特定操作
claude "/permission allow write_file:./src/**"

# 拒绝特定操作
claude "/permission deny bash:rm -rf *"
```

### MCP 配置
```bash
# 查看 MCP 服务器
claude "/mcp"

# 添加 MCP 服务器
claude "/mcp add filesystem npx @anthropic-ai/mcp-filesystem ./project"
```

## 调试技巧
```bash
# 查看上下文大小
claude "How many tokens are in the context?"

# 手动压缩上下文
claude "/compact"

# 查看可用工具
claude "What tools are available?"

# 查看当前目录
claude "List files in current directory"
```

## 快捷键
- `Ctrl+C` - 取消当前操作
- `Ctrl+D` - 退出 Claude Code
- `Up/Down` - 浏览历史命令
- `Tab` - 自动补全

## 最佳实践
1. **先探索后编码** - 先让 Claude 了解项目结构
2. **使用 CLAUDE.md** - 保存项目规范和常用命令
3. **分步完成** - 将大任务拆分为小步骤
4. **验证结果** - 运行测试确保代码正确
5. **及时提交** - 完成一个小功能就提交
