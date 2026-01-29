import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    basePath:"/api",
    baseURL: "https://auth.holonspace.com" 
})

export default function BetterAuth() {

    const signup = async () => {
        const res = await authClient.signIn.email({
            email: "test@user.com",
            password: "password1234"
        }  )
        console.log(res)
    }

    return (
        <div>
            <h1>
                <button onClick={signup}>
        
                    signup
                </button>
            </h1>
        </div>
    )
}