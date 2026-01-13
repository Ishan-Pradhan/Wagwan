import axios from "axios";

export const forgotPassword = async (email: string) => {
  try {
    const res = await axios.post("/api/v1/users/forgot-password", { email });
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
