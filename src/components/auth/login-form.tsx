import { useTranslation } from "react-i18next"
import { OAuth2Field } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "wouter"


export function LoginForm() {
    const { t } = useTranslation("auth")

    return (
        <form className="p-6 md:p-8">
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                    <p className="text-muted-foreground text-balance">
                        {t("login.subtitle")}
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">{t("field.email")}</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={t("field.emailPlaceholder")}
                        required
                    />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">{t("field.password")}</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                            {t("login.forgotPassword")}
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                </Field>
                <Field>
                    <Button type="submit">{t("login.submit")}</Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    {t("oauth.separator")}
                </FieldSeparator>
                <OAuth2Field />
                <FieldDescription className="text-center">
                    {t("login.noAccount")} <Link href="/signup">{t("login.signUpLink")}</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
