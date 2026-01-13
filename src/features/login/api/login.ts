import axios from "axios";
import type { LoginFormInput } from "../schema/LoginSchema";

export const login = async (payload: LoginFormInput) => {
  try {
    const res = await axios.post("/api/v1/users/login", payload);
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
