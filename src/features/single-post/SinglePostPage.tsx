import Spinner from "@components/custom-ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useComment } from "shared/features/posts/hooks/useComment";
import { usePostComments } from "shared/features/posts/hooks/usePostComments";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { formatTime } from "utils/formatTime";
import { useGetSinglePost } from "./hooks/useGetSinglePost";
import SkeletonLoading from "./components/SkeletonLoading";
import PostCardImage from "shared/features/posts/PostCardImage";
import CommentSection from "shared/features/posts/CommentSection";
import InteractionContainer from "shared/features/posts/InteractionContainer";
import PostMenu from "shared/features/post-menu/PostMenu";

function SinglePostPage() {
  const { postId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useComment(postId as string);

  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const { data: post } = useGetSinglePost(postId as string);

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
    return <SkeletonLoading />;
  }
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-0 overflow-hidden p-0 pb-10 lg:mt-10 lg:grid-cols-2 lg:px-10 lg:pb-0">
      {/* image content */}
      <div className="h-[80vh] w-full flex-col justify-center overflow-hidden lg:flex">
        <PostCardImage images={post.images} />
      </div>

      {/* comment section */}
      <div className="flex flex-col justify-center gap-2 overflow-auto p-5">
        <div className="hidden items-center justify-between border-b border-gray-300 pb-4 lg:flex">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full"
              src={post?.author?.account.avatar.url}
              alt="user avatar"
            />
            <Link
              to={`/user/profile/${post.author.account.username}`}
              className="body-m-semibold"
            >
              {post?.author?.account.username}
            </Link>
          </div>
          <PostMenu post={post} />
        </div>
        <div className="hidden gap-4 lg:flex">
          <img
            className="h-10 w-10 rounded-full"
            src={post?.author?.account.avatar.url}
            alt="user avatar"
          />
          <p className={`body-s-regular`}>
            <Link
              to={`/user/profile/${post.author.account.username}`}
              className="body-s-bold inline cursor-pointer"
            >
              {post?.author?.account.username}&nbsp;
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
            />
            <button
              className="text-primary-500 hover:text-primary-600 flex flex-1 cursor-pointer items-center gap-2 px-3 py-1"
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
