import api from "api/api";
import axios from "axios";

export const postComments = async (
  postId: string | undefined,
  content: string,
) => {
  try {
    const res = await api.post(`/social-media/comments/post/${postId}`, {
      content,
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
