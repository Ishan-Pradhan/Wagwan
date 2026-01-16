import axios from "axios";

export const likeComment = async (commentId: string | undefined) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/social-media/like/comment/${commentId}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (res.data) {
      console.log(res.data);
    }

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err;

      if (error.response?.data) {
        throw error.response.data;
      }
    }
  }
};
