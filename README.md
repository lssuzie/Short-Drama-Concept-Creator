# 短剧创意炼金坊 — Short Drama Concept Creator

基于 2025H2-2026Q1 短剧市场爆款观察的结构化创意方法论引擎。

## English Summary

A structured short-drama ideation engine built on observed blockbuster patterns from H2 2025–Q1 2026. It helps精品 short-drama creators generate differentiated concepts through a 7-rule methodology, without writing scripts for you.

- **Live demo:** https://lssuzie.github.io/Short-Drama-Concept-Creator/
- **Full methodology (Chinese):** [methodology.md](methodology.md)
- **Target audience:** Female-oriented精品 short-drama creators (not mass-production MCNs)

Single-file HTML, zero dependencies, OpenAI-compatible API presets (MiMo / GPT-4o / DeepSeek). Anthropic Claude requires a proxy due to browser CORS restrictions.

---

## Key Terms

- **精品 (boutique/premium)** — Quality-focused creators vs. mass-production MCNs; emphasis on authorial voice and emotional density over volume
- **女频 (female-oriented)** — Content targeting women audiences, centered on romance, relationships, and emotional catharsis
- **短剧 (short-drama)** — Vertical short-form drama series (60–120 seconds per episode), popularized by platforms like Red Fruit (红果)
- **三要素融合 (triple-element fusion)** — The simultaneous weaving of CP (romantic tension), comedy, and period-specific (年代) signifiers within the same scene

---

## 这是什么 | What is This

一个 AI Skill，帮精品短剧创作者用结构化方法论激发创意。

**不是让 AI 替你写剧本，而是让 AI 成为你的创作 Soulmate。**

An AI Skill that helps boutique short-drama creators spark creativity through structured methodology.

It's not about AI writing your剧本 — it's about making AI your创作 Soulmate.

---

## 设计逻辑 | Design Logic

创作者面对空白页时，真正卡住的不是"写不出来"，而是"不知道自己想要什么"。

AI 辅助 coding 的前提是人知道自己要什么（spec 清楚），AI 帮你实现。但创意工作里，这个前提是不成立的——创作者脑子里有的是模糊的感觉、零散的灵感、说不清的直觉，不是一个可以写成 spec 的需求。

所以这个工具做的事情不是"你告诉我要什么，我帮你生成"，而是：先用市场规律约束出一个有质量的创意空间，在这个空间里生成几个具体的、可感知的概念。你在跟这些概念碰撞的过程中，才逐渐看清自己真正想要的方向。

方法论不是模板，而是**创作者跟 AI 共享的一套判断框架**。没有这套框架，AI 给你的是"大众平均"，而大众平均的创意就是没有创意。有了这套框架，AI 的输出才站在市场规律的肩膀上。

"个人化"发生在判断的那一刻：你选了什么、放弃了什么、为什么——这些判断在帮你自己厘清"我是谁、我要什么"。工具只是把这些判断沉淀下来，让下一次碰撞更精准。

When creators face a blank page, the real blocker is not "can't write" but "don't know what I want."

AI-assisted coding assumes the human knows what they want (clear spec) and AI executes. In creative work, that premise collapses — creators have vague feelings, scattered inspiration, ineffable intuition, not a spec-able requirement.

So this tool doesn't do "you tell me what you want, I generate it." Instead: it uses market patterns to constrain a high-quality creative space, generates several concrete, perceptible concepts within that space. Through collision with these concepts, you gradually clarify what you truly want.

The methodology is not a template — it's **a shared judgment framework between creator and AI**. Without it, AI gives you "population average" — and average creativity is no creativity. With it, AI's output stands on the shoulders of market patterns.

"Personalization" happens at the moment of judgment: what you choose, what you abandon, why — these judgments clarify "who I am, what I want." The tool just records these judgments so the next collision is more precise.

---

## 没有这个工具，你跟大模型直接聊会怎样？ | What Happens When You Chat with LLMs Directly?

三个问题：

1. **经验无法沉淀。** 每次对话都是从零开始。上一次你花了两小时跟 AI 碰撞出的判断、取舍、偏好——下一次对话，它全忘了。你积累的创作经验只存在于你的记忆里，AI 不知道。
2. **输出质量不可控。** 没有方法论约束，大模型的创意输出是随机的。偶尔撞上一个好概念，大部分时候是平庸模板。你没法稳定地得到 75 分以上的产出。
3. **换模型就翻车。** 你花半天调出来的提示词，换个模型效果完全不同。你的工作流被绑死在一个模型上。

这个工具解决的是：一套**稳定的、可沉淀的、跨模型的创意方法论**，不是一段提示词。

Three problems:

1. **Experience doesn't accumulate.** Every conversation starts from zero. The judgments, trade-offs, preferences you spent two hours colliding with AI last time — next conversation, it forgets all. Your creative experience lives only in your memory; AI doesn't know.
2. **Uncontrollable output quality.** Without methodology constraints, LLM output is random. Occasionally you hit a good concept; mostly it's mediocre template. You can't consistently get 75+ score outputs.
3. **Model switch breaks everything.** The prompt you spent half a day tuning works completely differently on another model. Your workflow is locked to one model.

