import { otpSchema, SubmitButton, type OtpFormData } from "@/components/auth"
import { useOTP } from "@/components/auth/hook"
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp"
import type { AuthError } from "@/lib/auth"
import authApi from "@/lib/auth/api"
import { useNavigate } from "@/lib/hook"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircle, Pencil } from "lucide-react"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { mergeRefs } from "react-merge-refs"
import { useSearchParams } from "wouter"

export function OTPForm() {

    const otpRef = useRef<HTMLInputElement>(null)

    const { setLocation } = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get("email")

    const {
        setError,
        clearErrors,
        control,
        handleSubmit,
        formState: { errors, isSubmitted }
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email: email ?? ""
        },
    })

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: authApi.signIn.emailOtp,
        onSuccess: ({ user: { onBoarding } }) => {
            if (onBoarding) {
                setLocation("/onboarding")
            } else {
                setLocation("/dashboard")
            }
        },
        onError: (error: AuthError) => {
            setError("otp", {
                type: "custom",
                message: error.message
            })
        }
    })

    useEffect(() => {
        if (!email) {
            setLocation("/signin")
        }
    }, [email, setLocation])

    const navigateToSignIn = () => {
        setLocation(`/signin?email=${email}`)
    }

    const handleResend = () => {
        clearErrors()
        otpRef?.current?.focus()
    }

    return (
        <>
            {
                email ?
                    <div className="flex flex-col gap-6">
                        <form onSubmit={handleSubmit((data) => mutate(data))}>
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h1 className="text-2xl font-bold">Enter verification code</h1>
                                    <p className="text-muted-foreground text-sm text-balance">
                                        We sent a 6-digit code to your email
                                    </p>

                                </div>
                                <Field className="px-4">
                                    <InputGroup  >
                                        <InputGroupInput placeholder={email} readOnly />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Copy"
                                                title="Copy"
                                                size="icon-xs"
                                                onClick={navigateToSignIn}>
                                                <Pencil />
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field className="px-4">
                                    <FieldLabel htmlFor="otp" className="sr-only">
                                        Verification code
                                    </FieldLabel>
                                    <Controller
                                        control={control}
                                        name="otp"
                                        render={({ field: { ref, onChange, ...field } }) =>
                                            <InputOTP
                                                id="otp"
                                                ref={mergeRefs([otpRef, ref])}
                                                data-1p-ignore
                                                autoFocus
                                                maxLength={6}
                                                onChange={(value) => {
                                                    clearErrors('otp')
                                                    onChange(value)
                                                }}
                                                {...field}
                                            >
                                                <InputOTPGroup
                                                    data-error-type={errors.otp?.type}
                                                    className={cn(
                                                        "flex-1 justify-between *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:size-9 *:data-[slot=input-otp-slot]:text-lg ring-destructive/40",
                                                        "data-[error-type=custom]:ring-1 data-[error-type=custom]:ring-destructive/20 data-[error-type=custom]:dark:ring-destructive/40 data-[error-type=custom]:border-destructive"
                                                    )}>
                                                    {Array.from({ length: 6 }).map((_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            aria-invalid={isSubmitted && !!errors.otp && index >= (field.value?.length ?? 0)}
                                                        />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        }
                                    />
                                    {isError && <FieldError>{errors.otp?.message}</FieldError>}
                                </Field>
                                <SubmitButton loading={isSuccess || isPending} type="submit">Verify</SubmitButton>
                                <ResendButton email={email} onClick={handleResend} />
                            </FieldGroup>
                        </form >
                    </div >
                    :
                    <Loading />
            }
        </>
    )
}


function ResendButton({ email, onClick }: { email: string, onClick?: () => void }) {

    const hasSent = useRef<boolean>(false)
    const { countdown, setCountdown, loading, setLoading, sendOTP, autoSend } = useOTP()

    useEffect(() => {
        if (!hasSent.current) {
            hasSent.current = true
            if (autoSend) {
                sendOTP(email)
            } else {
                authApi.emailCooldown({ email })
                    .then(({ error }: any) => {
                        if (error?.status === 429 && typeof error?.cooldown === 'number') {
                            setCountdown(error.cooldown)
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    }, [email, autoSend])

    const handleResend = async () => {
        sendOTP(email)
        onClick?.()
    }

    return (
        <FieldDescription className="flex items-center justify-center">
            <span>
                Didn&apos;t receive the code?
            </span>
            <Button
                className={cn(
                    "underline text-muted-foreground flex items-center disabled:opacity-80",
                    countdown > 0 ? "cursor-not-allowed disabled:pointer-events-auto" : "hover:text-primary"
                )}
                type="button"
                variant="link"
                disabled={countdown > 0 || loading}
                onClick={handleResend}
            >
                {loading ? <LoaderCircle className="animate-spin" /> : <span>Resend {countdown > 0 && `(${countdown}s)`}</span>}
            </Button>
        </FieldDescription>
    )
}

