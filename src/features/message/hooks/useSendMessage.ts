import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/sendMessage";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      sendMessage(chatId, content),
  });
};
