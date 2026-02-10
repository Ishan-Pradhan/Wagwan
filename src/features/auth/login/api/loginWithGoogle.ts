import api from "api/api";
import axios from "axios";

export const loginWithGoogle = async () => {
  try {
    const res = await api.get("/users/google");
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
