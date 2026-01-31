import z from "zod";

export const AddContentSchema = (mode: "edit" | "create") =>
  z.object({
    content:
      mode === "create"
        ? z.string().min(6, { message: "content can't be empty" })
        : z.string().min(6, { message: "content can't be empty" }).optional(),
    tags:
      mode === "create"
        ? z
            .array(z.string().nonempty({ message: "tags can't be empty" }))
            .min(1, { message: "at least one tag is required" })
        : z
            .array(z.string().nonempty({ message: "tags can't be empty" }))
            .max(3, { message: "Maximum 3 tags only" })
            .optional(),
  });
export type AddContentInput = z.infer<typeof AddContentSchema>;
