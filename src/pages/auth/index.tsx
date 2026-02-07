import Onboarding from "@/pages/auth/onboarding"
import Otp from "@/pages/auth/otp"
import SignIn from "@/pages/auth/signin"
import { Route } from "react-router"


export default function AuthRoute() {
    return (
        <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/onboarding" element={<Onboarding />} />
        </>
    )
}