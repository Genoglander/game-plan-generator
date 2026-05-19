# 游戏企划生成器 / Game Plan Generator / ゲーム企画ジェネレーター

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

### 环境要求 / Prerequisites / 前提条件

- Node.js 18+
- pnpm 8+
- OpenAI API Key

### 安装 / Install / インストール

```bash
# 克隆仓库 / Clone the repo / リポジトリをクローン
git clone https://github.com/<your-username>/game-plan-generator.git
cd game-plan-generator

# 安装依赖 / Install dependencies / 依存関係をインストール
pnpm install
```

### 配置环境变量 / Environment Variables / 環境変数の設定

在项目根目录创建 `.env` 文件：  
Create a `.env` file in the project root:  
プロジェクトルートに `.env` ファイルを作成:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 启动 / Run / 起動

```bash
# 启动 API 服务器 / Start API server / API サーバーを起動
pnpm --filter @workspace/api-server run dev

# 启动前端 / Start frontend / フロントエンドを起動
pnpm --filter @workspace/game-planner run dev
```

前端默认运行在 `http://localhost:5173`，API 服务器运行在 `http://localhost:3000`。  
Frontend runs at `http://localhost:5173`, API server at `http://localhost:3000`.  
フロントエンドは `http://localhost:5173`、API サーバーは `http://localhost:3000` で起動します。

---

## 🛠 技术栈 / Tech Stack / 技術スタック

- **Frontend / 前端 / フロントエンド:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend / 后端 / バックエンド:** Express + TypeScript
- **AI:** OpenAI GPT-4.1-mini
- **Package Manager:** pnpm (monorepo)
- **API Spec:** OpenAPI 3.0 + Orval codegen
- **Export:** html-to-image (PNG), Markdown

---

## 📁 项目结构 / Project Structure / プロジェクト構成

```
├── artifacts/
│   ├── api-server/        # Express API server / API サーバー
│   └── game-planner/      # React frontend / フロントエンド
├── lib/
│   ├── api-spec/          # OpenAPI spec + codegen config
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/           # Generated Zod validators
└── package.json
```

---

## 📄 许可证 / License / ライセンス

MIT
