# 🎬 故事创意炼金坊 — Story Concept Creator (Story Alchemy)

[![GitHub stars](https://img.shields.io/github/stars/lssuzie/Short-Drama-Concept-Creator.svg?style=flat-square)](https://github.com/lssuzie/Short-Drama-Concept-Creator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/lssuzie/Short-Drama-Concept-Creator.svg?style=flat-square)](https://github.com/lssuzie/Short-Drama-Concept-Creator/network)

[简体中文](#-故事创意炼金坊) | [English Guide](#-story-concept-creator)

---

## 🇨🇳 故事创意炼金坊

基于爆款数据与核心戏剧逻辑的故事创意方法论引擎。帮助精品故事、短剧、漫剧与电影创作者在人机协同中打磨出差异化的创意概念。

* **在线体验**：https://lssuzie.github.io/Short-Drama-Concept-Creator/
* **完整方法论**：[methodology.md](methodology.md)

### 💡 为什么做这个项目？

现在的创作环境，充斥着流水线复制与 AI 一键生成的庸俗套路。无论是短剧、漫剧（Webtoon），还是院线电影，很多人误以为好故事只是一堆爽点与情节模板的快餐堆砌。

但我们相信，**好故事不等于粗制滥造。一个真正能打动人心的创意概念，依然需要创作者耗费心血去雕琢、去推敲、去拷问。**

本项目拒绝成为那种“输入一句话，吐出万字平庸剧本”的复制机。它的初衷，是为精品故事创作者提供一块**结构化的创意磨刀石**。它将前沿的爆款规律与类型叙事逻辑熔炼成 7 大核心规则，在人机碰撞的过程中，逼你去推翻第一反应的平庸套路，一起探索你的独特创作偏好和长板。

创意无法一键生成，它只会在反复的磨砺中，显现出金子般的底色。

> 「别让 AI 替你写，让它陪你碰撞出灵感的那一瞬。」

### 📋 这是什么

一个 AI Skill，帮精品故事创作者用结构化方法论激发创意。
**不是让 AI 替你写剧本，而是让 AI 成为你的创意碰撞伙伴（Soulmate）。**

### 🧠 设计逻辑

创作者面对空白页时，真正卡住的不是"写不出来"，而是"不知道自己想要什么"。

AI 辅助 coding 的前提是人知道自己要什么（spec 清楚），AI 帮你实现。但创意工作里，这个前提是不成立的——创作者脑子里有的是模糊的感觉、零散的灵感、说不清的直觉，不是一个可以写成 spec 的需求。

所以这个工具做的事情不是"你告诉我要什么，我帮你生成"，而是：先用市场规律约束出一个有质量的创意空间，在这个空间里生成几个具体的、可感知的概念。你在跟这些概念碰撞的过程中，才逐渐看清自己真正想要的方向。

方法论不是模板，而是**创作者跟 AI 共享的一套判断框架**。没有这套框架，AI 给你的是"大众平均"，而大众平均的创意就是没有创意。有了这套框架，AI 的输出才站在戏剧规律的肩膀上。

"个人化"发生在判断的那一刻：你选了什么、放弃了什么、为什么——这些判断在帮你自己厘清"我是谁、我要什么"。工具只是把这些判断沉淀下来，让下一次碰撞更精准。

### ❌ 没有这个工具，你直接和 AI 聊会怎样？

1. **经验无法沉淀**：每次对话都是从零开始。上一次你花了两小时跟 AI 碰撞出的判断、取舍、偏好——下一次对话，它全忘了。你积累的创作经验只存在于你的记忆里，AI 不知道。
2. **输出质量不可控**：没有方法论约束，大模型的创意输出是随机的。偶尔撞上一个好概念，大部分时候是平庸模板。你没法稳定地得到 75 分以上的产出。
3. **换模型就翻车**：你花半天调出来的提示词，换个模型效果完全不同。你的工作流被绑死在一个模型上。

本工具提供的是一套**稳定的、可沉淀的、跨模型的创意方法论**，而不是一段简单的提示词。

### 👥 适用受众

* 想打造个性化精品的短剧、漫剧与电影创作者（拒绝低级流水线堆砌）
* 有判断力但需要激发的策划人——你知道什么是好的，但面对空白页需要有人先扔几个 75 分的选项出来
* 正在寻找突破口和人机协同创作流的叙事策划

### 💻 为什么同时做页面和 Skill？

* **index.html（页面版）**：直接在浏览器调用 API，没有平台 Harness 干扰，方法论直接跟模型对话。这是创意输出质量最可控的版本。
* **OpenClaw Skill**：适合在 Agent 工作流（如 OpenClaw、Hermes）中直接使用，更方便，但需要接受平台系统上下文可能带来的干扰。

### 🚀 怎么使用

在 Agent 项目工作区终端直接运行：
```bash
clawhub install short-drama-concept-creator
```
或直接双击本地打开 `index.html` 在浏览器中使用。

**对 AI 提问示例：**
* *"帮我生成一个豪门甜宠的故事创意"*
* *"我要一个穿书题材的，25-35岁都市受众"*
* *"生成一个搞笑解压的家庭喜剧创意"*

### ⚙️ 内置方法论（7大规则体系）

| 规则 | 核心内容 |
|------|----------|
| 规则零 | 从幻想出发，不从问题出发（能力/身份/行动） |
| 喜剧公式 | 奇幻触发器 × 极端身份错位 × 家庭关系 × 喜剧 × 治愈 |
| 大女主原则 | 默认以女频精品大女主为核心（若用于男频，可等价映射为男主的主体性与尊严考核） |
| 标题 5 铁律 | 情绪承诺 / 反差 / 动词 / 4字或长句 / 迭代高频词 |
| 概念 3 铁律 | 一句话=情绪过山车 / 做了什么 / 兴奋不是沉重 |
| 女主三关 | 配得感 / 快意恩仇 / 主体性 |
| 常见错误 | 避免太实的职场戏 / 文艺片感 / vlog 感 |

---

## 🇺🇸 Story Concept Creator

A structured story ideation engine built on observed blockbuster patterns and dramatic mechanics. It helps boutique story, short-drama, webtoon, and film creators generate differentiated concepts through a 7-rule methodology, without writing scripts for you.

* **Live Demo**: https://lssuzie.github.io/Short-Drama-Concept-Creator/
* **Full Methodology**: [methodology.en.md](methodology.en.md)

### 💡 Why this project?

Today's storytelling environment is saturated with assembly-line clichés and one-click AI generators. Whether it is a vertical short drama, a webtoon/manga, or a feature film, many believe that stories are just piles of tropes and plot templates.

But we believe **good stories do not equal low quality. A truly captivating story concept demands that creators spend blood, sweat, and tears to sculpt, debate, and refine the core premise.**

This is a **"Story Concept Creator (Story Alchemy)"**. It refuses to be a generator of mediocre scripts. Instead, it serves as a **structured creative whetstone** for narrative creators (short dramas, webtoons, films, etc.) facing a blank page.

The core mechanics of drama are universal: fantasy triggers, extreme misplacement of identity, character agency, and authentic emotional tension. Whether you are prepping a female-oriented short-form series, a webtoon outline, or a feature film's story idea, this tool forces you to push past your first mediocre instinct, exploring your unique creative preferences and strengths together.

A great story cannot be generated with one click; it only shines like gold through relentless refining.

> "Don't let AI write for you. Let it sparks the magic moment with you."

### 📋 What is This

An AI Skill that helps boutique story creators spark creativity through structured methodology.
**It's not about AI writing your script — it's about making AI your creative Soulmate.**

### 🧠 Design Logic

When creators face a blank page, the real blocker is not "can't write" but "don't know what I want."

AI-assisted coding assumes the human knows what they want (clear spec) and AI executes. In creative work, that premise collapses — creators have vague feelings, scattered inspiration, ineffable intuition, not a spec-able requirement.

So this tool doesn't do "you tell me what you want, I generate it." Instead: it uses market patterns to constrain a high-quality creative space, generates several concrete, perceptible concepts within that space. Through collision with these concepts, you gradually clarify what you truly want.

The methodology is not a template — it's **a shared judgment framework between creator and AI**. Without it, AI gives you "population average" — and average creativity is no creativity. With it, AI's output stands on the shoulders of dramatic mechanics.

"Personalization" happens at the moment of judgment: what you choose, what you abandon, why — these judgments clarify "who I am, what I want." The tool just records these judgments so the next collision is more precise.

### ❌ What Happens When You Chat with LLMs Directly?

1. **Experience doesn't accumulate**: Every conversation starts from zero. The judgments, trade-offs, preferences you spent two hours colliding with AI last time — next conversation, it forgets all.
2. **Uncontrollable output quality**: Without methodology constraints, LLM output is random. Occasionally you hit a good concept; mostly it's mediocre template. You can't consistently get 75+ score outputs.
3. **Model switch breaks everything**: The prompt you spent half a day tuning works completely differently on another model. Your workflow is locked to one model.

This tool solves: a **stable, accumulative, cross-model creative methodology** — not a single prompt.

### 👥 Who Is This For

* Boutique story, short-drama, webtoon, and film creators aiming for personalized quality (not daily-volume MCNs)
* Planners with judgment who need stimulation — you know what's good, but facing a blank page you need someone to throw out 3–4 options scoring 75+ first
* Narrative planners looking for breakthroughs in human-AI collaborative workflows

### 💻 Why Both Page and Skill?

* **index.html (Page version)**: Direct API calls in the browser, no platform harness interference, methodology talks directly to the model. This is the most controllable version for creative output quality.
* **OpenClaw Skill**: Convenient for agent workflows (like OpenClaw or Hermes) but requires accepting potential interference from platform context.

### 🚀 How to Use

Install via CLI:
```bash
clawhub install short-drama-concept-creator
```
Or download directly to your skills directory from GitHub. Or just open `index.html` locally.

**Prompting Examples:**
* *"Generate a sweet romance story concept"*
* *"I want a book-transmigration theme, for 25-35 urban audience"*
* *"Generate a funny family comedy story concept"*

### ⚙️ Built-in Methodology (7-Rule System)

| Rule | Core |
|------|------|
| Rule 0 | Start from fantasy, not problem (ability/identity/action) |
| Comedy Formula | Fantasy trigger × Extreme identity misplacement × Family relations × Comedy × Healing |
| Heroine Principle | Focuses on premium female-oriented heroine by default (maps to male protagonist's agency if target audience is male-oriented) |
| Title 5 Immutables | Emotional promise / Contrast / Verb / 4-character or long-form / Iterate buzzwords |
| Concept 3 Immutables | One line = emotional roller coaster / What they did / Excitement not heaviness |
| Heroine's Three Trials | Worthiness / Vengeful satisfaction / Agency |
| Common Pitfalls | Avoid literal workplace drama / Arthouse feel / Vlog vibes |

---

## 🛠️ 公共说明与技术栈 / General Info

### 📂 文件结构 | File Structure
```
├── index.html              # Tool file (zero deps, open in browser)
├── methodology.md          # Creative methodology (Chinese)
├── methodology.en.md       # Creative methodology (English)
├── LICENSE                 # Code license: MIT
├── LICENSE-METHODOLOGY     # Methodology license: CC BY-NC-SA 4.0
└── README.md               # This file
```

### 许可证 | License
* **Code** (index.html): MIT License — use freely
* **Methodology** (methodology.md): CC BY-NC-SA 4.0 (Attribution-NonCommercial-ShareAlike)

### 🧑‍💻 贡献者 / Contributors

- [@lssuzie](https://github.com/lssuzie) — Creator, Methodology & Initial Implementation
- [@haixuanTao](https://github.com/haixuanTao) — Code Refactoring Contribution

### 统计面板 / GitHub Readme Stats

<p align="left">
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img height="180" src="https://github-readme-stats.vercel.app/api?username=lssuzie&show_icons=true&theme=radial" alt="lssuzie's GitHub stats" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img height="180" src="https://github-readme-stats.vercel.app/api/top-langs/?username=lssuzie&layout=compact&theme=radial" alt="Top Langs" />
  </a>
</p>
