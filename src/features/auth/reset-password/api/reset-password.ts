import api from "api/api";
import type { ResetPasswordPayload } from "features/auth/reset-password/types/ResetPasswordPayloadTypes";

export const resetPassword = async ({
  token,
  newPassword,
}: ResetPasswordPayload) => {
  const res = await api.post(
    `/users/reset-password/${token}`,
    { newPassword },
    { withCredentials: true },
  );
  return res.data;
};
