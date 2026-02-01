import { InputField, signInSchema, SubmitButton, type SignInFormData } from "@/components/auth"
import type { StepProps } from "@/components/auth/steps/types"
import { FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export function CredentialStep({ email }: StepProps) {

    const [loading, setLoading] = useState(false)
    const { t } = useTranslation("auth")
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: email ?? ""
        }
    })

    const onSubmit = async ({ password, email }: SignInFormData) => {
        try {
            setLoading(true)
            // const { error } = await authClient.signIn.email({ email, password })
            // if (error) {
            //     if (error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            //         setError("password", {
            //             type: "manual",
            //             message: "Invalid email or password"
            //         })
            //         setError("email", {
            //             type: "manual",
            //             message: "Invalid email or password"
            //         })
            //     } else {
            //         throw new Error("Unknown response code: " + error.code)
            //     }
            // }
            console.log(password, email)

        } catch (error) {
            console.error("Unknown response error: " + error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <InputField<SignInFormData>
                    name="email"
                    register={register}
                    errors={errors}
                    label={t("field.email")}
                    type="email"
                    placeholder={t("field.emailPlaceholder")}
                    autoComplete="email"
                />
                <InputField<SignInFormData>
                    name="password"
                    register={register}
                    errors={errors}
                    label={t("field.password")}
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                />
                <SubmitButton loading={loading}>
                    credential
                </SubmitButton>
            </FieldGroup>
        </form>
    )
}
