import api from "api/api";
import type { ChatUserType } from "../types/ChatUserType";

export const getAvailableUsers = async (): Promise<ChatUserType[]> => {
  try {
    const res = await api.get("/chat-app/chats/users");
    const data = res.data?.data;
    console.log("🚀 ~ getAvailableUsers ~ data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
