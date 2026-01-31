import api from "api/api";

export const getUsersProfile = async (username: string | undefined) => {
  const res = await api.get(`/social-media/profile/u/${username}`);

  const data = res.data?.data;

  return data;
};
