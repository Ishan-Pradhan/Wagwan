import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import type { Post } from "../types/FeedTypes";
import PostCardImage from "./PostCardImage";
import { Link } from "react-router";
import { EllipsisIcon } from "lucide-react";
import {
  BookmarkSimpleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";
import { formatTime } from "utils/formatTime";
import { useComment } from "../hooks/useComment";
import { useEffect, useRef } from "react";
import CommentSection from "./CommentSection";
import Spinner from "@components/ui/Spinner";

interface CommentDialogProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

export default function CommentDialog({
  post,
  open,
  onClose,
}: CommentDialogProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useComment(post?._id as string); // TODO used as string here

  const comments =
    data?.pages?.flatMap((page) => {
      return page?.comments ?? [];
    }) ?? [];

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading comments</div>;
  }

  if (!post) return null;
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogHeader className="sr-only">
        <DialogTitle>Comments</DialogTitle>
        <DialogDescription>Comments Section</DialogDescription>
      </DialogHeader>

      <DialogContent
        className="
    w-full
    max-w-sm
    sm:max-w-lg
    lg:max-w-5xl
    xl:max-w-7xl
    grid grid-cols-1 lg:grid-cols-2 gap-6
  "
      >
        {/* Post content */}
        <div className="hidden lg:flex w-full flex-col gap-3">
          <PostCardImage images={post.images} />
        </div>
        {/* comment input */}
        <div className="flex flex-col gap-2">
          <div className=" justify-between items-center pb-4 border-b border-gray-300 lg:flex hidden">
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 rounded-full "
                src={post.author.account.avatar.url}
                alt="user avatar"
              />
              <Link to="" className="body-m-semibold">
                {post.author.account.username}
              </Link>
            </div>
            <EllipsisIcon size={24} className="cursor-pointer" />
          </div>
          <div className="lg:flex gap-4 hidden">
            <img
              className="w-10 h-10 rounded-full "
              src={post.author.account.avatar.url}
              alt="user avatar"
            />
            <p className={`body-s-regular`}>
              <Link to="" className="body-s-bold cursor-pointer inline">
                {post.author.account.username}&nbsp;
              </Link>
              {post.content}
            </p>
          </div>

          <div className="flex flex-col gap-8 xl:h-80 md:h-100 h-[70vh] overflow-y-auto py-4">
            {comments.length === 0 && (
              <div className="heading-2-medium  flex flex-col gap-1 items-center justify-center">
                <span> No Comments yet.</span>
                <span className="body-s-regular text-gray-400">
                  Start the conversation.
                </span>
              </div>
            )}
            {comments.map((comment) => {
              return <CommentSection key={comment._id} comment={comment} />;
            })}

            {hasNextPage && (
              <div ref={observerRef} className="h-10 flex justify-center">
                {isFetchingNextPage && <Spinner />}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 border-t py-2 border-gray-300">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <HeartIcon
                    size={28}
                    weight={post.isLiked ? "fill" : "regular"}
                    fill={post.isLiked ? "red" : ""}
                    stroke="2px"
                    className="hover:scale-105 cursor-pointer"
                  />

                  <ShareFatIcon
                    size={28}
                    className="hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
                  />
                </div>
                <BookmarkSimpleIcon
                  size={28}
                  className="hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="body-s-semibold self-start cursor-pointer"
                >
                  {post.likes} likes
                </button>
                <span className="body-s-regular text-gray-500">
                  {formatTime(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full px-2 py-1 border rounded"
              />
              <button className="px-3 py-1 text-primary-500  hover:text-primary-600">
                Post
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
