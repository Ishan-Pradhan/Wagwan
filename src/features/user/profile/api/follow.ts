import api from "api/api";
import axios from "axios";

export const follow = async (userId: string) => {
  try {
    const res = await api.post(`/social-media/follow/${userId}`, {});

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
  }
};
