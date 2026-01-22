import api from "api/api";
import axios from "axios";

export const updateProfile = async (formData: FormData) => {
  try {
    const res = await api.patch("/social-media/profile", formData);
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
    throw err;
  }
};
