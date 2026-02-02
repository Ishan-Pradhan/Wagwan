import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../api/updatePost";

export const useUpdatePost = (postId?: string) => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      if (!postId) throw new Error("postId is required for updating a post");
      return updatePost(postId, formData);
    },
  });
};
