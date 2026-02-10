import api from "api/api";
import axios from "axios";

export const createChat = async (receiverId: string | undefined) => {
  try {
    const res = await api.post(`/chat-app/chats/c/${receiverId}`, {});
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err;

      if (error.response?.data) {
        throw error.response.data;
      }
    }
  }
};

export const deleteChat = async (chatId: string | undefined) => {
  try {
    const res = await api.delete(`/chat-app/chats/remove/${chatId}`, {});
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err;

      if (error.response?.data) {
        throw error.response.data;
      }
    }
  }
};

export const deleteMessage = async ({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}) => {
  try {
    const res = await api.delete(
      `/chat-app/messages/${chatId}/${messageId}`,
      {},
    );

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err;

      if (error.response?.data) {
        throw error.response.data;
      }
    }
  }
};

import type { ChatUserType } from "../types/ChatUserType";

export const getAvailableUsers = async (): Promise<ChatUserType[]> => {
  try {
    const res = await api.get("/chat-app/chats/users");
    const data = res.data?.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMessageInChat = async (chatId: string) => {
  try {
    const res = await api.get(`/chat-app/messages/${chatId}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

import type { Chat } from "../../../shared/features/message/types/ChatType";

export const getUsersList = async (): Promise<Chat[]> => {
  try {
    const res = await api.get("/chat-app/chats");
    const data = res.data?.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const sendMessage = async (
  chatId: string | undefined,
  formData: FormData,
) => {
  try {
    const res = await api.post(`/chat-app/messages/${chatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err;

      if (error.response?.data) {
        throw error.response.data;
      }
    }
  }
};
