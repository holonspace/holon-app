import { ThemeProvider } from "@/components/theme"
import i18n from "@/i18n"
import NotFound from "@/page/404"
import ChatPage from "@/page/chat"
import { DashboardPage } from "@/page/dashboard"
import { SignInPage } from "@/page/signin"
import { I18nextProvider } from "react-i18next"
import { Route, Switch } from "wouter"


function App() {
    return (
        <ThemeProvider>
            <I18nextProvider i18n={i18n}>
                <Switch>
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/signin/:rest*" component={SignInPage} />
                    <Route path="/chat" component={ChatPage} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </I18nextProvider>
        </ThemeProvider>
    )
}

export default App
