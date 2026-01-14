import axios from "axios";

interface verificationResultPayload {
  token: string;
}

export const verificationResult = async ({
  token,
}: verificationResultPayload) => {
  try {
    const res = await axios.get(`/api/v1/users/verify-email/${token}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) throw err.response.data;
    }
    throw err;
  }
};
