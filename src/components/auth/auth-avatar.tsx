import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth"

export function AuthAvatarImage(props: React.ComponentProps<typeof AvatarImage>) {
    const { session } = useAuth()
    return (
        <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? ""}   {...props} />
    )
}


export function AuthAvatarFallback(props: React.ComponentProps<typeof AvatarFallback>) {
    const { session } = useAuth()
    return (
        <AvatarFallback {...props}>
            {session?.user?.name?.slice(0, 2).toUpperCase() ?? ""}
        </AvatarFallback>
    )
}