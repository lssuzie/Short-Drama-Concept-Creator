# 交接：Supabase 集成 + 流水线重设计

## 已完成

### Supabase 云端同步
- 登录弹窗（邮箱/GitHub OAuth），保存时才弹出
- `saveHist()` 只存参数+结果，不存提示词
- `clearHist()` 只清本地，不动云端
- 云端是永久备份，本地是工作流缓存（最多10条）
- 刷新页面不从云端加载历史
- 设置面板有「导出云端数据」按钮（下载 JSON）
- 测试按钮可验证连接（读取+插入+清理）

### 流水线重设计
- 三步流程：`① 生成 Prompt → ② 粘贴结果 → ③ 一键「📚 入库」`
- 粘贴区只保留一个「📚 入库」主按钮（移除保存到云端/质检/反馈三个独立按钮）
- `archiveResult()` 一条龙：质检 → 反馈卡 → 保存到创意库
- `genAI()` 不再自动存 prompt 到历史，用户粘贴 LLM 输出后手动入库
- 创意库卡片显示：概念标题 + 结果摘要（前80字）+ 标签 + 日期 + × 逐条删除
- `deleteHist(i)` 支持逐条删除（需确认）
- i18n 新增：入库/已入库/请完成反馈/确定删除这条记录 等

### 关键文件
- `src/app.js` — 主逻辑，Supabase 配置在顶部（SB_URL, SB_KEY）
- `src/index.html` — HTML 结构
- `src/style.css` — 样式
- `build.mjs` — 构建脚本，`node build.mjs` 输出根目录 `index.html`

### Supabase 信息
- URL: `https://lvmfjedrkspbbbbdsxgr.supabase.co`
- 表：`profiles`, `history`
- RLS 已启用，用户只能读写自己的数据

## 未做
- 创意库「清空」按钮可能需要确认弹窗（目前直接清空）
- 历史记录同步到 Supabase 的 `deleteHist`（目前只删本地）
- 无头浏览器测试验证

## 交接要点
- 入库流程需要登录（未登录会弹登录框）
- `requireLogin(callback)` 模式：登录后自动执行回调
- 质检逻辑在 `parseAndCheck()` → `checkOneConcept()` 中，基于关键词匹配
- 反馈系统支持快速点选（`fbMode='quick'`）和文本模式（`fbMode='pro'`）
