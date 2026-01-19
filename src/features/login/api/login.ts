import axios from "axios";
import type { LoginFormInput } from "../schema/LoginSchema";
import api from "api/api";

// FIXME when login with email and password current user comes blank , so we need to reload the page to see the current user
//Fixed
export const login = async (payload: LoginFormInput) => {
  try {
    const res = await api.post("/users/login", payload);

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
