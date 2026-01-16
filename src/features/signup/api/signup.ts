import axios from "axios";
import type { SignUpFormInput } from "../schema/SignUpSchema";
import api from "api/api";

export const signup = async (payload: SignUpFormInput) => {
  try {
    const res = await api.post("/users/register", payload);
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
