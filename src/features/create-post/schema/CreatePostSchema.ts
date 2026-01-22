import z from "zod";
import { AddImageSchema } from "./AddImage";
import { AddContentSchema } from "./AddContent";

export const CreatePostSchema = (mode: "edit" | "create") =>
  AddImageSchema(mode).extend(AddContentSchema(mode).shape);

export type CreatePostInput = z.infer<ReturnType<typeof CreatePostSchema>>;
