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
- 构建站点（当前默认设置 `VITE_BASE_PATH=/`，适配自定义域名）
- 发布到 GitHub Pages

部署成功后，访问：

`https://imxinzhang.com/`（当前仓库）

如果你复用本项目到其他仓库，可改成对应域名或 GitHub Pages 地址。

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
2. 生产环境/Actions 默认 `/`
3. 本地默认 `/`

如果你部署到自定义域名根路径（不是 `/<repo>/`），可在构建时改成：

```bash
VITE_BASE_PATH=/ npm run build
```

### 刷新子页面报 404
项目已使用 hash 路由（`#/photography`、`#/project/1`），在纯静态托管上可避免刷新 404。


## 自定义域名（imxinzhang.com）

如果你使用自定义域名（例如 `imxinzhang.com`），需要两部分都正确：

1. **构建 base 必须是根路径**：`VITE_BASE_PATH=/`（工作流已配置）
2. **DNS 记录必须正确**（以 Cloudflare/阿里云等 DNS 面板为例）：
   - `www` 使用 `CNAME` 指向 `imxinzhang-wq.github.io`
   - 根域名 `@` 使用以下 `A` 记录（GitHub Pages 官方 IP）：
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

仓库已添加 `client/public/CNAME`，内容为：

```
imxinzhang.com
```

部署后如果 Pages 仍显示 `DNS check unsuccessful`，请等待 DNS 生效（通常几分钟到 24 小时），然后在 Pages 设置页点击 **Check again**。
