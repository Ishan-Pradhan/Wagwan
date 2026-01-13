import z from "zod";

export const LoginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormInput = z.infer<typeof LoginSchema>;
