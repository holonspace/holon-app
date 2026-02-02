import { OTPForm } from "@/components/auth/form"

export default function OTPPage() {
    return (
        <div className="flex min-h-svh w-full">
            <div className="flex w-full items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    <OTPForm />
                </div>
            </div>
        </div>
    )
}