import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import i18n from "@/i18n"
import { SUPPORTED_LANGUAGES } from "@/i18n/config"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function LanguageSelector({ className, ...props }: React.ComponentProps<typeof SelectTrigger>) {
    const { t } = useTranslation("language")

    const handleValueChange = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className={cn("w-[150px]", className)} {...props}>
                <SelectValue placeholder={t('placeholder')} />
            </SelectTrigger>
            <SelectContent>
                {SUPPORTED_LANGUAGES.map((value) =>
                    <SelectItem value={value}>{t(value)}</SelectItem>
                )}
            </SelectContent>
        </Select>
    )
}
