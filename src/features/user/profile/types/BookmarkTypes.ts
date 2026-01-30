import type { Post } from "./PostTypes";

export interface BookmarkType {
  bookmarkedPosts: Post[];
  totalBookmarkedPosts: number;
  limit: number;
  page: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}
