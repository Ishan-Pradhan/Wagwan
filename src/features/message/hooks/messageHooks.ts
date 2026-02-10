import { useMutation } from "@tanstack/react-query";
import { createChat } from "../api/createChat";
import { deleteChat } from "../api/deleteChat";
import { sendMessage } from "../api/sendMessage";
import { deleteMessage } from "../api/deleteMessage";
import { useQuery } from "@tanstack/react-query";
import type { ChatUserType } from "../types/ChatUserType";
import { getAvailableUsers } from "../api/getAvailableUsers";
import { getMessageInChat } from "../api/getMessagesInChat";
import { getUsersList } from "../api/getUsersList";
import type { Chat } from "../../../shared/features/message/types/ChatType";

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (receiverId: string) => createChat(receiverId),
  });
};

export const useDeleteChat = () =>
  useMutation({
    mutationFn: deleteChat,
  });

export const useDeleteMessage = () =>
  useMutation({
    mutationFn: deleteMessage,
  });

export const useGetAvailableUsers = () => {
  return useQuery<ChatUserType[]>({
    queryKey: ["chatsUsers"],
    queryFn: () => getAvailableUsers(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

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

export const useGetUsersList = () => {
  return useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: () => getUsersList(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
  });
};

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
