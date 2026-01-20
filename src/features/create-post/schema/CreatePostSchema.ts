import z from "zod";
import { AddImageSchema } from "./AddImage";
import { AddContentSchema } from "./AddContent";

export const CreatePostSchema = AddImageSchema.extend(AddContentSchema.shape);

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
