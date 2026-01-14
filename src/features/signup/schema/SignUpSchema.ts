import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),

    email: z.email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*]/, "Must contain at least one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormInput = z.infer<typeof SignUpSchema>;
export type SignUpPayload = Omit<SignUpFormInput, "confirmPassword">;
