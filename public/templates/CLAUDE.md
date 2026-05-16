# CLAUDE.md

## 项目概述
[简要描述你的项目，包括主要功能和目标用户]

## 技术栈
- 框架: [Next.js / React / Vue / etc.]
- 语言: [TypeScript / JavaScript / Python / etc.]
- 样式: [Tailwind CSS / CSS Modules / Styled Components / etc.]
- 数据库: [PostgreSQL / MongoDB / Supabase / etc.]
- 部署: [Vercel / AWS / Docker / etc.]

## 编码规范
- 使用 [strict / normal] 模式
- 遵循 [ESLint / Prettier] 规则
- 测试覆盖率要求: [80%+ / 90%+ / etc.]
- 组件命名: [PascalCase / camelCase]
- 文件命名: [kebab-case / camelCase / snake_case]

## 常用命令
```bash
# 开发
pnpm dev

# 测试
pnpm test
pnpm test:watch
pnpm test:coverage

# 代码检查
pnpm lint
pnpm typecheck

# 构建
pnpm build

# 部署
vercel deploy
```

## 目录结构
```
src/
├── app/           # 页面路由
├── components/    # 可复用组件
├── lib/           # 工具函数和业务逻辑
├── types/         # TypeScript 类型定义
├── hooks/         # 自定义 Hooks
├── context/       # React Context
└── styles/        # 全局样式
```

## 重要注意事项
- [列出项目中的特殊规则或已知问题]
- [性能优化注意事项]
- [安全相关注意事项]

## API 端点
- `GET /api/xxx` - [描述]
- `POST /api/xxx` - [描述]
- `PUT /api/xxx` - [描述]
- `DELETE /api/xxx` - [描述]

## 环境变量
```bash
# 必需
DATABASE_URL=xxx
NEXT_PUBLIC_API_URL=xxx

# 可选
DEBUG=false
LOG_LEVEL=info
```

## 部署流程
1. 运行测试: `pnpm test`
2. 构建项目: `pnpm build`
3. 部署到生产: `vercel deploy --prod`

## 常见问题
### Q: [常见问题 1]
A: [解决方案]

### Q: [常见问题 2]
A: [解决方案]
