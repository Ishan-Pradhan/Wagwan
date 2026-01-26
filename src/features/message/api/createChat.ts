import api from "api/api";
import axios from "axios";

export const createChat = async (receiverId: string | undefined) => {
  try {
    const res = await api.post(`/chat-app/chats/c/${receiverId}`, {});

    if (res.data) {
      console.log(res.data);
    }

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
