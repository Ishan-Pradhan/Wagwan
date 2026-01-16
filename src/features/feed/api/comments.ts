import type { CommentType } from "../types/CommentTypes";
import axios from "axios";

export const fetchComments = async ({
  postId,
  page = 1,
  limit = 10,
}: {
  postId: string | undefined;
  page: number;
  limit: number;
}): Promise<CommentType> => {
  const res = await axios.get(
    `http://localhost:8080/api/v1/social-media/comments/post/${postId}?page=${page}&limit=${limit}`
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
