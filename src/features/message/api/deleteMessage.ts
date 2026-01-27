import api from "api/api";
import axios from "axios";

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
