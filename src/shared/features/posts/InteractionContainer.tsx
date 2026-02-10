import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";

import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "context/Theme/ThemeContext";
import type { Post } from "./types/FeedTypes";
import { useLike } from "./hooks/post";
import { useBookmark } from "./hooks/post";
import { handleShare } from "utils/handleShare";

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

  const bookmarkMutation = useBookmark();

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
