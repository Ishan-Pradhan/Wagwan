import api from "api/api";

export const getSinglePost = async (postId: string | undefined) => {
  const res = await api.get(`/social-media/posts/${postId}`);
  return res.data.data;
};
