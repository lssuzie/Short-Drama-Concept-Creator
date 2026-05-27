# 🎬 故事创意炼金坊 — Story Concept Creator (Story Alchemy)

[![GitHub stars](https://img.shields.io/github/stars/lssuzie/Short-Drama-Concept-Creator.svg?style=flat-square)](https://github.com/lssuzie/Short-Drama-Concept-Creator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/lssuzie/Short-Drama-Concept-Creator.svg?style=flat-square)](https://github.com/lssuzie/Short-Drama-Concept-Creator/network)

基于爆款数据与核心戏剧逻辑的故事创意方法论引擎。

[中文说明](#-💡-为什么做这个项目) | [English Guide](#-💡-why-this-project)

---

## 🇨🇳 💡 为什么做这个项目？

现在的创作环境，充斥着流水线复制与 AI 一键生成的庸俗套路。无论是短剧、漫剧（Webtoon），还是院线电影，很多人误以为好故事只是一堆爽点与情节模板的快餐堆砌。

但我们相信，**好故事不等于粗制滥造。一个真正能打动人心的创意概念，依然需要创作者耗费心血去雕琢、去推敲、去拷问。**

本项目拒绝成为那种“输入一句话，吐出万字平庸剧本”的复制机。它的初衷，是为精品故事创作者提供一块**结构化的创意磨刀石**。它将前沿的爆款规律与类型叙事逻辑熔炼成 7 大核心规则，在人机碰撞的过程中，逼你去推翻第一反应的平庸套路，反复拷问大女主的主体性、极端身份的错位冲突，以及情感的真实张力。

创意无法一键生成，它只会在反复的磨砺中，显现出金子般的底色。

> 「别让 AI 替你写，让它陪你碰撞出灵感的那一瞬。」

---

## 🇺🇸 💡 Why this project?

Today's storytelling environment is saturated with assembly-line clichés and one-click AI generators. Whether it is a vertical short drama, a webtoon/manga, or a feature film, many believe that stories are just piles of tropes and plot templates.

But we believe **good stories do not equal low quality. A truly captivating story concept demands that creators spend blood, sweat, and tears to sculpt, debate, and refine the core premise.**

This is a **"Story Concept Creator (Story Alchemy)"**. It refuses to be a generator of mediocre scripts. Instead, it serves as a **structured creative whetstone** for narrative creators (short dramas, webtoons, films, etc.) facing a blank page.

The core mechanics of drama are universal: fantasy triggers, extreme misplacement of identity, character agency, and authentic emotional tension. Whether you are prepping a female-oriented short-form series, a webtoon outline, or a feature film's story idea, this tool forces you to push past your first mediocre instinct and polish the sharpest edge of your story.

A great story cannot be generated with one click; it only shines like gold through relentless refining.

> "Don't let AI write for you. Let it sparks the magic moment with you."

---

## English Summary

A structured story ideation engine built on observed blockbuster patterns and dramatic mechanics. It helps boutique story, short-drama, webtoon, and film creators generate differentiated concepts through a 7-rule methodology, without writing scripts for you.

- **Live demo:** https://lssuzie.github.io/Short-Drama-Concept-Creator/
- **Full methodology (Chinese):** [methodology.md](methodology.md)
- **Target audience:** Creators of premium short dramas, webtoons, and films (not mass-production MCNs)

Single-file HTML, zero dependencies, OpenAI-compatible API presets (MiMo / GPT-4o / DeepSeek). Anthropic Claude requires a proxy due to browser CORS restrictions.

---

## Key Terms

- **精品 (boutique/premium)** — Quality-focused creators vs. mass-production copycats; emphasis on authorial voice and emotional density
- **短剧/漫剧/电影 (Short-drama / Webtoon / Film)** — Various visual narrative formats that rely on tight setups, high-contrast character arcs, and quick hook delivery
- **大女主原则 (Strong Heroine Principle)** — A female-centric narrative core emphasizing romantic autonomy, personal growth, and self-worth
- **三要素融合 (triple-element fusion)** — The simultaneous weaving of CP (romantic tension), comedy, and period-specific (年代) signifiers within the same scene

---

## 这是什么 | What is This

一个 AI Skill，帮精品故事创作者用结构化方法论激发创意。

**不是让 AI 替你写剧本，而是让 AI 成为你的创作 Soulmate。**

An AI Skill that helps boutique story creators spark creativity through structured methodology.

It's not about AI writing your script — it's about making AI your creative Soulmate.

---

## 设计逻辑 | Design Logic

创作者面对空白页时，真正卡住的不是"写不出来"，而是"不知道自己想要什么"。

AI 辅助 coding 的前提是人知道自己要什么（spec 清楚），AI 帮你实现。但创意工作里，这个前提是不成立的——创作者脑子里有的是模糊的感觉、零散的灵感、说不清的直觉，不是一个可以写成 spec 的需求。

所以这个工具做的事情不是"你告诉我要什么，我帮你生成"，而是：先用市场规律约束出一个有质量的创意空间，在这个空间里生成几个具体的、可感知的概念。你在跟这些概念碰撞的过程中，才逐渐看清自己真正想要的方向。

方法论不是模板，而是**创作者跟 AI 共享的一套判断框架**。没有这套框架，AI 给你的是"大众平均"，而大众平均的创意就是没有创意。有了这套框架，AI 的输出才站在戏剧规律的肩膀上。

"个人化"发生在判断的那一刻：你选了什么、放弃了什么、为什么——这些判断在帮你自己厘清"我是谁、我要什么"。工具只是把这些判断沉淀下来，让下一次碰撞更精准。

---

## 给谁用 | Who Is This For

- 想打造个性化精品的短剧、漫剧与电影创作者
- 有判断力但需要激发的策划人——你知道什么是好的，但面对空白页需要有人先扔几个 75 分的选项出来
- 正在寻找突破口和人机协同创作流的叙事策划

---

## 怎么用 | How to Use

安装 Skill：

```bash
clawhub install short-drama-concept-creator
```

或从 GitHub 直接下载到你的 skills 目录。也可以直接打开 index.html，浏览器里用。

对 AI 说：

- "帮我生成一个豪门甜宠的故事创意"
- "我要一个穿书题材的，25-35岁都市受众"
- "生成一个搞笑解压的家庭喜剧创意"

AI 会自动按方法论生成 3 个差异化概念。

---

## 内置方法论 | Built-in Methodology

7 大规则体系：

| 规则 | 核心内容 |
|------|----------|
| 规则零 | 从幻想出发，不从问题出发（能力/身份/行动） |
| 喜剧公式 | 奇幻触发器 × 极端身份错位 × 家庭关系 × 喜剧 × 治愈 |
| 大女主原则 | 默认以女频精品大女主为核心（若用于男频，可等价映射为男主的主体性与尊严考核） |
| 标题 5 铁律 | 情绪承诺 / 反差 / 动词 / 4字或长句 / 迭代高频词 |
| 概念 3 铁律 | 一句话=情绪过山车 / 做了什么 / 兴奋不是沉重 |
| 女主三关 | 配得感 / 快意恩仇 / 主体性 |
| 常见错误 | 避免太实的职场戏 / 文艺片感 / vlog 感 |

完整方法论详见 → [methodology.md](methodology.md) | [Full Methodology (English)](methodology.en.md)

---

## 文件结构 | File Structure

```
├── index.html              # 工具主文件（零依赖，浏览器直接打开）
├── methodology.md          # 创意方法论（中文）
├── methodology.en.md       # 创意方法论（英文）
├── LICENSE                 # 代码许可证：MIT
├── LICENSE-METHODOLOGY     # 方法论许可证：CC BY-NC-SA 4.0
└── README.md               # 本文件
```

---

## 许可证 | License

- **代码**（index.html）：MIT License — 随便用
- **方法论**（methodology.md）：CC BY-NC-SA 4.0
  - ✅ 可以学习、分享、改进
  - ❌ 不能商用（卖课、卖工具、做竞品）
  - 📝 必须署名

---

## 技术栈 | Tech Stack

- 前端：纯 HTML/CSS/JS，零依赖，单文件
- 推荐模型：MiMo v2.5 Pro / Claude / GPT — 兼容任意大模型
- 数据存储：浏览器 localStorage（数据不离开你的设备）

---

## 贡献者 / Contributors

- [@lssuzie](https://github.com/lssuzie) — 项目创建者、方法论设计、初始实现
- [@haixuanTao](https://github.com/haixuanTao) — 代码重构贡献

### 统计面板 / GitHub Readme Stats

<p align="left">
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img height="180" src="https://github-readme-stats.vercel.app/api?username=lssuzie&show_icons=true&theme=radial" alt="lssuzie's GitHub stats" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img height="180" src="https://github-readme-stats.vercel.app/api/top-langs/?username=lssuzie&layout=compact&theme=radial" alt="Top Langs" />
  </a>
</p>

---

## 相关链接 | Related Links

- GitHub 仓库：https://github.com/lssuzie/Short-Drama-Concept-Creator
- 完整方法论：https://github.com/lssuzie/Short-Drama-Concept-Creator/blob/main/methodology.md
- 在线工具：https://lssuzie.github.io/Short-Drama-Concept-Creator/
- 本地使用：下载 `index.html` 浏览器直接打开
