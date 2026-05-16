# CLAUDE.md - Next.js 项目

## 项目概述
这是一个基于 Next.js 16 的全栈 Web 应用，使用 TypeScript 和 Tailwind CSS 构建。

## 技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript (strict 模式)
- **样式**: Tailwind CSS 4
- **状态管理**: Zustand
- **数据获取**: React Query
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js
- **部署**: Vercel

## 编码规范
- 使用 TypeScript strict 模式
- 组件使用 React 19 特性（Server Components 优先）
- 样式使用 Tailwind CSS 变量系统
- 测试覆盖率要求: 80%+
- 组件命名: PascalCase
- 文件命名: kebab-case

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

# 数据库
pnpm db:generate    # 生成 Prisma 客户端
pnpm db:push        # 推送 schema 变更
pnpm db:migrate     # 运行迁移
pnpm db:seed        # 填充测试数据

# 构建
pnpm build

# 部署
vercel deploy
```

## 目录结构
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # 认证相关路由
│   ├── (dashboard)/        # 仪表盘路由
│   ├── api/                # API 路由
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # React 组件
│   ├── ui/                 # 基础 UI 组件
│   ├── forms/              # 表单组件
│   └── layouts/            # 布局组件
├── lib/                    # 工具函数
│   ├── utils.ts            # 通用工具函数
│   ├── validations.ts      # Zod 验证 schema
│   └── constants.ts        # 常量定义
├── hooks/                  # 自定义 Hooks
├── types/                  # TypeScript 类型定义
└── styles/                 # 全局样式
```

## 重要注意事项
- 使用 Server Components 优先，只在需要时添加 "use client"
- 数据库查询使用 Prisma，避免原生 SQL
- API 路由使用 Zod 验证输入
- 敏感操作需要认证和授权检查
- 图片使用 next/image 优化
- 字体使用 next/font 优化

## API 端点
- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建用户
- `GET /api/users/:id` - 获取单个用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册

## 环境变量
```bash
# 必需
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# 可选
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DEBUG=false
LOG_LEVEL=info
```

## 部署流程
1. 运行测试: `pnpm test`
2. 构建项目: `pnpm build`
3. 部署到生产: `vercel deploy --prod`

## 常见问题

### Q: Prisma 客户端生成失败
A: 运行 `pnpm db:generate` 重新生成客户端。

### Q: 类型检查失败
A: 运行 `pnpm typecheck` 查看具体错误，修复后重新检查。

### Q: 样式不生效
A: 检查 Tailwind 配置，确保类名正确。

### Q: 数据库连接失败
A: 检查 `DATABASE_URL` 环境变量，确保数据库服务运行正常。
