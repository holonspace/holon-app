# SignInForm 重構計劃

## 概述

將 SignInForm 重構為步驟元件分離架構，並採用 URL 參數模式支援瀏覽器回退功能。

---

## 問題分析

1. 表單使用 `emailSchema` 但新增 password 欄位時沒有對應驗證
2. 目前用條件判斷 `action` 會導致代碼隨步驟增加變得混亂
3. 單一元件處理多種狀態難以維護
4. 使用 React state 管理步驟，無法透過瀏覽器回退到上一步

---

## 解決方案

### 一、步驟元件分離架構

將每個 step 拆成獨立元件，各自管理 schema 和邏輯。

#### 新增文件結構

```
src/components/auth/
├── signin-form.tsx        # 主容器，管理步驟切換
├── steps/
│   ├── index.ts           # 匯出
│   ├── email-step.tsx     # step: signin
│   ├── credential-step.tsx # step: credential
│   └── otp-step.tsx       # step: otp
```

### 二、URL 參數模式

使用 wouter 的 `useSearchParams` hook 將 `step` 和 `email` 存入 URL 參數。

#### URL 結構

```
/signin                           → step=signin (初始，無參數)
/signin?step=credential&email=xxx → 密碼輸入步驟
/signin?step=otp&email=xxx        → OTP 驗證步驟
```

---

## 實作細節

### Schema 更新 (`schema.ts`)

```tsx
// 新增單獨的 password schema
export const passwordSchema = z.object({
    password: z.string().min(8, { message: "error.password.min" })
})

// 新增 OTP schema
export const otpSchema = z.object({
    otp: z.string().length(6, { message: "error.otp.length" })
})

export type PasswordFormData = z.infer<typeof passwordSchema>
export type OtpFormData = z.infer<typeof otpSchema>
```

### 主容器 (`signin-form.tsx`)

```tsx
import { useSearchParams } from "wouter"

type Step = "signin" | "credential" | "otp"

export function SignInForm() {
    const [searchParams, setSearchParams] = useSearchParams()

    // 從 URL 讀取狀態
    const step = (searchParams.get("step") || "signin") as Step
    const emailFromUrl = searchParams.get("email") || ""

    // 步驟切換時更新 URL
    const goToStep = (nextStep: Step, email?: string) => {
        const params = new URLSearchParams()
        params.set("step", nextStep)
        if (email) params.set("email", email)
        setSearchParams(params) // 預設 push，支援回退
    }

    return (
        <div className="p-6 md:p-8">
            {/* 共用 header */}
            <div className="flex flex-col items-center gap-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Holon Space</h1>
                <p className="text-muted-foreground">登入或註冊</p>
            </div>

            {step === "signin" && (
                <EmailStep onComplete={(email, nextStep) => goToStep(nextStep, email)} />
            )}
            {step === "credential" && (
                <CredentialStep email={emailFromUrl} />
            )}
            {step === "otp" && (
                <OtpStep email={emailFromUrl} />
            )}
        </div>
    )
}
```

### 步驟元件

#### `steps/email-step.tsx`

```tsx
interface EmailStepProps {
    onComplete: (email: string, nextStep: Step) => void
}

export function EmailStep({ onComplete }: EmailStepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema)
    })

    const onSubmit = async ({ email }: EmailFormData) => {
        const res = await authClient.checkEmail({ email })
        const code = res?.data?.code

        if (code === "USER_NOT_FOUND") {
            setLocation("/signup?email=" + email)
        } else if (code === "REQUEST_PASSWORD") {
            onComplete(email, "credential")
        } else if (code === "REQUEST_EMAIL_VERIFICATION") {
            onComplete(email, "otp")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField<EmailFormData> name="email" ... />
            <Button type="submit">繼續</Button>
        </form>
    )
}
```

#### `steps/credential-step.tsx`

```tsx
interface CredentialStepProps {
    email: string
}

export function CredentialStep({ email }: CredentialStepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema)
    })

    const onSubmit = async ({ password }: PasswordFormData) => {
        await authClient.signIn.email({ email, password })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* 顯示 email（唯讀） */}
            <div className="text-sm text-muted-foreground mb-4">{email}</div>
            <InputField<PasswordFormData> name="password" ... autoFocus />
            <Button type="submit">登入</Button>
        </form>
    )
}
```

#### `steps/otp-step.tsx`

```tsx
interface OtpStepProps {
    email: string
}

export function OtpStep({ email }: OtpStepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema)
    })

    const onSubmit = async ({ otp }: OtpFormData) => {
        await signIn.emailOtp({ email, otp })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm text-muted-foreground mb-4">{email}</div>
            <InputField<OtpFormData> name="otp" ... autoFocus />
            <Button type="submit">驗證</Button>
        </form>
    )
}
```

### SubmitButton 更新

```tsx
const stepLabelMap: Record<Step, string> = {
    "signin": "繼續",
    "credential": "登入",
    "otp": "繼續"
}

function SubmitButton({ step, loading }: { step: Step; loading?: boolean })
```

---

## 修改文件清單

| 文件 | 操作 | 說明 |
|------|------|------|
| `src/components/auth/schema.ts` | 修改 | 新增 passwordSchema、otpSchema |
| `src/components/auth/signin-form.tsx` | 修改 | 改為步驟容器，使用 URL 參數 |
| `src/components/auth/steps/email-step.tsx` | 新增 | Email 輸入步驟 |
| `src/components/auth/steps/credential-step.tsx` | 新增 | 密碼輸入步驟 |
| `src/components/auth/steps/otp-step.tsx` | 新增 | OTP 驗證步驟 |
| `src/components/auth/steps/index.ts` | 新增 | 匯出所有步驟元件 |

---

## 優點

- 每個步驟獨立，各自有專屬的 schema 和型別
- 新增步驟只需建立新元件，不影響其他步驟
- 測試容易，可以單獨測試每個步驟
- 代碼清晰，職責分離
- 支援瀏覽器回退功能
- URL 可分享、可書籤

---

## 驗證方式

1. `pnpm dev` 啟動開發伺服器
2. 測試完整流程：
   - 訪問 `/signin` → URL 無參數
   - 輸入 email → 檢查是否正確跳轉到 credential 或 otp 步驟
   - URL 變為 `?step=credential&email=xxx` 或 `?step=otp&email=xxx`
   - 點擊瀏覽器「回退」 → URL 還原，表單回到 email 步驟
   - credential 步驟：輸入密碼 → 驗證提交
   - otp 步驟：輸入驗證碼 → 驗證提交
3. `pnpm build` 確認無型別錯誤
