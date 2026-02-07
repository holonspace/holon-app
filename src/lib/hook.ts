import { useCallback } from "react"


type NavigateParams = {
    path?: string
    params?: Record<string, string>
}

export const useNavigate = () => {
    // const [location, setLocation] = useLocation()

    const setLocation: any = () => { }

    const navigateTo = useCallback(
        ({ path = "", params = {} }: NavigateParams) => {
            const query = new URLSearchParams(params).toString()
            const url = query ? `${path}?${query}` : path
            // setLocation(url)
        },
        [setLocation]
    )

    return {
        navigateTo,
        setLocation,
        location
    }
}