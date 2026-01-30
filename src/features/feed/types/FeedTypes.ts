import type { Author } from "./AuthorTypes";

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

export type FeedType = {
  posts: Post[];
  totalPosts: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
};

export type FeedData = {
  pages: FeedType[];
};
