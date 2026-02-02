# 修復 better-auth 版本不一致問題

## 問題描述

在 `src/lib/auth/index.ts` 中，`checkEmailClient()` 和 `emailOTPClient()` 出現 TypeScript 型別錯誤：

```
類型 'BetterAuthClientPlugin' 不可指派給類型 'BetterAuthClientPlugin'
```

## 根本原因

pnpm monorepo 中存在版本衝突：

| 位置 | 版本 |
|------|------|
| `F:/holonspace/node_modules/.pnpm/@better-auth+core@1.4.18` | 1.4.18 |
| `F:/holonspace/packages/holon-app/node_modules/.pnpm/@better-auth+core@1.4.17` | 1.4.17 |

**原因**：`holon-app` 和 `holon-auth` 各自有獨立的 `pnpm-lock.yaml`，導致它們脫離了 workspace 統一的依賴解析機制。

## 解決方案

### 步驟 1：刪除各 package 的獨立 lockfile

```bash
# holon-app
rm F:\holonspace\packages\holon-app\pnpm-lock.yaml

# holon-auth
rm F:\holonspace\packages\holon-auth\pnpm-lock.yaml
```

### 步驟 2：刪除各 package 的 node_modules

```bash
# holon-app
rm -rf F:\holonspace\packages\holon-app\node_modules

# holon-auth
rm -rf F:\holonspace\packages\holon-auth\node_modules
```

### 步驟 3：從 workspace 根目錄重新安裝

```bash
cd F:\holonspace
pnpm install
```

### 步驟 4：驗證修復

```bash
cd F:\holonspace\packages\holon-app
pnpm build
```

## 預防措施

為避免此問題再次發生：

1. **始終從 workspace 根目錄執行 `pnpm install`**
2. **不要在子 package 中直接執行 `pnpm install`**
3. 可考慮在各 package 的 `.gitignore` 中加入 `pnpm-lock.yaml`（僅保留根目錄的）

## 相關檔案

- `F:\holonspace\pnpm-workspace.yaml` - workspace 設定
- `F:\holonspace\pnpm-lock.yaml` - 唯一應該存在的 lockfile
- `F:\holonspace\packages\holon-app\package.json` - better-auth@^1.4.18
- `F:\holonspace\packages\holon-auth\package.json` - better-auth@^1.4.18
- `F:\holonspace\packages\holon-auth\plugins\package.json` - @holon/auth-plugins
