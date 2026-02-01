import { InputField, OAuth2Field, OauthSeparator } from "@/components/auth"
import { signUpSchema, type SignUpFormData } from "@/components/auth/schema"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Link } from "wouter"


export function SignUpForm() {
    const { t } = useTranslation("auth")
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = (data: SignUpFormData) => {
        console.log("Sign up form submitted:", data)
    }

    return (
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">{t("signup.title")}</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        {t("signup.subtitle")}
                    </p>
                </div>
                <InputField<SignUpFormData>
                    name="email"
                    register={register}
                    errors={errors}
                    label={t("field.email")}
                    type="email"
                    placeholder={t("field.emailPlaceholder")}
                    autoComplete="email"
                />
                <Field>
                    <Field className="flex flex-col gap-4">
                        <InputField<SignUpFormData>
                            name="password"
                            register={register}
                            errors={errors}
                            label={t("field.password")}
                            type="password"
                            autoComplete="new-password"
                        />
                        <InputField<SignUpFormData>
                            name="confirmPassword"
                            register={register}
                            errors={errors}
                            label={t("field.confirmPassword")}
                            type="password"
                            autoComplete="new-password"
                        />
                    </Field>

                </Field>
                <Field>
                    <Button type="submit">{t("signup.submit")}</Button>
                </Field>
                <OauthSeparator />
                <OAuth2Field />
                <FieldDescription className="text-center">
                    {t("signup.hasAccount")} <Link href="/auth/signin">{t("signup.signInLink")}</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
