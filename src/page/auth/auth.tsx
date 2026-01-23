import { SignInPage } from '@/page/auth'
import { Route } from 'wouter'



export function AuthRoute() {
    return (
        <div>
            layout
            <Route path="/signin" component={SignInPage} />
        </div>
    )
}


