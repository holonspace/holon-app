import { z } from "zod/v4"

export const emailSchema = z
    .object({
        email: z.email({ message: "error.email.invalid" })
    })

export const signInSchema = z
    .object({
        ...emailSchema.shape,
        password: z.string().min(8, { message: "error.password.min" })
    })

export const signUpSchema = z
    .object({
        ...emailSchema.shape,
        password: z.string().min(8, { message: "error.password.min" }),
        confirmPassword: z.string().min(1, { message: "error.confirmPassword.required" })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "error.confirmPassword.mismatch",
        path: ["confirmPassword"]
    })


export const otpSchema = z.object({
    ...emailSchema.shape,
    otp: z.string().length(6, { message: "error.otp.length" })
})

export type EmailFormData = z.infer<typeof emailSchema>
export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type OtpFormData = z.infer<typeof otpSchema>
