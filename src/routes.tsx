import { CircleLoading } from '@/components/loading'
import { lazy, Suspense } from 'react'
import { Route, Routes as RouterRoutes, useLocation } from "react-router"

const SignInPage = lazy(() => import('@/pages/auth/signin'))
const OtpPage = lazy(() => import('@/pages/auth/otp'))
const OnboardingPage = lazy(() => import('@/pages/auth/onboarding'))
const DashboardLayout = lazy(() => import('@/pages/dashboard/layout'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const AgentPage = lazy(() => import('@/pages/dashboard/agents'))
const AgentGenesiPage = lazy(() => import('@/pages/dashboard/agents.genesis'))
const ChatPage = lazy(() => import('@/pages/chat'))
const NotFoundPage = lazy(() => import('@/pages/404'))

export default function Routes() {
    const location = useLocation()
    return (
        <Suspense fallback={<CircleLoading />} key={location.pathname}>
            <RouterRoutes>
                <Route path="signin" element={<SignInPage />} />
                <Route path="otp" element={<OtpPage />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="agents" element={<AgentPage />} />
                    <Route path="agents/genesis" element={<AgentGenesiPage />} />
                </Route>
                <Route path="chat" element={<ChatPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </RouterRoutes >
        </Suspense >
    )
}