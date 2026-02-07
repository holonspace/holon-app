
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { useAuth } from "@/lib/auth"
import { useNavigate } from '@/lib/hook'
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Fingerprint, InfoIcon, KeyRound } from 'lucide-react'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"

export const schema = z.object({
    name: z.union([z.literal(""), z.string().min(1, "error.name.required")]),
})

export type FormData = z.infer<typeof schema>

export default function OnboardingPage() {
    const { setLocation } = useNavigate()
    const { session, updateUser } = useAuth()

    useEffect(() => {
        console.log(session)
        // Simple auth check to ensure user is logged in
        if (session === null) {
            // setLocation("/signin") // Uncomment when ready to enforce
        }
    }, [session])


    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: session?.user.name ?? "",
        },
    })

    const onSubmit = async ({ name }: FormData) => {
        if (name !== '' && name !== session?.user.name) {
            await updateUser({ name })
        }
    }

    return (
        <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="border-none p-4">
                        <CardHeader className="text-center py-6">
                            <CardTitle className="text-2xl font-bold">歡迎加入 Holon</CardTitle>
                            <CardDescription className="text-muted-foreground text-sm text-balance">
                                為了更方便的體驗，您可以設置其他登入方式。
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>
                                        使用者名稱
                                    </FieldLabel>
                                    <Input {...register("name")} type='text' autoComplete='username' />
                                    <FieldDescription>使用者名稱將用於公開顯示</FieldDescription>
                                </Field>
                                <FieldSeparator />
                                <Field >
                                    <Button variant="outline" type="button" className="w-full flex gap-2" onClick={() => {
                                        console.log('Register Passkey clicked')
                                    }}>
                                        <KeyRound className="size-4" />
                                        <span>設置密碼</span>
                                    </Button>
                                    <FieldDescription className="flex items-center gap-2">
                                        <InfoIcon className="size-4 text-primary" />
                                        <span>設置密碼為可選項，您可以通過 Email 驗證碼登入。</span>
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <Button variant="outline" type="button" className="w-full flex gap-2" onClick={() => {
                                        console.log('Register Passkey clicked')
                                    }}>
                                        <Fingerprint className="size-4" />
                                        <span>綁定 Passkey (推薦)</span>
                                    </Button>
                                    <FieldDescription>
                                        支援生物辨識或密碼管理器，體驗安全快速登入
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                        <CardFooter className="justify-between items-center border-none">
                            <FieldDescription>
                                可稍後於設定頁面進行設置
                            </FieldDescription>
                            <Button type="submit">
                                完成設定
                                <ArrowRight className="ml-1 size-3" />
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div >
    )
}