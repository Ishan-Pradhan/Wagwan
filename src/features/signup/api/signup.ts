import axios from "axios";
import type { SignUpFormInput } from "../schema/SignUpSchema";

export const signup = async (payload: SignUpFormInput) => {
  try {
    const res = await axios.post("/api/v1/users/register", payload);
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
