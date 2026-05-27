# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-27

### Added

- **通用故事创意炼金系统 (Generic Story Alchemy)**
  - 从单一女频短剧升级为通用“故事/短剧/漫剧/电影创意炼金术”，支持男频受众下的视角平移映射。
  - 增设 `热血逆袭` 男频预设，补齐 `热血燃向`、`反转逆袭` 与 `逆风翻盘` 核心情绪标签及 `科幻脑洞` 题材。
- **无死角双语 (i18n) 动态翻译**
  - 支持所有 `input` 与 `textarea` 元素的 `placeholder` 属性动态翻译。
  - 切换语言时智能转换受众默认值 (`女频 25-35岁` / `Female 25-35`)。
- **高端毛玻璃视觉效果 (Premium UI/UX)**
  - 引入 `backdrop-filter: blur(12px)` Glassmorphism 磨砂透光质感。
  - 按钮与情绪标签增加 Hover 上浮与 Glow 发光过渡，重构历史记录为 CSS 类 `.history-card` 控制。
  - 优化 Prompt 输出框字体（14px）、白骨色 (`var(--tp)`) 与行高，缓解阅读疲劳。
- **数据同步与安全性**
  - 本地删除历史记录时，同步向 Supabase 发送请求进行云端清除，保障数据一致性。
  - 清空本地历史按钮增加二次确认弹窗，防误触。

### Changed

- **文档更新** — 重写并发布了 [HANDOFF.md](file:///Users/lushu/.gemini/antigravity/scratch/Short-Drama-Concept-Creator/HANDOFF.md) 和中英双语 [README.md](file:///Users/lushu/.gemini/antigravity/scratch/Short-Drama-Concept-Creator/README.md)。

### Fixed

- **i18n** — 修复了主页 slogan 描述微调后导致的翻译中英混杂 Bug。

---

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
