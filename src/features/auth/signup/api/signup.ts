import type { SignUpFormInput } from "../schema/SignUpSchema";
import api from "api/api";

export const signup = async (payload: SignUpFormInput) => {
  const res = await api.post("/users/register", payload);
  return res.data;
};
