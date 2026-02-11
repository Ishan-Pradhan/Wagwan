import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "context/Theme/ThemeContext";
import type { FeedData, Post } from "./types/FeedTypes";
import { useLike } from "./hooks/post";
import { handleShare } from "utils/handleShare";
import { bookmarkPost } from "./api/post";

function InteractionContainer({
  post,
  onOpenComments,
  hideComment = false,
}: {
  post: Post;
  onOpenComments: (post: Post) => void;
  hideComment?: boolean;
}) {
  const likeMutation = useLike();
  const queryClient = useQueryClient();

  const { theme } = useTheme();

  const bookmarkMutation = useMutation({
    mutationFn: (postId: string) => bookmarkPost(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const previousFeed = queryClient.getQueryData<FeedData>(["feed"]);

      queryClient.setQueryData<FeedData>(["feed"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post: Post) =>
              post._id === postId
                ? {
                    ...post,
                    isBookmarked: !post.isBookmarked,
                  }
                : post,
            ),
          })),
        };
      });

      return { previousFeed };
    },

    onError: (_, __, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }
    },
  });

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  };

  const handleBookmark = (postId: string) => {
    bookmarkMutation.mutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 dark:text-white">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
              onClick={() => handleLike(post._id)}
              aria-pressed={post.isLiked}
              aria-label={post.isLiked ? "Unlike post" : "Like post"}
            >
              <HeartIcon
                size={28}
                weight={post.isLiked ? "fill" : "regular"}
                fill={post.isLiked ? "red" : theme === "dark" ? "white" : ""}
              />
            </button>
            <span className="body-m-bold">{post.likes}</span>
          </div>
          {!hideComment && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-controls={`comments-${post._id}`}
                aria-label="Show comments"
                className={`cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105`}
                onClick={() => onOpenComments(post)}
              >
                <ChatCircleIcon size={28} />
              </button>
              <span
                className={`body-m-bold ${post.comments === 0 ? "hidden" : ""}`}
              >
                {post.comments}
              </span>
            </div>
          )}

          <button
            type="button"
            aria-label="share post"
            className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => {
              handleShare(
                post.author.account.username,
                `${window.location.origin}/post/${post._id}`,
              );
            }}
          >
            <ShareFatIcon size={28} />
          </button>
        </div>
        <button
          type="button"
          className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
          onClick={() => handleBookmark(post._id)}
          aria-pressed={post.isBookmarked}
          aria-label={post.isBookmarked ? "unbookmark post" : "bookmark post"}
        >
          <BookmarkSimpleIcon
            size={28}
            weight={post.isBookmarked ? "fill" : "regular"}
          />
        </button>
      </div>
      {/* <button
        type="button"
        className="body-s-semibold self-start cursor-pointer hover:text-gray-500 "
      >
        {post.likes} likes
      </button> */}
    </div>
  );
}

export default InteractionContainer;
