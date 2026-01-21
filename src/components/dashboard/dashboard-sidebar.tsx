import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardSidebarProps {
    children?: React.ReactNode
}

export function DashboardSidebar({ children }: DashboardSidebarProps) {
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/50">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}