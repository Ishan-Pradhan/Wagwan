import api from "api/api";
import type { BookmarkType } from "../../../../features/user/profile/types/BookmarkTypes";

export const getBookmarks = async ({
  page = 1,
  limit = 10,
}): Promise<BookmarkType> => {
  const res = await api.get(
    `/social-media/bookmarks?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    bookmarkedPosts: data?.bookmarkedPosts ?? [],
    totalBookmarkedPosts: data?.totalBookmarkedPosts ?? 0,
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
