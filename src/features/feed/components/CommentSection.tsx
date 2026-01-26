import { DotsThreeIcon, HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import type { Comment } from "../types/CommentTypes";
import { useState } from "react";
import { formatTime } from "./../../../utils/formatTime";
import { useLikeComment } from "../hooks/useLikeComment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useAuth } from "context/auth/AuthContext";
import type { Post } from "../types/FeedTypes";
import { useCommentDelete } from "../hooks/useCommentDelete";
import Spinner from "@components/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CommentSection({ comment, post }: { comment: Comment; post: Post }) {
  const { user } = useAuth();
  const [commentLike, setCommentLike] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);
  const likeCommentMutation = useLikeComment(comment.postId);
  const handleCommentLike = (commentId: string) => {
    setCommentLike(!commentLike);
    setLikes(commentLike ? likes - 1 : likes + 1);
    likeCommentMutation.mutate(commentId);
  };
  const queryClient = useQueryClient();
  const deleteCommentMutation = useCommentDelete();

  const handleCommentDelete = (commentId: string) => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted");
        // this is for refetching
        queryClient.invalidateQueries({ queryKey: ["comment", post._id] });
      },
      onError: (err) => {
        console.error("Failed to post comment", err);
      },
    });
  };

  return (
    <div className="flex gap-8  items-start group">
      <Link to={`/user/profile/${comment.author?.account.username}`}>
        <img
          src={comment.author.account.avatar.url}
          alt="user avatar"
          className="w-10 h-10 rounded-full"
        />
      </Link>
      <div className="flex-1 flex flex-col gap-1  ">
        <p className={`body-s-regular `}>
          <Link
            to={`/user/profile/${comment.author?.account.username}`}
            className="body-s-bold cursor-pointer inline"
          >
            {comment.author?.account.username}&nbsp;
          </Link>
          {comment.content}
        </p>
        <div className="flex gap-3 items-center">
          <span className="text-gray-700 caption-regular">
            {formatTime(comment.createdAt)}
          </span>
          <span className="body-s-medium text-gray-600">likes {likes}</span>
          <div className=" cursor-pointer text-gray-500">
            {/* menu */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <DotsThreeIcon
                  size={28}
                  className="cursor-pointer hover:text-gray-500 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                  {/* only the author of the comment can delete the comment */}
                  {/* {(user?._id === comment.author?.account?._id ||
                    user?._id === post.author?.account?._id) && ()} */}

                  {user?._id === comment.author?.account?._id && (
                    <DropdownMenuItem
                      className="flex gap-2"
                      onSelect={() => {
                        handleCommentDelete(comment._id);
                      }}
                    >
                      <span>Delete</span>
                      {deleteCommentMutation.isPending && <Spinner />}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={() => {}}>Share</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
