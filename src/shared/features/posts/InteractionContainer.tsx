import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";

import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "context/Theme/ThemeContext";
import type { Post } from "./types/FeedTypes";
import { useLike } from "./hooks/useLike";
import { useBookmark } from "./hooks/useBookmark";
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
            <HeartIcon
              size={28}
              weight={post.isLiked ? "fill" : "regular"}
              fill={post.isLiked ? "red" : theme === "dark" ? "white" : ""}
              className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
              onClick={() => handleLike(post._id)}
            />
            <span className="body-m-bold">{post.likes}</span>
          </div>
          {!hideComment && (
            <div className="flex items-center gap-1">
              <ChatCircleIcon
                size={28}
                className={`cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105`}
                onClick={() => onOpenComments(post)}
              />
              <span
                className={`body-m-bold ${post.comments === 0 ? "hidden" : ""}`}
              >
                {post.comments}
              </span>
            </div>
          )}
          <ShareFatIcon
            size={28}
            className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => {
              handleShare(
                post.author.account.username,
                `${window.location.origin}/post/${post._id}`,
              );
            }}
          />
        </div>
        <BookmarkSimpleIcon
          size={28}
          className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
          onClick={() => handleBookmark(post._id)}
          weight={post.isBookmarked ? "fill" : "regular"}
        />
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
