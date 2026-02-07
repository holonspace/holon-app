import { SidebarMenuNavButton } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLocalStorage } from "@uidotdev/usehooks"
import {
    ArrowUp,
    ArrowUpRight,
    BadgeCheck,
    Bell,
    CreditCard,
    LinkIcon,
    LogOut,
    MoreHorizontal,
    PanelLeftIcon,
    Search,
    Settings,
    Sparkles,
    SquarePen,
    StarOff,
    Trash2
} from "lucide-react"
import { useRef, useState } from "react"
import { Link } from "react-router"

export function ChatSidebar(props: React.ComponentProps<typeof SidebarInset>) {
    const [open, setOpen] = useLocalStorage('dashboard-sidebar-open', true)
    const [showTop, setShowTop] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // 監聽滾動事件
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        // e.target 是真正滾動的 Viewport 節點
        const target = e.target as HTMLDivElement
        const scrollTop = target.scrollTop
        setShowTop(scrollTop > 100)
    }

    // 置頂功能
    const scrollToTop = () => {
        const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]')
        if (viewport) {
            viewport.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <SidebarProvider sidebarWidthIcon="3.25rem" open={open} onOpenChange={setOpen}>
            <div className="fixed top-0 left-0 h-14 z-50 flex items-center justify-center">
                <SidebarTrigger className='mx-2 size-9' >
                    <PanelLeftIcon className="size-5" />
                </SidebarTrigger>
            </div>
            <Sidebar collapsible="icon">
                <SidebarContent className="mt-14">
                    <ChatSidebarNav />
                    <SidebarGroup className="flex-1 min-h-0 flex flex-col p-0">
                        <SidebarGroupLabel className="px-4 group-data-[collapsible=icon]:mt-0">
                            <div className="w-full flex items-center justify-between">
                                <span>
                                    Chats
                                </span>
                                {showTop && (
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="size-6"
                                        onClick={scrollToTop}
                                    >
                                        <ArrowUp className="size-4!" />
                                    </Button>
                                )}
                            </div>
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="flex-1 min-h-0 w-full">
                            <SidebarMenu className="h-full">
                                <ScrollArea
                                    className="h-full w-full [&_[data-radix-scroll-area-viewport]>:first-child]:block! px-2"
                                    onScrollCapture={handleScroll}
                                    ref={scrollRef}
                                >
                                    {Array.from({ length: 100 }).map((_, index) => (
                                        <ChatButton key={index} id={index.toString()} />
                                    ))}
                                </ScrollArea>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <ChatSidebarFooter />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset {...props} />
        </SidebarProvider >
    )
}

const navs = [
    {
        title: "New Chat",
        url: "#",
        icon: SquarePen,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    }
]

function ChatSidebarNav() {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {navs.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuNavButton title={item.title} asChild>
                            <Link to="#">
                                {item.icon && <item.icon />}
                                <span className="ml-2 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:opacity-0">{item.title}</span>
                            </Link>
                        </SidebarMenuNavButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

interface ChatButtonProps {
    id: string
}

function ChatButton({ id }: ChatButtonProps) {
    const isMobile = useIsMobile()
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className="transition-all group-data-[collapsible=icon]:opacity-0 duration-200 ease-linear">
                <Link to={`#${id}`}>
                    <span className="truncate line-clamp-1">{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}{id}</span>
                </Link>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                >
                    <DropdownMenuItem>
                        <StarOff className="text-muted-foreground" />
                        <span>Remove from Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LinkIcon className="text-muted-foreground" />
                        <span>Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ArrowUpRight className="text-muted-foreground" />
                        <span>Open in New Tab</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem >
    )
}

function ChatSidebarFooter() {
    const isMobile = useIsMobile()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className="h-9 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >

                            <Settings className="ml-auto size-5!" />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                Settings
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}