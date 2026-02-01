import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"



export function Loading({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 *:data-[slot=loading-svg]:animate-spin *:data-[slot=loading-svg]:size-6", className)} {...props}>
            <Loader data-slot="loading-svg" />
        </div>
    )
}