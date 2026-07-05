# 轻舟瑜伽 · 普拉提馆 — 官网

一人一馆 · 湖南宁乡

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- React Router 7
- Zustand（状态管理）

## 本地开发

```bash
npm install
npm run dev          # 启动开发服务器 (默认 http://localhost:5173)
```

## 构建

```bash
npm run build        # 产出 dist/ 目录
npm run preview      # 本地预览构建产物
```

## 自动部署（GitHub + Netlify/Vercel）

每次 `git push` 到 `main` 分支都会自动触发部署。

### Netlify

1. 打开 https://app.netlify.com/ 用 GitHub 登录
2. `Add new site` → `Import an existing project` → 选 `xjf048/qingzhouyoga`
3. 构建配置（自动识别 `netlify.toml`）：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点 Deploy · 几十秒后得到 `xxx.netlify.app` 链接
5. （可选）绑定自定义域名 `qingzhouyogo.cn`

### Vercel

1. 打开 https://vercel.com/ 用 GitHub 登录
2. `Add New` → `Project` → 选 `xjf048/qingzhouyoga`
3. 配置（自动识别 `vercel.json`）：
   - Framework Preset: Vite
   - Build command: `npm run build`
   - Output: `dist`
4. 点 Deploy · 得到 `xxx.vercel.app` 链接
5. （可选）绑定自定义域名

### 自定义域名 `qingzhouyogo.cn`

在域名注册商（阿里云 / 腾讯云 / Cloudflare）添加 DNS：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | @ | `<your-site>.netlify.app` 或 `cname.vercel-dns.com` |
| CNAME | www | 同上 |

然后在 Netlify / Vercel 控制台 → Domain settings → 填入 `qingzhouyogo.cn`，自动签发免费 SSL。

## 目录结构

```
src/
├── pages/
│   ├── Home/        首页（Hero / 数据看板 / 馆主 / 6 特点 / 价目 / 充值 / 时间线）
│   ├── Affairs/     馆内事务（竖向时间线 · 17 条建馆日志 · 6 阶段）
│   ├── Operations/  经营数据（实时 KPI / 月度曲线 / 卡分布 / 会员清单）
│   ├── Model/       轻舟模式（PPT 案例 · 16 段）
│   └── Admin/       管理后台
├── components/
│   ├── layout/      Header / Footer / Sidebar
│   └── common/      Button / Card / Modal / Toast / Loading
├── mock/data.ts     全部 mock 数据（会员卡 / 月度营收 / 课程 / 价目等）
├── stores/          Zustand 状态
└── types/           TypeScript 类型
```

## 隐私

- 会员卡清单的手机号 / 昵称已脱敏
- 真实联系方式（手机 / 微信）未公开
- 上线前请 review `src/mock/data.ts` 中是否还有遗留敏感字段

## License

MIT — 仅供轻舟瑜伽普拉提馆使用