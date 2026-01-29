import { InputField } from "@/components/auth"
import { signInSchema, type EmailFormData, type SignInFormData } from "@/components/auth/schema"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useSearchParams } from "wouter"; // 引入 useLocation 用於跳轉

export function VerifyForm() {
    const [searchParams] = useSearchParams()
    const [, setLocation] = useLocation() // wouter 的跳轉方法

    const email = searchParams.get('email')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        // 如果 email 在組件首次渲染時就存在，可以直接設為預設值
        defaultValues: {
            email: email || ""
        }
    })

    useEffect(() => {
        // 1. 檢查是否存在 email，若無則跳轉回登入頁或首頁
        if (!email) {
            setLocation("/login") // 替換為你的目標路徑
            return
        }

        // 2. 如果 email 存在且需要同步到表單（應對初始渲染後參數才載入的情況）
        setValue("email", email)
        
    }, [email, setLocation, setValue])

    const onSubmit = (data: EmailFormData) => {
        console.log("Form submitted:", data)
    }

    return (
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Verify your email</h1>
                    <p className="text-sm text-muted-foreground">
                        驗證信件已發送至 <strong>{email}</strong>
                    </p>
                </div>
            
                <InputField<SignInFormData>
                    name="email"
                    register={register}
                    errors={errors}
                    label="Email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    readOnly
                />         
                 <InputField<SignInFormData>
                    name="password"
                    register={register}
                    errors={errors}
                    label="Password"
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                />    
                <Field>
                    <Button type="submit" className="w-full">
                         Sign In
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}