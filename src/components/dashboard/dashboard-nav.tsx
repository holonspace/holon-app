import { SidebarMenuNavButton } from "@/components/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { useLocalStorage } from "@uidotdev/usehooks"
import {
    Bot,
    ChevronRight,
    MessageCircleMore,
    SquareTerminal,
    Workflow,
    Wrench
} from "lucide-react"
import React from "react"
import { Link } from "react-router"

// --- 類型定義 ---

interface NavSubItem {
    title: string
    url: string
}

interface NavItem {
    title: string
    url: string
    icon: React.ComponentType
    items?: NavSubItem[]
}

interface NavGroup {
    label: string
    items: NavItem[]
}

// --- 資料配置 ---

const navs: NavGroup[] = [
    {
        label: "Agentic",
        items: [
            {
                title: "Agents",
                url: "/dashboard/agents",
                icon: Bot,
                items: [
                    { title: "Genesis", url: "/dashboard/agents/genesis" },
                    { title: "Explorer", url: "/dashboard/agents/explorer" },
                    { title: "Quantum", url: "/dashboard/agents/quantum" },
                ],
            },
            {
                title: "Tools",
                url: "/dashboard/tools",
                icon: Wrench,
                items: [
                    { title: "History", url: "/dashboard/tools/history" },
                    { title: "Starred", url: "/dashboard/tools/starred" },
                    { title: "Settings", url: "/dashboard/tools/settings" },
                ],
            },
            {
                title: "Skills",
                url: "/dashboard/skills",
                icon: SquareTerminal,
                items: [
                    { title: "Introduction", url: "/dashboard/skills/introduction" },
                    { title: "Get Started", url: "/dashboard/skills/get-started" },
                    { title: "Tutorials", url: "/dashboard/skills/tutorials" },
                    { title: "Changelog", url: "/dashboard/skills/changelog" },
                ],
            },
            {
                title: "Flow",
                url: "/dashboard/flow",
                icon: Workflow,
                items: [
                    { title: "General", url: "/dashboard/flow/general" },
                    { title: "Team", url: "/dashboard/flow/team" },
                    { title: "Billing", url: "/dashboard/flow/billing" },
                    { title: "Limits", url: "/dashboard/flow/limits" },
                ],
            },
        ]
    }
]

// --- 組件實作 ---

interface DashboardNavCollapsibleProps {
    defaultOpen?: boolean
    title: string
    tooltip?: string
    url: string
    icon?: React.ComponentType
    items?: NavSubItem[]
}

function DashboardNavCollapsible({
    defaultOpen = false,
    title,
    tooltip,
    url,
    icon: Icon,
    items
}: DashboardNavCollapsibleProps) {

    const [isOpen, setIsOpen] = useLocalStorage(`dashboard-nav-collapsible-${url}`, defaultOpen)

    const handleOpen = () => setIsOpen(!isOpen)

    return (
        <Collapsible
            asChild
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuNavButton title={title} tooltip={tooltip} asChild>
                        <Link to={url}>
                            {Icon && <Icon />}
                            <span className="ml-2">{title}</span>
                        </Link>
                    </SidebarMenuNavButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                    <Link to={subItem.url}>
                                        <span className="ml-3">{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
                <SidebarMenuAction onClick={handleOpen}>
                    <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    <span className="sr-only">{title}</span>
                </SidebarMenuAction>
            </SidebarMenuItem>
        </Collapsible>
    )
}

export function DashboardNav() {
    return (
        <>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuNavButton
                        title="Chat"
                        tooltip="Chat"
                        asChild
                    >
                        <Link to="/chat">
                            <MessageCircleMore />
                            <span className="ml-2 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:opacity-0">Chat with AI</span>
                        </Link>
                    </SidebarMenuNavButton>
                </SidebarMenu>
            </SidebarGroup>
            {navs.map((nav, key) => (
                <SidebarGroup key={key}>
                    <SidebarGroupLabel className="transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:mt-0">{nav.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {nav.items.map((item) => (
                            <DashboardNavCollapsible key={item.title} {...item} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    )
}