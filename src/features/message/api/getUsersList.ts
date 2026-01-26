import api from "api/api";
import type { Chat } from "../types/ChatType";

export const getUsersList = async (): Promise<Chat[]> => {
  try {
    const res = await api.get("/chat-app/chats");
    const data = res.data?.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
