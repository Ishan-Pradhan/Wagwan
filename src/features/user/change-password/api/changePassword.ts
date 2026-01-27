import api from "api/api";

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  const res = await api.post("/users/change-password", {
    oldPassword,
    newPassword,
  });

  return res;
};
