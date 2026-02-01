
import { ThemeProvider } from "@/components/theme"
import i18n from "@/i18n"
import NotFound from "@/page/404"
import AuthPage from "@/page/auth"
import ChatPage from "@/page/chat"
import { DashboardPage } from "@/page/dashboard"
import OnBoardingPage from "@/page/onboarding"
import OTPPage from "@/page/otp"
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { I18nextProvider } from "react-i18next"
import { Route, Switch } from "wouter"

const queryClient = new QueryClient()

function App() {

    return (
        <ThemeProvider>
            <I18nextProvider i18n={i18n}>
                <QueryClientProvider client={queryClient}>
                    <Switch>
                        <Route path="/dashboard" component={DashboardPage} />
                        <Route path="/(signin|signup)" component={AuthPage} />
                        <Route path="/otp" component={OTPPage} />
                        <Route path="/onboarding" component={OnBoardingPage} />
                        <Route path="/chat" component={ChatPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </I18nextProvider>
        </ThemeProvider>
    )
}

export default App
