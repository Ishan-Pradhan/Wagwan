import api from "api/api";
import axios from "axios";
import type { verificationResultPayload } from "types/VerificationResultPayloadTypes";

export const verificationResult = async ({
  token,
}: verificationResultPayload) => {
  try {
    const res = await api.get(`/users/verify-email/${token}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) throw err.response.data;
    }
    throw err;
  }
};
