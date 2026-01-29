import { SignInForm, SignUpForm } from "@/components/auth"
import { VerifyForm } from "@/components/auth/verify-form"
import { Card, CardContent } from "@/components/ui/card"
import { FieldDescription } from "@/components/ui/field"
import { Route, Switch, useLocation } from "wouter"


export default function AuthPage() {

    const [location] = useLocation()

    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 gap-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0">
                            <Switch>
                                <Route path="/auth/signin" component={SignInForm} />
                                <Route path="/auth/verify" component={VerifyForm} />
                                <Route path="/auth/signup" component={SignUpForm} />
                            </Switch>
                        </CardContent>
                    </Card>
                   {location !== "/auth/verify" && <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </FieldDescription>}
                </div>
            </div>
        </div>
    )
}

