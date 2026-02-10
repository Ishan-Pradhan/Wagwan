import api from "api/api";

export const updatePhoto = async (formData: FormData) => {
  const res = await api.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const updateProfile = async (formData: FormData) => {
  const res = await api.patch("/social-media/profile", formData);
  return res.data.data;
};
