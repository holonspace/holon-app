import { z } from "zod/v4"

export const emailSchema = z.object({
    email: z.email({ message: "error.email.invalid" })
})

export const signinSchema = emailSchema.extend({
    password: z.string().min(8, { message: "error.password.min" })
})

export const signUpSchema = emailSchema.extend({
    password: z.string().min(8, { message: "error.password.min" }),
    confirmPassword: z.string().min(1, { message: "error.confirmPassword.required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "error.confirmPassword.mismatch",
    path: ["confirmPassword"]
})

export type EmailFormData = z.infer<typeof emailSchema>
export type SignInFormData = z.infer<typeof signinSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
