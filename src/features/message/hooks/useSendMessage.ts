import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/sendMessage";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({
      chatId,
      formData,
    }: {
      chatId: string;
      formData: FormData;
    }) => sendMessage(chatId, formData),
  });
};
