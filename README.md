<div align="center">
	<h1>MicroTodo Electron</h1>
	<p>最前面に常駐する超ミニマルな TODO / プロジェクト管理 Electron アプリ</p>
	<p>
		<strong>Electron</strong> · <strong>React 19</strong> · <strong>Vite</strong> · <strong>TypeScript</strong> · <strong>Tailwind CSS v4</strong>
	</p>
</div>

---

## 🚀 概要
MicroTodo Electron は「常に見える / すぐ追加 / すぐ完了」を最優先にした軽量タスク管理アプリです。ウィンドウは小さく (360x260) 常に最前面表示、フレーム無し + 透過背景で他作業を邪魔しにくい設計です。プロジェクト単位でタスクを整理し、ローカル JSON 永続化を用いてシンプルにデータ保持します。

## ✨ 主な特徴
- 最前面 (alwaysOnTop) & フレームレス & 透過 UI による “付箋” 的操作体験
- プロジェクトとタスクの最小限モデル (Project / Task)
- Electron IPC + Preload 経由の安全な JSON 読み書き (`readJSON` / `writeJSON`)
- React Hooks + Facade パターン (`useProjectFacade`, `useTodoFacade`) により UI / 状態分離
- `react-hook-form` + `zod` によるフォームバリデーション (拡張余地)
- Radix UI / CMDK / Tailwind で構成された簡潔な UI コンポーネント群
- 依存を抑えたローカル JSON DB (`src/db/db.json`) による軽量永続化

## 🧱 技術スタック
| レイヤ | 技術 | 補足 |
|--------|------|------|
| Desktop Shell | Electron 39 | Preload + contextIsolation で安全な API exposed |
| Frontend | React 19 / Vite (rolldown-vite) | BrowserRouter 利用 |
| 言語 | TypeScript 5.9 | `tsconfig.*` 分離 (app/electron/node) |
| UI | Tailwind CSS v4 / Radix UI / CMDK / lucide-react | ミニマルな入力・ダイアログ・コマンドパレット |
| フォーム | react-hook-form + zod | スキーマバリデーション |
| 状態/構造 | Facade Hooks | `project.facade.tsx` / `todo.facade.tsx` |
| 永続化 | JSON ファイル | IPC 経由で同期書き込み |

## 📂 ディレクトリ構成 (抜粋)
```
electron/            # Electron メイン & Preload (TS)
dist-electron/       # ビルド後 main.js / preload.js
src/
	components/
		micro-view/      # プロジェクト / タスク最小UI
			project/       # プロジェクト一覧 + 作成 + 検索ダイアログ
			todo/          # タスク一覧 + CRUD
		ui/              # Button / Dialog / Form 等共通UI
	models/            # Project, Task モデル + DB操作ラッパ
	db/db.json         # ローカル永続化ファイル
	lib/utils.ts       # 汎用ユーティリティ
	types/preload.d.ts # Preload API の型補完
```

## 🗄️ データモデル
```ts
// Project
interface Project { id: string; name: string }
// Task
interface Task { id: string; title: string; isChecked: boolean; projectId: string }
```
`models.ts` の `init()` が DB ファイル存在確認し、未作成なら `{projects: [], tasks: []}` 初期化。Facade Hooks が `fetchProjects` / `fetchTasksByProjectId` / `createTask` 等を組み合わせ UI を駆動します。

## 🔌 IPC / Preload API
Preload (`electron/preload.ts`) で以下を exposed:
```ts
window.api = {
	ping: () => 'pong from preload',
	readJSON(filePath),
	writeJSON(filePath, data),
	existsJSON(filePath)
}
```
Electron Main (`electron/main.ts`) 側で `ipcMain.handle('json:read' | 'json:write', ...)` を実装し、直接 FS アクセスを Renderer から隔離します。

## 🛠 開発手順
```bash
git clone <repo-url>
cd microtodo-electron
npm install

# 初回のみ: Electron の TS をビルド (dist-electron/*.js 生成)
npm run build:electron

# 開発起動 (Vite + Electron 並行)
npm run dev
```
開発モードでは `NODE_ENV=development` が設定され、Electron は `http://localhost:5173` をロードし DevTools を開きます。

### 主要スクリプト
| Script | 説明 |
|--------|------|
| `npm run dev` | Vite (`dev:vite`) と Electron (`dev:electron`) を `concurrently` で起動 |
| `npm run build` | TypeScript ビルド + Vite 本番ビルド (フロント) |
| `npm run build:electron` | Electron 用 TS コンパイル (`tsconfig.electron.json`) |
| `npm run lint` | ESLint 実行 |
| `npm run preview` | Vite ビルド成果物のプレビュー |

## 📦 本番ビルド
```bash
npm run build
npm run build:electron
```
生成物は `dist/` (フロント) と `dist-electron/` (Electron) に出力されます。パッケージング (インストーラ生成) は未実装です。`electron-builder` 等の導入を検討してください:
```bash
npm install --save-dev electron-builder
```
`package.json` に `build` 設定を追加し、`npm run dist` 等を定義すると配布容易になります。

## 🧩 アーキテクチャメモ
- Renderer ではグローバル状態管理ライブラリを使わず、Facade Hooks でローカル状態 + 非同期取得処理をカプセル化。
- 永続化は同期的 JSON ファイル書き込みでシンプルさ優先 (競合/複数ウィンドウは未対応)。
- UI は小サイズ前提で過度なナビゲーションを避け、Router + ダイアログ / コマンドパレット中心。

## 🔒 セキュリティ留意点
- Preload 経由で限定 API のみ公開 (直接 `fs` 参照を避ける)。
- 現状 `existsJSON` の IPC 実装が main 側に未定義のため、利用時は追加実装が必要。
- 今後: contextIsolation, sandbox, CSP の強化 / 署名付きパッケージング。

## 🗺 今後の改善アイデア (TODO)
- `existsJSON` IPC の main 側ハンドラ追加
- Task 並び替え / フィルタ / 検索
- プロジェクト削除・リネーム機能
- 永続化層の抽象化 (SQLite / IndexedDB 等 option 化)
- Electron パッケージング / 自動更新
- ダークモード / テーマ切替
- テスト (Unit / E2E) 導入

## 🧪 テスト戦略 (予定)
- Model レイヤの純粋関数分離後 Jest などで検証
- IPC は Preload をモックしレンダラ側ロジックを単体テスト

## 📝 ライセンス
現状ライセンス未記載。OSS として公開する場合は `MIT` などを推奨。`LICENSE` ファイル追加を検討してください。

## 🤝 コントリビュート
Issue / PR 歓迎。最初の提案では簡潔さ (小さなウィンドウ・最少操作) を崩さない方向性をご留意ください。

## ❓ FAQ
**Q. データはどこに保存されますか?**  → リポジトリ内 `src/db/db.json`。Git 管理除外したい場合は `.gitignore` へ追記。

**Q. 複数端末同期は可能?**  → 現状ローカルのみ。Git / 外部同期サービス連携は未実装。

**Q. サイズを変更したい**  → `electron/main.ts` の `BrowserWindow` 設定を編集。

---

<div align="center">Enjoy your micro productivity! ✨</div>

