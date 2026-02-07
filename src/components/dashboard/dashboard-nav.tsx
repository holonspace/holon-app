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
    Wrench,
    type LucideIcon
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
    children?: React.ReactNode
    title: string
    tooltip?: string
    url: string
    icon: LucideIcon | React.ComponentType
    items?: NavSubItem[]
}

function DashboardNavCollapsible({
    children,
    defaultOpen = false,
    title,
    tooltip,
    url,
    icon,
    items
}: DashboardNavCollapsibleProps) {

    const [isOpen, setIsOpen] = useLocalStorage(`dashboard-nav-collapsible-${url}`, defaultOpen)

    return (
        <Collapsible
            asChild
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuNavButton title={title} tooltip={tooltip} icon={icon} url={url}>
                        {children}
                    </SidebarMenuNavButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                    <Link to={subItem.url}>
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
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
                        icon={MessageCircleMore}
                        url="/chat"
                    >
                        <span>Chat with AI</span>
                    </SidebarMenuNavButton>
                </SidebarMenu>
            </SidebarGroup>
            {navs.map((nav) => (
                <SidebarGroup key={nav.label}>
                    <SidebarGroupLabel>{nav.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {nav.items.map((item) => (
                            <DashboardNavCollapsible
                                key={item.title}
                                title={item.title}
                                tooltip={item.title}
                                icon={item.icon}
                                url={item.url}
                                items={item.items}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </div>
                            </DashboardNavCollapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    )
}