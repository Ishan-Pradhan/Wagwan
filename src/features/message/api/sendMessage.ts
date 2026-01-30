import api from "api/api";
import axios from "axios";

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
