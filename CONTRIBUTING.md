# 贡献指南

欢迎贡献代码、提出建议或报告问题。

## 代码贡献

### 开发环境
源文件分为三部分，位于 `src/` 目录：

- `src/index.html` — 页面结构
- `src/style.css` — 样式
- `src/app.js` — 业务逻辑

修改完后运行 `node build.mjs` 重新生成根目录的 `index.html`（单文件构建产物，GitHub Pages 与"下载即用"场景使用此文件）。提交 PR 时请同时提交 `src/` 与重新生成的 `index.html`。

直接编辑根目录的 `index.html` 不会被采纳——下次构建会被覆盖。

### 提交 PR
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 重要原则
- **方法论保护**：`methodology.md` 采用 CC BY-NC-SA 4.0 许可证，禁止商业使用。衍生作品需遵循相同协议。
- **单文件哲学**：根目录的 `index.html` 必须保持单文件零依赖（不引入外部 JS/CSS 库），这样用户下载一个文件即可使用。`src/` 是开发期的拆分，`build.mjs` 会把它重新内联回单文件。
- **隐私优先**：所有用户数据（画像、历史）均存储在浏览器本地，不涉及任何后端服务。

## 行为准则
尊重原创，保持开放。所有讨论请基于技术和创作本身。

## 许可证
- 代码（index.html）：MIT License
- 方法论（methodology.md）：CC BY-NC-SA 4.0（署名-非商业性使用-相同方式共享）
