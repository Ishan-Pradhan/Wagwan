import axios from "axios";

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const resetPassword = async ({
  token,
  newPassword,
}: ResetPasswordPayload) => {
  try {
    const res = await axios.post(
      `/api/v1/users/reset-password/${token}`,
      { newPassword },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) throw err.response.data;
    }
    throw err;
  }
};
