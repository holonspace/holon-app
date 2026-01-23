import { LoginForm, SignUpForm } from '@/components/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Route } from 'wouter'


export function AuthRoute() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-md">
                <div className={"flex flex-col gap-6"}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0">
                            <Route path="/signin" component={LoginForm} />
                            <Route path="/signup" component={SignUpForm} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


