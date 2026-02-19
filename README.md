# My SaaS App Start

基于 TanStack Start 的 SaaS 项目模板，部署到 Cloudflare Workers。

## 技术栈

| 分类 | 技术 |
|---|---|
| 框架 | TanStack Start + React 19 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 数据库 | Supabase PostgreSQL + Drizzle ORM |
| 数据库连接 | Cloudflare Hyperdrive（生产）/ 直连（开发） |
| 认证 | Better Auth（GitHub OAuth + 邮箱密码） |
| 文档 | Fumadocs（MDX 渲染） |
| 部署 | Cloudflare Workers |
| 构建 | Vite 7 |

## 项目结构

```
src/
├── components/ui/       # shadcn 组件
├── db/
│   ├── index.ts         # 数据库连接（自动适配 dev/Workers 环境）
│   ├── config.ts        # drizzle-kit 配置
│   ├── schema/          # Drizzle schema 定义
│   └── migrations/      # 数据库迁移文件
├── lib/
│   ├── auth.ts          # Better Auth 服务端配置
│   ├── auth-client.ts   # Better Auth 客户端
│   └── auth.server.ts   # 鉴权相关 server functions
├── routes/
│   ├── __root.tsx        # 根布局
│   ├── (site)/           # 公开页面（首页、博客、定价等）
│   ├── (protected)/      # 需要登录的页面（settings 等）
│   ├── (legal)/          # 法律条款页面
│   └── api/              # API 路由（auth 回调等）
```

## 环境变量

在 `.env.local` 中配置：

```env
DATABASE_URL="postgresql://localhost:5432/tanstack_start_saas"
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## 开发

```bash
pnpm install
pnpm run dev          # 启动开发服务器 http://localhost:3000
```

## 数据库

```bash
pnpm run db:generate  # 生成迁移文件
pnpm run db:migrate   # 执行迁移
pnpm run db:push      # 直接推送 schema 到数据库（开发用）
pnpm run db:studio    # 打开 Drizzle Studio
```

## 部署

```bash
pnpm run deploy       # 构建并部署到 Cloudflare Workers
```

### Hyperdrive 配置

生产环境通过 Cloudflare Hyperdrive 代理数据库连接。创建 Hyperdrive 实例：

```bash
pnpm wrangler hyperdrive create my-hyperdrive \
  --connection-string="postgresql://user:password@host:5432/dbname"
```

将返回的 ID 填入 `wrangler.jsonc` 的 `hyperdrive[0].id` 中。

如需关闭 Hyperdrive 查询缓存（实时性要求高的场景）：

```bash
pnpm wrangler hyperdrive update <id> --caching-disabled
```

## 关键设计决策

### 数据库连接（db/index.ts）

通过 `getDb()` 异步函数获取数据库实例，自动适配两种运行环境：

- **开发模式**：Cloudflare Vite 插件禁用（避免 workerd 运行时的 TCP 连接问题），直连本地数据库，全局缓存连接防止 HMR 泄漏
- **生产模式**：通过 `import('cloudflare:workers')` 获取 Hyperdrive 连接字符串，每次请求创建新实例（Hyperdrive 管理底层连接池），`prepare: false` 因 Hyperdrive 事务池模式要求

### Vite 配置（vite.config.ts）

Cloudflare 插件仅在 `vite build` 时启用（`command === 'build'`），开发时 SSR 运行在 Node.js 中，避免 workerd 运行时导致 postgres.js TCP 连接交替失败的问题。

### 鉴权

- **路由守卫**：`(protected)/route.tsx` 的 `beforeLoad` 中调用 `getSession()`，未登录 redirect 到 `/login`，session 通过 route context 向下传递给所有子路由
- **Server Function 鉴权**：调用 `ensureSession()` 抛普通 Error，由客户端 catch 处理
- **客户端前置检查**：mutation 前先检查 `authClient.useSession()` 状态，避免无意义的请求
