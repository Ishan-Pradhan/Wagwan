import type { Author } from "./AuthorTypes";

export interface CommentDialogProps {
  postId: string;
  open: boolean;
  onClose: () => void;
}

export type CommentType = {
  comments: Comment;
  totalComments: number;
  limit: number;
  page: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type Comment = {
  _id: string;
  __v: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  likes: number;
  postId: string;
  author: Author;
};
