import type { FeedType } from "../types/FeedTypes";
import axios from "axios";

export const fetchPosts = async ({
  page = 1,
  limit = 10,
}): Promise<FeedType> => {
  const res = await axios.get(
    `/api/v1/social-media/posts?page=${page}&limit=${limit}`
  );

  const data = res.data?.data;

  return {
    posts: data?.posts ?? [],
    totalPosts: data?.totalPosts ?? 0,
    limit: data?.limit ?? 10,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    hasNextPage: data?.hasNextPage ?? false,
    nextPage: data?.nextPage ?? null,
  };
};
