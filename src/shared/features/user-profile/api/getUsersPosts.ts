import api from "api/api";
import type { PostType } from "../types/PostTypes";

export const getUsersPosts = async ({
  page = 1,
  limit = 10,
  username,
}: {
  page: number;
  limit: number;
  username: string;
}): Promise<PostType> => {
  const res = await api.get(
    `/social-media/posts/get/u/${username}?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    posts: data?.posts ?? [],
    totalPosts: data?.totalPosts ?? 0,
    limit: data?.limit ?? 10,
    totalPages: data?.totalPages ?? 1,
    page: data?.page ?? 1,
    serialNumberStartFrom: data?.serialNumberStartFrom ?? 1,
    hasPrevPage: data?.hasPrevPage ?? false,
    hasNextPage: data?.hasNextPage ?? false,
    prevPage: data?.prevPage ?? null,
    nextPage: data?.nextPage ?? null,
  };
};
