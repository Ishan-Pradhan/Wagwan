import api from "api/api";
import axios from "axios";

export const updatePost = async (postId: string, formData: FormData) => {
  try {
    const res = await api.patch(`/social-media/posts/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
    throw err;
  }
};
