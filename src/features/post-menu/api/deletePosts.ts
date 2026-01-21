import api from "api/api";
import axios from "axios";

export const deletePosts = async (postId: string | undefined) => {
  try {
    const res = await api.delete(`/social-media/posts/${postId}`);

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
