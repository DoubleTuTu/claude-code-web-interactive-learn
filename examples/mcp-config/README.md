# MCP 配置示例

这个示例展示了如何配置 MCP (Model Context Protocol) 服务器，让 Claude Code 能够访问外部工具和数据源。

## 示例配置

### 1. 文件系统访问
查看 `filesystem-config.json` - 配置文件系统 MCP 服务器。

### 2. GitHub 集成
查看 `github-config.json` - 配置 GitHub MCP 服务器。

### 3. 数据库访问
查看 `database-config.json` - 配置数据库 MCP 服务器。

## 常用 MCP 服务器

### 文件系统 (@anthropic-ai/mcp-filesystem)
```bash
npm install -g @anthropic-ai/mcp-filesystem
```
- 读写本地文件
- 目录遍历
- 文件搜索

### GitHub (@anthropic-ai/mcp-github)
```bash
npm install -g @anthropic-ai/mcp-github
```
- 仓库管理
- Issue 和 PR 操作
- 代码搜索

### PostgreSQL (@anthropic-ai/mcp-postgres)
```bash
npm install -g @anthropic-ai/mcp-postgres
```
- 数据库查询
- Schema 管理
- 数据导出

### Slack (@anthropic-ai/mcp-slack)
```bash
npm install -g @anthropic-ai/mcp-slack
```
- 发送消息
- 读取频道
- 文件分享

## 配置方法

1. 安装 MCP 服务器包
2. 在 `.claude/settings.json` 中配置
3. 设置必要的环境变量
4. 重启 Claude Code

## 配置示例

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-filesystem", "./project"]
    },
    "github": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## 安全注意事项

1. **限制访问范围** - 只授权必要的目录和权限
2. **使用环境变量** - 不要在配置文件中硬编码密钥
3. **定期审查** - 检查 MCP 服务器的访问日志
4. **最小权限原则** - 只授予完成任务所需的最小权限

## 故障排除

### MCP 服务器无法连接
1. 检查服务器是否安装: `npm list -g @anthropic-ai/mcp-xxx`
2. 检查环境变量是否设置
3. 检查网络连接

### 工具调用失败
1. 检查权限配置
2. 查看错误日志
3. 验证输入参数

### 性能问题
1. 减少同时连接的 MCP 服务器数量
2. 使用连接池
3. 优化查询
