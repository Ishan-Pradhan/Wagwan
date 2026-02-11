import api from "api/api";

export const forgotPassword = async (email: string) => {
  const res = await api.post("/users/forgot-password", { email });
  return res.data;
};
