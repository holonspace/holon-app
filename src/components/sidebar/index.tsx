
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import React from "react"

function SidebarMenuNavButton({ children, className, ...props }: React.ComponentProps<typeof SidebarMenuButton>) {
    return (
        <SidebarMenuButton className={cn("h-9 cursor-pointer [&>svg]:size-5 group-data-[collapsible=icon]:size-9", className)} {...props}>
            {children}
        </SidebarMenuButton>
    )
}

export { SidebarMenuNavButton }

