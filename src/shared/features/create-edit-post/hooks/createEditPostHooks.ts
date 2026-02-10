import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/createEditPostApi";
import { updatePost } from "../api/createEditPostApi";
import { deleteImage } from "../api/createEditPostApi";
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
