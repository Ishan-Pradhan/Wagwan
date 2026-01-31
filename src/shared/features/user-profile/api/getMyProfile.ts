import api from "api/api";

export const getMyProfile = async () => {
  const res = await api.get(`/social-media/profile`);

  const data = res.data?.data;

  return data;
};
