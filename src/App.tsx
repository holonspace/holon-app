import { ThemeProvider } from "@/components/theme"
import i18n from "@/i18n"
import NotFound from "@/page/404"
import { Dashboard } from "@/page/dashboard"
import { I18nextProvider } from "react-i18next"
import { Route, Switch } from "wouter"

function App() {

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <I18nextProvider i18n={i18n}>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </I18nextProvider>
        </ThemeProvider>
    )
}

export default App