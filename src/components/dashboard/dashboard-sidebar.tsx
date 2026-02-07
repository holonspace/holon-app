import { AuthAvatar, AuthMenu } from "@/components/auth"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"
import { useLocalStorage } from "@uidotdev/usehooks"
import { ChevronsUpDown } from "lucide-react"
import React from "react"
import { Link, useLocation } from "react-router"


interface DashboardSidebarProps {
    children?: React.ReactNode
}

export function DashboardSidebar({ children }: DashboardSidebarProps) {
    const [open, setOpen] = useLocalStorage('dashboard-sidebar-open', true)
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
    return (
        <SidebarProvider open={open} onOpenChange={setOpen} >
            <Sidebar collapsible="icon" variant="inset" className="p-0">
                <SidebarHeader />
                <SidebarContent>
                    <DashboardNav />
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <AuthMenu>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <AuthAvatar />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{"user.name"}</span>
                                        <span className="truncate text-xs">{"user.email"}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </AuthMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail/>
            </Sidebar>
            <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0!">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/50">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {pathnames.map((value, index) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem className="hidden md:block">
                                            {pathnames.length - 1 === index ? (
                                                <BreadcrumbPage >
                                                    {renderBreadcrumbValue(value)}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>
                                                        {renderBreadcrumbValue(value)}
                                                    </Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {index !== pathnames.length - 1 && (
                                            <BreadcrumbSeparator />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

function renderBreadcrumbValue(value: string) {
    // 首字母大寫
    return value.charAt(0).toUpperCase() + value.slice(1)
}