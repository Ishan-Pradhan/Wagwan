import api from "api/api";
import axios from "axios";
import type { CommentType } from "../types/CommentTypes";

export const bookmarkPost = async (postId: string | undefined) => {
  try {
    const res = await api.post(`/social-media/bookmarks/${postId}`, {});

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

export const fetchComments = async ({
  postId,
  page = 1,
  limit = 10,
}: {
  postId: string | undefined;
  page: number;
  limit: number;
}): Promise<CommentType> => {
  const res = await api.get(
    `/social-media/comments/post/${postId}?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    comments: data?.comments ?? [],
    totalComments: data?.totalComments ?? 0,
    limit: data?.limit ?? 10,
    page: data?.page ?? 1,
    serialNumberStartFrom: data?.serialNumberStartFrom ?? 1,
    hasPrevPage: data?.hasPrevPage ?? false,
    hasNextPage: data?.hasNextPage ?? false,
    prevPage: data?.prevPage ?? null,
    nextPage: data?.nextPage ?? null,
  };
};

export const deleteComment = async (commentId: string | undefined) => {
  try {
    const res = await api.delete(`/social-media/comments/${commentId}`);

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

export const likePost = async (postId: string | undefined) => {
  try {
    const res = await api.post(`/social-media/like/post/${postId}`, {});

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

export const likeComment = async (commentId: string | undefined) => {
  try {
    const res = await api.post(`/social-media/like/comment/${commentId}`, {});

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

export const postComments = async (
  postId: string | undefined,
  content: string,
) => {
  try {
    const res = await api.post(`/social-media/comments/post/${postId}`, {
      content,
    });
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
