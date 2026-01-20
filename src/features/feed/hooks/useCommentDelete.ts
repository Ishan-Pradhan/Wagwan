import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../api/deleteComment";

export const useCommentDelete = () =>
  useMutation({
    mutationFn: deleteComment,
  });
