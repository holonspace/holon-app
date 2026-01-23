import { useTranslation } from "react-i18next"
import { OAuth2Field } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "wouter"


export function SignUpForm() {
    const { t } = useTranslation("auth")

    return (
        <form className="p-6 md:p-8">
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">{t("signup.title")}</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        {t("signup.subtitle")}
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
                    <FieldDescription>
                        {t("signup.emailDescription")}
                    </FieldDescription>
                </Field>
                <Field>
                    <Field className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="password">{t("field.password")}</FieldLabel>
                            <Input id="password" type="password" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                {t("field.confirmPassword")}
                            </FieldLabel>
                            <Input id="confirm-password" type="password" required />
                        </Field>
                    </Field>
                    <FieldDescription>
                        {t("signup.passwordRequirement")}
                    </FieldDescription>
                </Field>
                <Field>
                    <Button type="submit">{t("signup.submit")}</Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    {t("oauth.separator")}
                </FieldSeparator>
                <OAuth2Field />
                <FieldDescription className="text-center">
                    {t("signup.hasAccount")} <Link href="/signin">{t("signup.signInLink")}</Link>
                </FieldDescription>
            </FieldGroup>
        </form>

    )
}
