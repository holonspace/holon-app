import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"


export default function NotFound() {
    const { t } = useTranslation("page")
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6">
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-[120px] font-bold leading-none text-foreground">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground">
                    {t("notFound.title")}
                </h2>
                <p className="text-center text-base text-muted-foreground">
                    {t("notFound.description")}
                </p>
                <div className="flex gap-3 pt-4">
                    {window.history.length > 1 && document.referrer.includes(window.location.hostname) && (
                        <Button variant="outline" onClick={() => window.history.back()}>
                            {t("notFound.goBack")}
                        </Button>
                    )}
                    <Button asChild>
                        <Link to="/">
                            <Home className="size-4" />
                            {t("notFound.goHome")}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
