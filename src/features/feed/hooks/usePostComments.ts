import { useMutation } from "@tanstack/react-query";
import { postComments } from "../api/postComments";
import toast from "react-hot-toast";

export const usePostComments = () => {
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: string }) =>
      postComments(postId, comment),
    onSuccess: () => {
      toast.success("Comment added");
    },
    onError: (err) => {
      console.error("Failed to add comment", err);
    },
  });
};
