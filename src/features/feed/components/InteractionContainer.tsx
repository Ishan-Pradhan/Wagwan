import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";
import { useLike } from "../hooks/useLike";
import type { Post } from "../types/FeedTypes";
import { useBookmark } from "../hooks/useBookmark";

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
  const bookmarkMutation = useBookmark();

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId);
  };

  const handleBookmark = (postId: string) => {
    bookmarkMutation.mutate(postId);
  };

  return (
    <div className="flex flex-col  gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <HeartIcon
            size={28}
            weight={post.isLiked ? "fill" : "regular"}
            fill={post.isLiked ? "red" : ""}
            stroke="2px"
            className="hover:scale-105 cursor-pointer"
            onClick={() => handleLike(post._id)}
          />
          <ChatCircleIcon
            size={28}
            className={`hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer ${
              hideComment ? "hidden" : "flex"
            }`}
            onClick={() => onOpenComments(post)}
          />
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
      <button
        type="button"
        className="body-s-semibold self-start cursor-pointer hover:text-gray-500 "
      >
        {post.likes} likes
      </button>
    </div>
  );
}

export default InteractionContainer;
