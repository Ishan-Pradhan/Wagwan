import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "../api/deleteImage";
import type { DeleteImageVars } from "../types/CreatePostTypes";

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: ({ image, postId }: DeleteImageVars) => {
      return deleteImage(image, postId);
    },
  });
};
