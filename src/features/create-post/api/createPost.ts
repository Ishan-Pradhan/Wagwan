import api from "api/api";
import axios from "axios";

export const createPost = async (formData: FormData) => {
  try {
    const res = await api.post("/social-media/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
  }
};