This tool solves: a **stable, accumulative, cross-model creative methodology** — not a single prompt.

---

## 给谁用 | Who Is This For

- 想打造个性化精品的短剧创作者（不是日产几十部的 MCN）
- 有判断力但需要激发的策划人——你知道什么是好的，但面对空白页需要有人先扔几个 75 分的选项出来
- 有长视频经验正在迁移到短剧领域的创作者

- Boutique short-drama creators aiming for personalized quality (not daily-volume MCNs)
- Planners with judgment who need stimulation — you know what's good, but facing a blank page you need someone to throw out 3–4 options scoring 75+ first
- Creators migrating from long-form to short-drama with existing experience

---

## 为什么同时做页面和 Skill | Why Both Page and Skill?

Skill 的风险：你不知道 OpenClaw、Hermes 这些 Agent 平台到底打包了哪些系统提示词给大模型。它们的 harness 是针对 coding 设计的——工具描述、上下文注入、角色设定，都是围绕"写代码"优化的。对创作者来说，这些 coding 导向的系统提示词不是帮助，而是**污染**。你精心设计的创意方法论，被夹在一堆"你是一个编程助手"的上下文里，输出质量会打折扣。

所以这个项目有两个形态：

- **index.html（页面版）：** 直接调用 API，没有平台 harness 干扰，方法论直接跟模型对话。这是创意输出质量最可控的版本。
- **OpenClaw Skill：** 适合在 Agent 工作流中使用，方便但需要接受平台上下文可能带来的干扰。

两个版本共享同一套方法论。选择哪个取决于你更在意输出纯净度还是工作流集成。

Skill risk: You don't know what system prompts OpenClaw/Hermes agent platforms inject into the LLM. Their harness is coding-optimized — tool descriptions, context injection, role settings all center on "writing code." For creators, these coding-oriented system prompts aren't help — they're **contamination**. Your carefully designed creative methodology gets buried under "you are a coding assistant" context, degrading output quality.

So this project has two forms:

- **index.html (page version):** Direct API calls, no platform harness interference, methodology talks directly to the model. This is the most controllable version for creative output quality.
- **OpenClaw Skill:** Convenient for agent workflows but requires accepting potential interference from platform context.

Both share the same methodology. Choose based on whether you prioritize output purity or workflow integration.

---

## 怎么用 | How to Use

安装 Skill：

```bash
clawhub install short-drama-concept-creator
```

或从 GitHub 直接下载到你的 skills 目录。也可以直接打开 index.html，浏览器里用。

对 AI 说：

- "帮我生成一个豪门甜宠的短剧创意"
- "我要一个穿书题材的，25-35岁女频"
- "生成一个搞笑解压的家庭喜剧创意"

AI 会自动按方法论生成 3 个差异化概念，每个包含奇幻触发器、女主身份与行动、极端身份错位、喜剧引擎、女主三关检验、CP 磕点、每集结构等要素。

Install Skill:

```bash
clawhub install short-drama-concept-creator
```

Or download directly to your skills directory from GitHub. Or just open index.html in browser.

Tell AI:

- "Generate a豪门甜宠 short-drama concept"
- "I want a穿书题材, 25–35 female-oriented"
- "Generate a funny减压 family comedy concept"

AI auto-generates 3 differentiated concepts per methodology, each containing: fantasy trigger, heroine identity & action, extreme identity misplacement, comedy engine, heroine's three trials, CP sparks, per-episode structure, etc.

---

## 内置方法论 | Built-in Methodology

7 大规则体系：

| 规则 | 核心内容 |
|------|----------|
| 规则零 | 从幻想出发，不从问题出发（能力/身份/行动） |
| 喜剧公式 | 奇幻触发器 × 极端身份错位 × 家庭关系 × 喜剧 × 治愈 |
| 大女主原则 | 观众追的是女主不是 CP |
| 标题 5 铁律 | 情绪承诺 / 反差 / 动词 / 4字或长句 / 迭代高频词 |
| 概念 3 铁律 | 一句话=情绪过山车 / 她做了什么 / 兴奋不是沉重 |
| 女主三关 | 配得感 / 快意恩仇 / 主体性 |
| 常见错误 | 避免太实的职场戏 / 文艺片感 / vlog 感 |

方法论基于 2025H2-2026Q1 短剧市场爆款观察。短剧创作意识迭代很快，更早的经验不仅不适用，反而会污染提示词。

完整方法论详见 → [methodology.md](methodology.md) | [Full Methodology (English)](methodology.en.md)

7-rule system:

| Rule | Core |
|------|------|
| Rule 0 | Start from fantasy, not problem (ability/identity/action) |
| Comedy Formula | Fantasy trigger × Extreme identity misplacement × Family relations × Comedy × Healing |
| Strong Heroine Principle | Audience follows the heroine, not the CP |
| Title 5 Immutables | Emotional promise / Contrast / Verb / 4-character or long-form / Iterate buzzwords |
| Concept 3 Immutables | One line = emotional roller coaster / What she did / Excitement not heaviness |
| Heroine's Three Trials | Worthiness / Vengeful satisfaction / Agency |
| Common Pitfalls | Avoid literal workplace drama / Arthouse feel / Vlog vibes |

