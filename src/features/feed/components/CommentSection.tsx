import { HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import type { Comment } from "../types/CommentTypes";
import { useLikeComment } from "../hooks/useLikeComment";
import { useState } from "react";
import { formatTime } from "./../../../utils/formatTime";

function CommentSection({ comment }: { comment: Comment }) {
  const [commentLike, setCommentLike] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);

  const likeCommentMutation = useLikeComment();

  const handleCommentLike = (commentId: string) => {
    setCommentLike(!commentLike);
    setLikes(commentLike ? likes - 1 : likes + 1);
    likeCommentMutation.mutate(commentId);
  };

  return (
    <div className="flex gap-8  items-start">
      <Link to="">
        <img
          src={comment.author.account.avatar.url}
          alt="user avatar"
          className="w-10 h-10 rounded-full"
        />
      </Link>
      <div className="flex-1 flex flex-col gap-1  ">
        <p className={`body-s-regular `}>
          <Link to="" className="body-s-bold cursor-pointer inline">
            {comment.author.account.username}&nbsp;
          </Link>
          {comment.content}
        </p>
        <div className="flex gap-3 items-center">
          <span className="text-gray-700 caption-regular">
            {formatTime(comment.createdAt)}
          </span>
          <span className="body-s-medium text-gray-600">likes {likes}</span>
        </div>
      </div>
      <button className="cursor-pointer">
        <HeartIcon
          weight={commentLike ? "fill" : "regular"}
          onClick={() => handleCommentLike(comment._id)}
        />
      </button>{" "}
    </div>
  );
}

export default CommentSection;
