import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment } from "../api/likeComment";

export const useLikeComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", postId],
      });
    },
  });
};
