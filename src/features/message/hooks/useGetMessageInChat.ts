import { useQuery } from "@tanstack/react-query";
import { getMessageInChat } from "../api/getMessagesInChat";

export const useGetMessageInChat = (chatId?: string) => {
  return useQuery({
    queryKey: ["chat_messages", chatId],
    queryFn: ({ queryKey }) => {
      const [, chatId] = queryKey as [string, string];
      return getMessageInChat(chatId);
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
