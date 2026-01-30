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
import type { Post } from "../types/FeedTypes";
import { useCommentDelete } from "../hooks/useCommentDelete";
import Spinner from "@components/custom-ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppSelector } from "stores/hooks";

function CommentSection({ comment, post }: { comment: Comment; post: Post }) {
  const [commentLike, setCommentLike] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);

  const { user } = useAppSelector((state) => state.auth);

  const likeCommentMutation = useLikeComment(comment.postId);

  const queryClient = useQueryClient();
  const deleteCommentMutation = useCommentDelete();

  const handleCommentLike = (commentId: string) => {
    setCommentLike(!commentLike);
    setLikes(commentLike ? likes - 1 : likes + 1);
    likeCommentMutation.mutate(commentId);
  };

  const handleCommentDelete = (commentId: string) => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted");
        queryClient.invalidateQueries({ queryKey: ["comment", post._id] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      },
      onError: (err) => {
        console.error("Failed to post comment", err);
      },
    });
  };

  return (
    <div className="group flex items-start gap-8 px-3">
      <Link to={`/user/profile/${comment.author?.account.username}`}>
        <img
          src={comment.author.account.avatar.url}
          alt="user avatar"
          className="h-10 w-10 rounded-full"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <p className={`body-s-regular`}>
          <Link
            to={`/user/profile/${comment.author?.account.username}`}
            className="body-s-bold inline cursor-pointer"
          >
            {comment.author?.account.username}&nbsp;
          </Link>
          {comment.content}
        </p>
        <div className="flex items-center gap-3">
          <span className="caption-regular text-gray-700">
            {formatTime(comment.createdAt)}
          </span>
          <span className="body-s-medium text-gray-600">likes {likes}</span>
          <div className="cursor-pointer text-gray-500">
            {/* menu */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <DotsThreeIcon
                  size={28}
                  className="pointer-events-none cursor-pointer opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 hover:text-gray-500"
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
      </button>
    </div>
  );
}

export default CommentSection;
