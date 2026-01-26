import api from "api/api";

export const getMessageInChat = async (chatId: string) => {
  try {
    const res = await api.get(`/chat-app/messages/${chatId}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
