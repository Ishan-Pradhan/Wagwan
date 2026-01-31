import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/createPost";

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
  });
