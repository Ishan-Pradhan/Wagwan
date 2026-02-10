import api from "api/api";
import axios from "axios";
import type { ResetPasswordPayload } from "features/auth/reset-password/types/ResetPasswordPayloadTypes";

export const resetPassword = async ({
  token,
  newPassword,
}: ResetPasswordPayload) => {
  try {
    const res = await api.post(
      `/users/reset-password/${token}`,
      { newPassword },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) throw err.response.data;
    }
    throw err;
  }
};
