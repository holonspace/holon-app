import { useAuth } from "@/lib/auth"
import { Route, useLocation } from "wouter"

interface ProtectedRouteProps {
    path: string
    component: React.ComponentType<any> // 這裡定義 Component 的類型
}

export const ProtectedRoute = ({ component: Component, ...props }: ProtectedRouteProps) => {
    const [_, setLocation] = useLocation()

    const { session, status } = useAuth()

    if (!session) {
        // 如果未授權，重導向到登入頁面
        setLocation("/signin")
        return null
    }
    return <Route {...props} component={Component} />
}