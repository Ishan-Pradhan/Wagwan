import api from "api/api";
import axios from "axios";
import type { ImageItem } from "../types/CreatePostTypes";

export const createPost = async (formData: FormData) => {
  try {
    const res = await api.post("/social-media/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
  }
};

export const deleteImage = async (image: ImageItem, postId: string) => {
  if (image.type !== "existing") return;
  try {
    const res = await api.patch(
      `/social-media/posts/remove/image/${postId}/${image._id}`,
    );

    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async (postId: string, formData: FormData) => {
  try {
    const res = await api.patch(`/social-media/posts/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
    throw err;
  }
};
