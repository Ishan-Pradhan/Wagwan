import api from "api/api";
import axios from "axios";

export const deleteComment = async (commentId: string | undefined) => {
  try {
    const res = await api.delete(`/social-media/comments/${commentId}`);

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
