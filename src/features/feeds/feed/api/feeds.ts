import api from "api/api";
import type { FeedType } from "../../../../shared/features/posts/types/FeedTypes";

export const fetchPosts = async ({
  page = 1,
  limit = 10,
}): Promise<FeedType> => {
  const res = await api.get(`/social-media/posts?page=${page}&limit=${limit}`);

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
