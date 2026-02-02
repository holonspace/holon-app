
import { ProtectedRoute } from "@/components/route"
import { ThemeProvider } from "@/components/theme"

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
import { Route, Switch } from "wouter"

const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                {/* <LanguageSelector/> */}
                <Switch>
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/(signin|signup)" component={AuthPage} />
                    <Route path="/otp" component={OTPPage} />
                    <ProtectedRoute path="/onboarding" component={OnBoardingPage} />
                    <Route path="/chat" component={ChatPage} />
                    <Route path="*" component={NotFound} />
                </Switch>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
