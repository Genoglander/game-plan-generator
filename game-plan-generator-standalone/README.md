# 游戏企划生成器 / Game Plan Generator

输入一句游戏点子，AI 自动生成完整企划书、任务清单与开发计划。  
Turn your game idea into a complete design doc, task list, and weekly dev plan — powered by AI.

支持中文、日语、英语 / Supports Chinese, Japanese, and English output.

---

## 前置要求 / Requirements

- [Node.js](https://nodejs.org/) v18 or higher
- An [OpenAI API key](https://platform.openai.com/api-keys)
- npm **or** pnpm

---

## 快速开始 / Quick Start

### 1. 进入项目文件夹

```bash
cd game-plan-generator-standalone
```

### 2. 安装依赖（只需一次 / Install once）

```bash
npm install
# 或 / or
pnpm install
```

### 3. 配置 API Key

```bash
cp .env.example .env
```

用文本编辑器打开 `.env`，将 `sk-your-api-key-here` 替换为你的 OpenAI API Key：

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. 启动 / Start

```bash
npm run dev
# 或 / or
pnpm run dev
```

浏览器打开 → **http://localhost:5173**

后端 API 运行在 `http://localhost:3000`。

---

## 项目结构 / Project Structure

```
game-plan-generator-standalone/
├── package.json          # 所有依赖（前后端合并）/ All deps in one place
├── .env.example          # API Key 模板
├── server/               # Express 后端 (Node.js + TypeScript)
│   └── src/
│       ├── index.ts
│       └── routes/generate.ts
└── client/               # React 前端 (Vite + TypeScript + Tailwind CSS)
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── pages/home.tsx
        ├── components/
        └── lib/
```

---

## 功能 / Features

- **AI 企划生成** — 输入游戏点子，秒出完整企划
- **三语支持** — 简体中文、日语、英语
- **企划书** — 标题、类型、概念、核心玩法、平台、特性
- **任务清单** — 分类、优先级、预估工时
- **技术难点** — 难度评级与解决方案
- **一周计划** — 7 天开发日程与里程碑
- **导出 Markdown / PNG**

---

## AI 模型 / Model

默认使用 `gpt-4.1-mini`，可在 `server/src/routes/generate.ts` 中修改。
