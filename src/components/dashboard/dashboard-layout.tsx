import { cn } from "@/lib/utils"

export function DashboardLayout({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-1 flex-col gap-4 p-4", className)} {...props} />
    )
}