import { useCallback } from "react"
import { useLocation } from "wouter"

type NavigateParams = {
    path?: string
    params?: Record<string, string>
}

export const useNavigate = () => {
    const [location, setLocation] = useLocation()

    const navigateTo = useCallback(
        ({ path = "", params = {} }: NavigateParams) => {
            const query = new URLSearchParams(params).toString()
            const url = query ? `${path}?${query}` : path
            setLocation(url)
        },
        [setLocation]
    )

    return {
        navigateTo,
        setLocation,
        location
    }
}