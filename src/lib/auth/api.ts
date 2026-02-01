import { authClient, type Session } from "@/lib/auth"

async function handleAuth<T>(
    promise: Promise<{ data: T; error: any }>
): Promise<T> {
    const { data, error } = await promise

    if (error) {
        throw error
    }
    return data as T
}

const signIn = {
    emailOtp: async (args: Parameters<typeof authClient.signIn.emailOtp>[0]) => {
        const data = await handleAuth(authClient.signIn.emailOtp(args))
        return data as { token: string, user: Session['user'] }
    }
}

const emailOtp = {
    sendVerificationOtp: async (args: Parameters<typeof authClient.emailOtp.sendVerificationOtp>[0]) => handleAuth(authClient.emailOtp.sendVerificationOtp(args))
}

const checkEmail = async (args: Parameters<typeof authClient.checkEmail>[0]) => handleAuth(authClient.checkEmail(args))

const emailCooldown = async (args: Parameters<typeof authClient.emailCooldown>[0]) => handleAuth(authClient.emailCooldown(args))


const authApi = {
    signIn,
    emailOtp,
    checkEmail,
    emailCooldown
}

export default authApi