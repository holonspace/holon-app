import { Loading } from "@/components/loading"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { Route, useLocation } from "wouter"

interface ProtectedRouteProps {
    path: string
    component: React.ComponentType<any> 
}

export const ProtectedRoute = ({ component: Component, ...props }: ProtectedRouteProps) => {
    const [_, setLocation] = useLocation()

    const { status } = useAuth()

    useEffect(() => {
        if (status === 'unauthenticated') {
            setLocation('/signin')
        }
    }, [status, setLocation])

    if (status !== 'authenticated') {
        return <Loading />
    }

    return <Route {...props} component={Component} />
}