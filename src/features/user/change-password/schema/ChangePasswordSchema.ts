import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old Password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*]/, "Must contain at least one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordFormInput = z.infer<typeof ChangePasswordSchema>;
export type ChangePasswordPayload = Omit<
  ChangePasswordFormInput,
  "confirmPassword"
>;
