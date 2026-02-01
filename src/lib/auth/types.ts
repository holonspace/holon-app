
import { authClient } from "@/lib/auth/client"
import type { BASE_ERROR_CODES } from "better-auth"


type Session = typeof authClient.$Infer.Session

type AuthErrorCode = typeof BASE_ERROR_CODES

class AuthError extends Error {
    code: AuthErrorCode
    constructor(message: string, code: AuthErrorCode) {
        super(message)
        this.code = code
    }
}

export {
    AuthError, type AuthErrorCode, type Session
}

