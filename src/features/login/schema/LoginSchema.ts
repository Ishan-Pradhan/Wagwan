import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "username or email should not be empty" }),
  password: z.string().nonempty({ message: "password should not be empty" }),
});

export type LoginFormInput = z.infer<typeof LoginSchema>;
