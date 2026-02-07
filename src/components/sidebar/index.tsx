import {
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Link } from "react-router"


type Icon = React.ComponentType<{ className?: string }>

export function SidebarMenuIcon({
    icon: Icon,
    className,
    ...props
}: React.ComponentProps<"svg"> & { icon: Icon }) {
    return (
        <Icon className={cn("size-5!", className)} {...props} />
    )
}

interface SidebarNavButtonProps extends React.ComponentProps<typeof SidebarMenuButton> {
    title?: string
    url?: string
    icon: Icon
    children?: React.ReactNode
    spanClassName?: string
}

export function SidebarMenuNavButton({
    children,
    icon: Icon,
    className,
    collapsedStyle = 'hidden',
    url,
    ...props
}: SidebarNavButtonProps) {
    const content = (
        <>
            <Icon className="size-5!" />
            <div className="flex-1 transition-all group-data-[collapsible=icon]:opacity-0 duration-200 ml-2">{children}</div>
        </>
    )
    return (
        <SidebarMenuButton asChild={!!url} collapsedStyle={collapsedStyle} className={cn("h-9 cursor-pointer", className)} {...props}>
            {url ? <Link to={url}>{content}</Link> : content}
        </SidebarMenuButton>
    )
}
