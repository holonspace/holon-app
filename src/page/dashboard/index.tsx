import Agent from "@/page/dashboard/agent"
import { Link, Route, Router } from "wouter"


export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Link href="/agent">Agent</Link>
            <Router base="/dashboard">
                <Route path="/agent" component={Agent} />
            </Router>
        </>
    )
}