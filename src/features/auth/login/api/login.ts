import type { LoginFormInput } from "../schema/LoginSchema";
import api from "api/api";

export const login = async (payload: LoginFormInput) => {
  const res = await api.post("/users/login", payload);
  return res.data;
};
