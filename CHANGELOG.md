# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-29

### Added

- **OpenClaw Skill** (`SKILL.md`, `skill.json`)
  - 完整的触发条件区分（激活 vs 不激活示例）
  - 快速选择菜单（5种题材方向）
  - 10项质检表格（逐条 ✅/⚠️/❌ 检查）
  - YAML frontmatter 规范元数据
  - JSON Schema 完整定义（triggers / parameters / outputs / definitions）

- **GitHub 社区配置**
  - `.github/ISSUE_TEMPLATE/bug-report.yml` — 结构化 bug 报告模板
  - `.github/SECURITY.md` — 安全漏洞报告流程
  - `.github/pull_request_template.md` — PR 模板
  - `CONTRIBUTING.md` — 贡献指南（方法论保护 / 单文件哲学 / 隐私优先原则）

- **许可证分离**
  - `LICENSE` — index.html 代码：MIT License
  - `LICENSE-METHODOLOGY` — methodology.md 方法论：CC BY-NC-SA 4.0

- **`skill.json` 增强**
  - `triggers.patterns` — 11个激活关键词（含英文 `drama concept`）
  - `triggers.exclude` — 4类反例排除规则
  - `parameters` — 完整参数 schema，含默认值和选项枚举
  - `outputs` — 概念列表和质检结果结构
  - `definitions.Concept` — 14个字段的完整类型定义
  - `definitions.QAChecklist` — 10项质检枚举结构

- **README 增强**
  - 完整设计理念阐述（空白页焦虑 / 方法论作为共享判断框架 / 个人化发生在判断那一刻）
  - index.html vs Skill 两个版本的对比说明
  - 为什么要用方法论而非直接 prompt engineering 的解释
  - 文件结构图示

### Changed

- **README** — 完全重写，合并设计逻辑与使用说明，移除旧版简单描述
- **assets/ 截图** — 替换为压缩优化版本
- **`skill.json`** — 从简单元数据升级为完整 JSON Schema

### Fixed

- **安全** — API Key 存储从 localStorage 迁移至 sessionStorage（关闭标签页后自动清除）

---

## [0.1.0] - 2026-04-25

### Added

- **`methodology.md`** — 完整的短剧创意方法论文档
  - 规则零：从幻想出发，不从问题出发（三种幻想来源 + 调性检验）
  - 喜剧公式（5要素框架）
  - 大女主原则
  - 规则一～七（主引擎 / 女主三关 / 标题5铁律 / 概念3铁律 / CP磕点 / 搞钱线 / 常见错误）
  - 生成流程（前置筛选 → 喜剧公式验证 → 生成 → 质检）
  - 10项质检清单

- **`index.html`** — 零依赖单文件版工具
  - 浏览器直接打开即可使用
  - 支持配置 API Key（存储于 sessionStorage）
  - 覆盖参数面板 + Prompt 预览 + 结果展示

- **LICENSE** — MIT License

- **README.md** — 基础使用说明

### Security

- API Key 初始版本存储于 localStorage（后续版本已迁移至 sessionStorage）
