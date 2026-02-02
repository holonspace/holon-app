import { InputField, OAuth2Field, Separator, SubmitButton } from "@/components/auth/form"
import { useOTP } from "@/components/auth/form/hook"
import { emailSchema, type EmailFormData } from "@/components/auth/form/schema"
import type { StepProps } from "@/components/auth/form/steps/types"
import { FieldGroup } from "@/components/ui/field"
import authApi from "@/lib/auth/api"
import { useNavigate } from "@/lib/hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function EmailStep({ email }: StepProps) {

    const [loading, setLoading] = useState(false)
    const { navigateTo } = useNavigate()
    const { navigateToOTP } = useOTP()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: email ?? "billyfan01@gmail.com"
        }
    })

    const onSubmit = async ({ email }: EmailFormData) => {
        setLoading(true)
        try {
            const data = await authApi.checkEmail({ email })
            switch (data?.code) {
                // case "USER_NOT_FOUND":
                //     navigateTo({ path: "/signup", params: { email } })
                //     return

                case "REQUEST_PASSWORD":
                    navigateTo({ params: { step: "credential", email } })
                    return

                // case "REQUEST_EMAIL_VERIFICATION":
                //     navigateToOTP(email)
                //     return

                default:
                    navigateToOTP(email)
                    return
            }
        } catch (error) {
            console.error("Unknown response error: " + error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <InputField<EmailFormData>
                        name="email"
                        register={register}
                        errors={errors}
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                    />
                    <SubmitButton loading={loading}>
                        signin
                    </SubmitButton>
                </FieldGroup>
            </form >
            <Separator />
            <OAuth2Field />
        </>
    )
}
