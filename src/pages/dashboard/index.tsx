import { use } from "react"



const postsPromise = fetch("https://jsonplaceholder.typicode.com/posts").then(res => new Promise((resolve) => setTimeout(() => resolve(res.json()), 5000)))

export default function DashboardPage() {
    const data = use(postsPromise) as any
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {data.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}


