import api from "api/api";
import type { ImageItem } from "../types/CreatePostTypes";

export const createPost = async (formData: FormData) => {
  const res = await api.post("/social-media/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteImage = async (image: ImageItem, postId: string) => {
  if (image.type !== "existing") return;

  const res = await api.patch(
    `/social-media/posts/remove/image/${postId}/${image._id}`,
  );

  return res.data.data;
};

export const updatePost = async (postId: string, formData: FormData) => {
  const res = await api.patch(`/social-media/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
