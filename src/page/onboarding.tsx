import { useAuth } from "@/lib/auth"
import { useEffect } from "react"


export default function OnBoardingPage() {
    const { session } = useAuth()

    useEffect(() => {
        console.log(session)

    }, [session])

    return <div>{JSON.stringify(session, null, 2)}</div>
}