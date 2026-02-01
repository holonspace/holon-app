import { SignInForm, SignUpForm } from '@/components/auth'
import { Card, CardContent } from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { Route, Switch } from 'wouter'


export default function AuthPage() {

    return (
        <Switch>
            <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-md">
                    <div className="flex flex-col gap-6">
                        <Card className="overflow-hidden p-0">
                            <CardContent className="grid p-0">
                                <Route path="/signin" component={SignInForm} />
                                <Route path="/signup" component={SignUpForm} />
                            </CardContent>
                        </Card>
                        <FieldDescription className="px-6 text-center">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </FieldDescription>
                    </div>
                </div>
            </div>
        </Switch>
    )
}


