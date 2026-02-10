import api from "api/api";

export const deletePosts = async (postId: string | undefined) => {
  const res = await api.delete(`/social-media/posts/${postId}`);
  return res.data;
};