Methodology based on H2 2025–Q1 2026 short-drama blockbuster observations. Creative conventions evolve fast — outdated experience not only doesn't apply, it pollutes prompts.

Full methodology → [methodology.md](methodology.md)

---

## 文件结构 | File Structure

```
├── index.html              # 工具主文件（零依赖，浏览器直接打开）
├── methodology.md          # 创意方法论（可独立阅读）
├── LICENSE                 # 代码许可证：MIT
├── LICENSE-METHODOLOGY     # 方法论许可证：CC BY-NC-SA 4.0
└── README.md               # 本文件
```

```
├── index.html              # Main tool (zero deps, open in browser)
├── methodology.md          # Creative methodology (standalone read)
├── LICENSE                 # Code license: MIT
├── LICENSE-METHODOLOGY     # Methodology license: CC BY-NC-SA 4.0
└── README.md               # This file
```

---

## 许可证 | License

- **代码**（index.html）：MIT License — 随便用
- **方法论**（methodology.md）：CC BY-NC-SA 4.0
  - ✅ 可以学习、分享、改进
  - ❌ 不能商用（卖课、卖工具、做竞品）
  - 📝 必须署名

- **Code** (index.html): MIT License — use freely
- **Methodology** (methodology.md): CC BY-NC-SA 4.0
  - ✅ Can study, share, improve
  - ❌ No commercial use (courses, tools, competing products)
  - 📝 Attribution required

---

## 部署注意事项（Caveats）| Deployment Notes

### Anthropic CORS

直接从 `*.github.io` 域名访问 `api.anthropic.com` 会因浏览器 CORS 策略失败——Anthropic 不向浏览器端发送跨域头。设置面板中的 Claude 预设在非浏览器环境可用，但在已部署的 Pages 站点中无效。需要使用 Claude 的用户请自行搭建代理或改用 OpenAI 兼容的提供商。

### Ollama 公网访问

Ollama 默认拒绝跨域请求。若要让 Pages 站点能够访问本地运行的 Ollama，启动时需加上环境变量：

```bash
OLLAMA_ORIGINS="https://*.github.io" ollama serve
# 或者使用通配符放宽限制
OLLAMA_ORIGINS="*" ollama serve
```

### LM Studio

在 LM Studio 的服务器设置中手动启用 CORS。

---

### Anthropic CORS

Direct calls to `api.anthropic.com` from a `*.github.io` origin fail browser CORS — Anthropic does not send cross-origin headers. The Claude preset in settings works in non-browser contexts but not on deployed Pages. Users needing Claude must use a proxy or switch to OpenAI-compatible providers.

### Ollama Public Access

Ollama rejects cross-origin requests by default. To allow the Pages site to talk to locally-running Ollama, start it with:

```bash
OLLAMA_ORIGINS="https://*.github.io" ollama serve
# or use wildcard for permissive
OLLAMA_ORIGINS="*" ollama serve
```

### LM Studio

Enable CORS manually in LM Studio's server settings.

---

## 技术栈 | Tech Stack

- 前端：纯 HTML/CSS/JS，零依赖，单文件
- AI 框架：OpenClaw
- 推荐模型：MiMo v2.5 Pro / Claude / GPT — 兼容任意大模型
- 数据存储：浏览器 localStorage（数据不离开你的设备）

- Frontend: Pure HTML/CSS/JS, zero dependencies, single-file
- AI Framework: OpenClaw
- Recommended models: MiMo v2.5 Pro / Claude / GPT — compatible with any LLM
- Data storage: browser localStorage (data never leaves your device)

---

## 贡献者 / 团队 | Contributors / Team

- [@lssuzie](https://github.com/lssuzie) — 项目创建者、方法论设计、初始实现
- [@haixuanTao](https://github.com/haixuanTao) — 代码重构贡献

- [@lssuzie](https://github.com/lssuzie) — Project creator, methodology design, initial implementation
- [@haixuanTao](https://github.com/haixuanTao) — Code refactoring contribution

---

## 相关链接 | Related Links

- GitHub 仓库：https://github.com/lssuzie/Short-Drama-Concept-Creator
- 完整方法论：https://github.com/lssuzie/Short-Drama-Concept-Creator/blob/main/methodology.md
- 在线工具：https://lssuzie.github.io/Short-Drama-Concept-Creator/
- 本地使用：下载 `index.html` 浏览器直接打开

- GitHub Repo: https://github.com/lssuzie/Short-Drama-Concept-Creator
- Full methodology: https://github.com/lssuzie/Short-Drama-Concept-Creator/blob/main/methodology.md
- Live tool: https://lssuzie.github.io/Short-Drama-Concept-Creator/
- Local use: Download `index.html` and open in browser
