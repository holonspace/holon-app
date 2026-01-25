import { z } from "zod/v4"

export const loginSchema = z.object({
    email: z.email({ message: "error.email.invalid" }),
    password: z.string().min(8, { message: "error.password.min" })
})

export const signUpSchema = z
    .object({
        email: z.email({ message: "error.email.invalid" }),
        password: z.string().min(8, { message: "error.password.min" }),
        confirmPassword: z.string().min(1, { message: "error.confirmPassword.required" })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "error.confirmPassword.mismatch",
        path: ["confirmPassword"]
    })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
