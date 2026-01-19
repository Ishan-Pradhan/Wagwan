import z from "zod";

export const AddContentSchema = z.object({
  content: z.string().min(6, { message: "content can't be empty" }),
  tags: z
    .array(z.string().nonempty({ message: "tags can't be empty" }))
    .min(1, { message: "at least one tag is required" }),
});
export type AddContentInput = z.infer<typeof AddContentSchema>;
