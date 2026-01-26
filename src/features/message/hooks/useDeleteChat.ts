import { useMutation } from "@tanstack/react-query";
import { deleteChat } from "../api/deleteChat";

export const useDeleteChat = () =>
  useMutation({
    mutationFn: deleteChat,
  });
