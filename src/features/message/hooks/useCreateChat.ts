import { useMutation } from "@tanstack/react-query";
import { createChat } from "../api/createChat";

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (receiverId: string) => createChat(receiverId),
  });
};
