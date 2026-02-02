import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SUPPORTED_LANGUAGES } from "@/i18n/config"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function LanguageSelector({ className, ...props }: React.ComponentProps<typeof SelectTrigger>) {
    const { t, i18n } = useTranslation("language")
    
    const handleValueChange = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    return (
        <Select onValueChange={handleValueChange} defaultValue={i18n.language}>
            <SelectTrigger className={cn("w-[150px]", className)} {...props}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {SUPPORTED_LANGUAGES.map((value) =>
                    <SelectItem key={value} value={value}>{t(value)}</SelectItem>
                )}
            </SelectContent>
        </Select>
    )
}
