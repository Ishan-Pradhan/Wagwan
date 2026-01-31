import { useMutation } from "@tanstack/react-query";
import { deletePosts } from "../api/deletePosts";

export const usePostDelete = () =>
  useMutation({
    mutationFn: deletePosts,
  });
