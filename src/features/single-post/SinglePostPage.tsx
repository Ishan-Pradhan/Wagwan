import Spinner from "@components/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import CommentSection from "features/feed/components/CommentSection";
import InteractionContainer from "features/feed/components/InteractionContainer";
import PostCardImage from "features/feed/components/PostCardImage";
import { useComment } from "features/feed/hooks/useComment";
import { usePostComments } from "features/feed/hooks/usePostComments";
import { EllipsisIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { formatTime } from "utils/formatTime";
import { useGetSinglePost } from "./hooks/useGetSinglePost";
import LottieLoading from "@components/ui/LottieLoading";

function SinglePostPage() {
  const { postId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useComment(postId as string);

  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const { data: post } = useGetSinglePost(postId as string);

  console.log(post);

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
      { rootMargin: "200px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const postCommentMutation = usePostComments();

  const handlePostComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;

    postCommentMutation.mutate(
      { postId, comment },
      {
        onSuccess: () => {
          setNewComment("");

          // this is for refetching
          queryClient.invalidateQueries({ queryKey: ["comment", postId] });
        },
        onError: (err) => {
          console.error("Failed to post comment", err);
        },
      },
    );
  };

  if (!post) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <LottieLoading />
      </div>
    );
  }
  return (
    <div
      className="
    w-full
    max-w-sm
    sm:max-w-lg
    lg:max-w-3xl
    xl:max-w-7xl
    grid grid-cols-1 lg:grid-cols-2 gap-0
    p-0 lg:max-h-[80vh]
    overflow-hidden
    mt-10 px-10
  "
    >
      {/* image content */}
      <div className="hidden lg:flex w-full  h-[80vh] flex-col overflow-hidden">
        <PostCardImage images={post.images} />
      </div>

      {/* comment section */}
      <div className="flex flex-col gap-2 h-[80vh] overflow-auto p-5">
        <div className="justify-between items-center pb-4 border-b border-gray-300 lg:flex hidden">
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full "
              src={post?.author?.account.avatar.url}
              alt="user avatar"
            />
            <Link to="" className="body-m-semibold">
              {post?.author?.account.username}
            </Link>
          </div>
          <EllipsisIcon size={24} className="cursor-pointer" />
        </div>
        <div className="lg:flex gap-4 hidden">
          <img
            className="w-10 h-10 rounded-full "
            src={post?.author?.account.avatar.url}
            alt="user avatar"
          />
          <p className={`body-s-regular`}>
            <Link to="" className="body-s-bold cursor-pointer inline">
              {post?.author?.account.username}&nbsp;
            </Link>
            {post.content}
          </p>
        </div>

        <div className="flex flex-col gap-8 xl:h-80 md:h-100 h-full overflow-y-auto py-4 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {comments.length === 0 && (
                <div className="heading-2-medium  flex flex-col gap-1 items-center justify-center h-full">
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
                <div ref={observerRef} className="h-10 flex justify-center">
                  {isFetchingNextPage && <Spinner />}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 border-t py-2 border-gray-300 mt-auto">
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
              className="w-full px-2 py-1 border rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="px-3 py-1 text-primary-500 hover:text-primary-600 cursor-pointer flex-1 flex gap-2 items-center"
              onClick={() => handlePostComment(postId as string, newComment)}
            >
              <span>Post</span> {postCommentMutation.isPending && <Spinner />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
