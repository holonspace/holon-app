import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { OAuth2Field, InputField, OauthSeparator } from "@/components/auth"
import { loginSchema, type LoginFormData } from "@/components/auth/schema"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator, Field, FieldDescription } from "@/components/ui/field"
import { Link } from "wouter"


export function LoginForm() {
    const { t } = useTranslation("auth")
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = (data: LoginFormData) => {
        console.log("Login form submitted:", data)
    }

    return (
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                    <p className="text-muted-foreground text-balance">
                        {t("login.subtitle")}
                    </p>
                </div>
                <InputField<LoginFormData>
                    name="email"
                    register={register}
                    errors={errors}
                    label={t("field.email")}
                    type="email"
                    placeholder={t("field.emailPlaceholder")}
                    autoComplete="email"
                />
                <InputField<LoginFormData>
                    name="password"
                    register={register}
                    errors={errors}
                    label={t("field.password")}
                    type="password"
                    labelExtra={
                        <a
                            href="#"
                            className="ml-auto text-xs/relaxed text-foreground underline-offset-2 hover:underline"
                        >
                            {t("login.forgotPassword")}
                        </a>
                    }
                    autoComplete="current-password"
                />
                <Field>
                    <Button type="submit">{t("login.submit")}</Button>
                </Field>
                <OauthSeparator />
                <OAuth2Field />
                <FieldDescription className="text-center">
                    {t("login.noAccount")} <Link href="/signup">{t("login.signUpLink")}</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
