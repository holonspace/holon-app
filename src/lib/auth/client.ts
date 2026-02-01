

import { checkEmailClient, emailCooldownClient } from '@holon/auth-plugins/client'
import { onBoarding } from '@holon/auth-plugins/field'
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"


export const authClient = createAuthClient({
    basePath: "/api",
    baseURL: "http://localhost:8787",
    plugins: [
        //better auth
        emailOTPClient(),
        inferAdditionalFields({
            user: {
                onBoarding
            }
        }),
        // holon plugins
        checkEmailClient(),
        emailCooldownClient()
    ]
})

