import { DashboardSidebar } from "@/components/dashboard"
import { CircleLoading } from "@/components/loading"
import { Suspense } from "react"
import { Outlet, useLocation } from "react-router"



export default function DashboardLayout() {
    const location = useLocation()
    return (
        <DashboardSidebar>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Suspense fallback={<CircleLoading />} key={location.pathname}>
                    <Outlet />
                </Suspense>
            </div>
        </DashboardSidebar >
    )
}
