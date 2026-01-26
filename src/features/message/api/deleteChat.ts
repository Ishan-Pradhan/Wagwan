import api from "api/api";
import axios from "axios";

export const deleteChat = async (chatId: string | undefined) => {
  try {
    const res = await api.delete(`/chat-app/chats/remove/${chatId}`, {});

    if (res.data) {
      console.log(res.data);
    }

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
