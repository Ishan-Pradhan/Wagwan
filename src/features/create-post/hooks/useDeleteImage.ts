import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "../api/deleteImage";
import type { ImageItem } from "../CreatePost";

type DeleteImageVars = {
  image: Extract<ImageItem, { type: "existing" }>;
  postId: string;
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: ({ image, postId }: DeleteImageVars) => {
      return deleteImage(image, postId);
    },
  });
};
