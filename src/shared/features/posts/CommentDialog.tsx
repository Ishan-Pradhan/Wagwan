import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import PostCardImage from "./PostCardImage";
import { Link } from "react-router";

import { formatTime } from "utils/formatTime";
import { useEffect, useRef, useState } from "react";
import CommentSection from "./CommentSection";
import Spinner from "@components/custom-ui/Spinner";
import InteractionContainer from "./InteractionContainer";
import { useQueryClient } from "@tanstack/react-query";
import type { CommentDialogProps } from "shared/features/posts/types/CommentTypes";
import { useComment } from "./hooks/useComment";
import type { Post } from "./types/FeedTypes";
import { usePostComments } from "./hooks/usePostComments";
import PostMenu from "../post-menu/PostMenu";
import { INFINITE_SCROLL_MARGIN } from "constants/consts";

export default function CommentDialog({
  postId,
  open,
  onClose,
}: CommentDialogProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useComment(postId);

  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const post = queryClient
    .getQueryData<{ pages: { posts: Post[] }[] }>(["feed"])
    ?.pages.flatMap((p) => p.posts)
    .find((p) => p._id === postId);

  const comments =
    data?.pages?.flatMap((page) => {
      return page?.comments ?? [];
    }) ?? [];

  const postCommentMutation = usePostComments();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: INFINITE_SCROLL_MARGIN },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePostComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;

    postCommentMutation.mutate(
      { postId, comment },
      {
        onSuccess: () => {
          setNewComment("");
          queryClient.invalidateQueries({ queryKey: ["comment", postId] });
          queryClient.invalidateQueries({ queryKey: ["posts", postId] });
          queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
        onError: (err) => {
          console.error("Failed to post comment", err);
        },
      },
    );
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogHeader className="sr-only">
        <DialogTitle>Comments</DialogTitle>
        <DialogDescription>Comments Section</DialogDescription>
      </DialogHeader>

      <DialogContent className="grid w-full max-w-sm grid-cols-1 gap-0 overflow-hidden p-0 sm:max-w-lg lg:max-h-[80vh] lg:max-w-3xl lg:grid-cols-2 xl:max-w-7xl">
        {/* image content */}
        <div className="hidden h-[80vh] w-full flex-col overflow-hidden lg:flex">
          <PostCardImage images={post.images} />
        </div>

        {/* comment section */}
        <div className="flex h-[80vh] flex-col gap-2 overflow-auto p-5">
          <div className="hidden items-center justify-between border-b border-gray-300 pb-4 lg:flex">
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-10 rounded-full"
                src={post.author?.account.avatar.url}
                alt="user avatar"
              />
              <Link to="" className="body-m-semibold">
                {post.author?.account?.username}
              </Link>
            </div>
            <PostMenu post={post} />{" "}
          </div>
          <div className="hidden gap-4 lg:flex">
            <img
              className="h-10 w-10 rounded-full"
              src={post.author?.account.avatar.url}
              alt="user avatar"
            />
            <p className={`body-s-regular`}>
              <Link to="" className="body-s-bold inline cursor-pointer">
                {post.author?.account.username}&nbsp;
              </Link>
              {post.content}
            </p>
          </div>

          <div className="relative flex h-full flex-col gap-8 overflow-y-auto py-4 md:h-100 xl:h-80">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {comments.length === 0 && (
                  <div className="heading-2-medium flex h-full flex-col items-center justify-center gap-1">
                    <span> No Comments yet.</span>
                    <span className="body-s-regular text-gray-400">
                      Start the conversation.
                    </span>
                  </div>
                )}
                {comments.map((comment) => {
                  return (
                    <CommentSection
                      key={comment._id}
                      comment={comment}
                      post={post}
                    />
                  );
                })}

                {hasNextPage && (
                  <div ref={observerRef} className="flex h-10 justify-center">
                    {isFetchingNextPage && <Spinner />}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mt-auto flex flex-col gap-4 border-t border-gray-300 py-2">
            <div className="flex flex-col gap-2">
              <InteractionContainer
                post={post}
                hideComment={true}
                onOpenComments={() => {}}
              />

              <div className="flex flex-col gap-1">
                <span className="body-s-regular text-gray-500">
                  {formatTime(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full rounded border px-2 py-1"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePostComment(postId, newComment);
                }}
              />
              <button
                className="text-primary-500 hover:text-primary-600 flex flex-1 cursor-pointer items-center gap-2 px-3 py-1"
                onClick={() => handlePostComment(postId, newComment)}
              >
                <span>Post</span> {postCommentMutation.isPending && <Spinner />}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
