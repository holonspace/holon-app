
import { authClient, type Session } from "@/lib/auth"
import { useMemo } from "react"


type UpdateUser = Partial<Omit<Session['user'], 'id' | 'createdAt' | 'updatedAt' | 'email' | 'emailVerified'>>

interface UseAuthResult {
    session: Session | null
    status: "loading" | "authenticated" | "unauthenticated"
    updateUser: (data: UpdateUser) => Promise<ReturnType<typeof authClient.updateUser>>
}

export const useAuth = (): UseAuthResult => {
    const { data: session, isPending } = authClient.useSession()

    const status = useMemo(() => {
        if (isPending) return "loading"
        if (session) return "authenticated"
        return "unauthenticated"
    }, [session, isPending])

    return { session: session, status, updateUser: authClient.updateUser }
}

