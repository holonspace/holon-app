import { DashboardSidebar, DashboardLayout } from "@/components/dashboard"
import { AgentPage } from "@/page/dashboard"
import { Route, Router } from "wouter"

export function DashboardPage() {
    return (
        <>
            <DashboardSidebar>
                <DashboardLayout>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video" />
                        <div className="bg-muted/50 aspect-video" />
                        <div className="bg-muted/50 aspect-video" />
                    </div>
                    <div className="bg-muted/50 min-h-screen flex-1 md:min-h-min" />
                </DashboardLayout>
            </DashboardSidebar>
            <Router base="/dashboard">
                <Route path="/agent" component={AgentPage} />
            </Router>
        </>
    )
}