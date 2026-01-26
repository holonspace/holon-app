import { ChatModelSelector } from "@/components/chat"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    PanelLeftIcon,
    Search,
    SquarePen
} from "lucide-react"
import { Link } from "wouter"

interface ChatSidebarProps {
    children?: React.ReactNode
}


export function ChatSidebar({ children }: ChatSidebarProps) {
    return (
        <SidebarProvider sidebarWidthIcon="3.25rem">
            <Sidebar collapsible="icon" className="text-foreground/80">
                <SidebarHeader className="p-0 flex justify-center h-12">
                    <SidebarTrigger className='mx-2 size-9' >
                        <PanelLeftIcon className="size-5" />
                    </SidebarTrigger>
                </SidebarHeader>
                <SidebarContent>
                    <ChatSidebarNav />
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4 ">
                    <ChatModelSelector />
                    <Link to="/dashboard">
                        <Button
                            variant="ghost"
                            className="h-10 text-muted-foreground"
                        >
                            <LayoutDashboard className="size-5" />
                            Dashboard
                        </Button>
                    </Link>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
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
    const { state } = useSidebar()
    return (
        <SidebarGroup>
            {navs.map((item) => (
                <div key={item.title} className="flex-1 flex">
                    <Button
                        variant="ghost"
                        className="h-9 flex-1 px-2"
                    >
                        <div className="flex-1 flex items-center">
                            {item.icon && <item.icon className="size-5" />}
                            <span className={cn(
                                "transition-all duration-200 ease-in whitespace-nowrap",
                                state === "collapsed"
                                    ? "max-w-0 opacity-0" // 收起時：寬度 0、透明度 0
                                    : "max-w-[200px] opacity-100 ml-4"   // 展開時：足夠的寬度、透明度 1
                            )}>
                                {item.title}
                            </span>
                        </div>
                        <span className="sr-only">Toggle {item.title}</span>
                    </Button>
                </div>
            ))}
        </SidebarGroup>
    )
}

