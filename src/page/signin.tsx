import { SignInForm } from '@/components/auth'
import { Card, CardContent } from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { Route, Switch } from 'wouter'


export function SignInPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 gap-4">
            <div className="w-full max-w-sm md:max-w-md">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0">
                            {/* 使用 Switch 來處理子路由，路徑需包含完整父路徑或使用相對路徑 */}
                            <Switch>
                                <Route path="/signin/authentication" component={SignInForm} />
                                {/* 默認顯示 SignInForm */}
                                <Route path="/signin" component={SignInForm} />
                                {/* 如果以上都沒匹配到，也可以放一個回退 */}
                                <Route component={SignInForm} />
                            </Switch>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}


