import api from "api/api";
import axios from "axios";

export const updatePhoto = async (formData: FormData) => {
  try {
    console.log(formData);
    const res = await api.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
    throw err;
  }
};
