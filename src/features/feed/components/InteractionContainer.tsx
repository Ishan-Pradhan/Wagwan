import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";
import { useLike } from "../hooks/useLike";
import type { Post } from "../types/FeedTypes";
import { useBookmark } from "../hooks/useBookmark";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "context/Theme/ThemeContext";

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
    <div className="flex flex-col  gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center dark:text-white ">
          <div className="flex gap-1 items-center">
            <HeartIcon
              size={28}
              weight={post.isLiked ? "fill" : "regular"}
              fill={post.isLiked ? "red" : theme === "dark" ? "white" : ""}
              className="hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer "
              onClick={() => handleLike(post._id)}
            />
            <span className="body-m-bold">{post.likes}</span>
          </div>
          {!hideComment && (
            <div className="flex gap-1 items-center">
              <ChatCircleIcon
                size={28}
                className={`hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer `}
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
            className="hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
          />
        </div>
        <BookmarkSimpleIcon
          size={28}
          className="hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer"
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
