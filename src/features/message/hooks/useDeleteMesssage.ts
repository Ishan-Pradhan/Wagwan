import { useMutation } from "@tanstack/react-query";
import { deleteMessage } from "../api/deleteMessage";

export const useDeleteMessage = () =>
  useMutation({
    mutationFn: deleteMessage,
  });
