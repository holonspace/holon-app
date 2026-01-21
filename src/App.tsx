import { ThemeProvider } from "@/components/theme"
import NotFound from "@/page/404"
import { Dashboard } from "@/page/dashboard"
import { Route, Switch } from "wouter"

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="*" component={NotFound} />
            </Switch>
        </ThemeProvider>
    )
}

export default App