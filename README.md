# Portfolio-Redesign 部署到 GitHub Pages

这个项目已经改成可直接发布为静态站点（Vite 构建产物在 `dist/public`）。

## 一键自动部署（推荐）

### 1) 推送到 GitHub 仓库
确保仓库代码在 GitHub 上，默认分支为 `main`。

### 2) 开启 GitHub Pages
1. 打开仓库 `Settings` → `Pages`
2. 在 `Build and deployment` 中选择 **Source = GitHub Actions**

### 3) 触发部署
仓库里已经包含工作流：`.github/workflows/deploy-pages.yml`。
只要向 `main` 分支 push，Actions 会自动：
- 安装依赖
- 构建站点（自动设置 `VITE_BASE_PATH=/<repo-name>/`）
- 发布到 GitHub Pages

部署成功后，访问：

`https://<你的用户名>.github.io/<你的仓库名>/`

---

## 本地预览（和线上一致）

```bash
npm ci
npm run build
npm run start
```

默认在 `http://localhost:5000` 预览静态内容。

---

## 常见问题

### 页面空白或资源 404
通常是 `base` 路径不对。当前配置会按以下优先级自动处理：
1. `VITE_BASE_PATH`（最高优先级）
2. GitHub Actions 中根据仓库名生成 `/<repo>/`
3. 本地默认 `/`

如果你部署到自定义域名根路径（不是 `/<repo>/`），可在构建时改成：

```bash
VITE_BASE_PATH=/ npm run build
```

### 刷新子页面报 404
项目已使用 hash 路由（`#/photography`、`#/project/1`），在纯静态托管上可避免刷新 404。
