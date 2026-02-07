
import { ThemeProvider } from '@/components/theme'
import Routes from '@/routes'
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Routes />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
