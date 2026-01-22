import api from "api/api";
import type { ImageItem } from "../CreatePost";

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
