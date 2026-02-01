import { OAuth2Field, OauthSeparator } from "@/components/auth"
import { CredentialStep, EmailStep } from "@/components/auth/steps"
import type { Step } from "@/components/auth/types"
import { FieldGroup } from "@/components/ui/field"
import { useSearchParams } from "wouter"



export function SignInForm() {
    
    const [searchParams] = useSearchParams()
    const step = (searchParams.get("step") || "signin") as Step
    const email = searchParams.get("email")

    return (
        <div className="p-6 md:p-8" >
            <div className="flex flex-col items-center gap-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Holon Space</h1>
                <p className="text-muted-foreground text-balance">
                    登入或註冊
                </p>
            </div>
            <FieldGroup>
                {step === "credential" ? <CredentialStep email={email} /> : <EmailStep email={email} />}
                <OauthSeparator />
                <OAuth2Field />
            </FieldGroup>
        </div >
    )
}

