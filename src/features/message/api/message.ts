import api from "api/api";
import type { ChatUserType } from "../types/ChatUserType";
import type { Chat } from "../../../shared/features/message/types/ChatType";

export const createChat = async (receiverId: string | undefined) => {
  const res = await api.post(`/chat-app/chats/c/${receiverId}`, {});
  return res.data;
};

export const deleteChat = async (chatId: string | undefined) => {
  const res = await api.delete(`/chat-app/chats/remove/${chatId}`, {});
  return res;
};

export const deleteMessage = async ({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}) => {
  const res = await api.delete(`/chat-app/messages/${chatId}/${messageId}`, {});
  return res;
};

export const getAvailableUsers = async (): Promise<ChatUserType[]> => {
  const res = await api.get("/chat-app/chats/users");
  const data = res.data?.data;
  return data;
};

export const getMessageInChat = async (chatId: string) => {
  const res = await api.get(`/chat-app/messages/${chatId}`);
  return res.data.data;
};

export const getUsersList = async (): Promise<Chat[]> => {
  const res = await api.get("/chat-app/chats");
  const data = res.data?.data;
  return data;
};

export const sendMessageApi = async (
  chatId: string | undefined,
  formData: FormData,
) => {
  const res = await api.post(`/chat-app/messages/${chatId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
