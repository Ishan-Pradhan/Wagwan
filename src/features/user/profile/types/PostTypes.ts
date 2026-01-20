import type { Author } from "features/feed/types/AuthorTypes";

export type Post = {
  __v: number;
  _id: string;
  author: Author;
  comments: number;
  content: string;
  createdAt: string;
  images: {
    _id: string;
    localPath: string;
    url: string;
  }[];
  isBookmarked: boolean;
  isLiked: boolean;
  likes: number;
  tags: string[];
  updatedAt: string;
};

export type PostType = {
  posts: Post[];
  totalPosts: number;
  limit: number;
  page: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
};
