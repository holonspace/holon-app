import { AuthSeparator, InputField, OAuth2Field } from "@/components/auth"
import { emailSchema, type EmailFormData } from "@/components/auth/schema"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation } from "wouter"


export function SignInForm() {
    const [_, setLocation] = useLocation();
    const { t } = useTranslation("auth")
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema)
    })

    const onSubmit = (data: EmailFormData) => {
        console.log("Login form submitted:", data)
        setLocation(`/auth/verify?email=${data.email}`)
    }

    return (
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">{t("signin.title")}</h1>
                    <p className="text-muted-foreground text-balance">
                        {t("signin.subtitle")}
                    </p>
                </div>
                <InputField<EmailFormData>
                    name="email"
                    register={register}
                    errors={errors}
                    label={t("field.email")}
                    type="email"
                    placeholder={t("field.emailPlaceholder")}
                    autoComplete="email"
                />
                <Field>
                    <Button type="submit">{t("signin.submit")}</Button>
                </Field>
                <AuthSeparator >
                    {t("oauth.separator")}
                </AuthSeparator>
                <OAuth2Field />
            </FieldGroup>
        </form>
        
    )
}
