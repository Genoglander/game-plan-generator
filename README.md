# 游戏企划生成器 / Game Plan Generator

> 输入一句游戏点子，AI 自动生成完整企划书、任务清单与开发计划。  
> Enter a game idea, and AI instantly generates a full design doc, task list & dev plan.  
> ゲームのアイデアを入力するだけで、AI が企画書・タスク一覧・開発計画を自動生成します。

---

## ✨ 功能 / Features / 機能

| 中文 | English | 日本語 |
|------|---------|--------|
| AI 生成完整游戏企划书 | AI-generated full game design doc | AI による完全なゲーム企画書生成 |
| 任务清单（优先级 + 预估工时）| Task list with priority & hour estimates | 優先度と工数付きタスクリスト |
| 技术难点分析与解决方案 | Technical challenge analysis & solutions | 技術的課題の分析と解決策 |
| 七天开发计划 | 7-day development plan | 7日間の開発計画 |
| 中 / 日 / EN 界面与内容语言切换 | Switch UI & AI output language: ZH / JA / EN | UI・AI出力言語の切り替え（中/日/英）|
| 导出 Markdown / PNG | Export as Markdown or PNG | Markdown・PNG エクスポート |

---

## 🚀 快速开始 / Quick Start / クイックスタート

**需要 / Required:** 
```
Node.js 18+
pnpm 8+
OpenAI API Key
```

### 1. 克隆并安装 / Clone & Install

```bash
git clone https://github.com/Genoglander/game-plan-generator.git
```
```
pnpm install
```

### 2. 配置 API Key / Set up API Key

在项目根目录新建 `.env` 文件，填入你的 OpenAI Key：

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 启动 / Start

在终端运行 / Run in terminal:

```bash
pnpm run dev
```

浏览器打开 → **http://localhost:5173**

---

## 🛠 技术栈 / Tech Stack / 技術スタック

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Express + TypeScript
- **AI:** OpenAI GPT-4.1-mini
- **Package Manager:** pnpm (monorepo) + Orval codegen
- **Export:** html-to-image (PNG), Markdown

---

## 📁 项目结构 / Project Structure

```
├── artifacts/
│   ├── api-server/        # Express API server
│   └── game-planner/      # React frontend
├── lib/
│   ├── api-spec/          # OpenAPI spec + codegen config
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/           # Generated Zod validators
└── package.json
```

---

## 📄 License
MIT
