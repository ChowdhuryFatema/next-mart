import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(2, { message: "Name must be at least 2 characters" }),
    
    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email address" }),

    password: z.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be at least 6 characters" }),

    confirmPassword: z.string({
        required_error: "Confirm Password is required",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
