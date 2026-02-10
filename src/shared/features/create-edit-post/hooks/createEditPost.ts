import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/createEditPost";
import { updatePost } from "../api/createEditPost";
import { deleteImage } from "../api/createEditPost";
import type { DeleteImageVars } from "../types/CreatePostTypes";

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
  });

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: ({ image, postId }: DeleteImageVars) => {
      return deleteImage(image, postId);
    },
  });
};

export const useUpdatePost = (postId?: string) => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      if (!postId) throw new Error("postId is required for updating a post");
      return updatePost(postId, formData);
    },
  });
};
