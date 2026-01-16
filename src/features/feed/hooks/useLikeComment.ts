import { useMutation } from "@tanstack/react-query";
import { likeComment } from "../api/likeComment";

export const useLikeComment = () =>
  useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
  });
