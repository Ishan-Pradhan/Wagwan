import { DotsThreeIcon, HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Spinner from "@components/custom-ui/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppSelector } from "stores/hooks";
import type { Comment } from "shared/features/posts/types/CommentTypes";
import { formatTime } from "utils/formatTime";
import type { Post } from "./types/FeedTypes";
import { deleteComment, likeComment } from "./api/post";

function CommentSection({ comment, post }: { comment: Comment; post: Post }) {
  const [commentLike, setCommentLike] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);

  const { user } = useAppSelector((state) => state.auth);

  const likeCommentMutation = useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", comment.postId],
      });
    },
  });

  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
  });

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
      <Link to={`/user/profile/${comment.author?.account?.username}`}>
        <img
          src={comment.author.account.avatar.url}
          alt="user avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <p className={`body-s-regular`}>
          <Link
            to={`/user/profile/${comment.author?.account?.username}`}
            className="body-s-bold inline cursor-pointer"
          >
            {comment.author?.account?.username}&nbsp;
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
            {user?._id === comment.author?.account?._id && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="comment option"
                    className="focus:outline-primary-500 cursor-pointer focus:outline lg:pointer-events-none lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100 lg:hover:text-gray-500 lg:focus-visible:pointer-events-auto lg:focus-visible:opacity-100"
                  >
                    <DotsThreeIcon size={28} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                    {/* only the author of the comment can delete the comment */}
                    {/* {(user?._id === comment.author?.account?._id ||
                    user?._id === post.author?.account?._id) && ()} */}

                    <DropdownMenuItem
                      className="flex gap-2"
                      onSelect={() => {
                        handleCommentDelete(comment._id);
                      }}
                    >
                      <span>Delete</span>
                      {deleteCommentMutation.isPending && <Spinner />}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      <button
        className="cursor-pointer"
        type="button"
        aria-label={commentLike ? "unlike comment" : "like comment"}
        onClick={() => handleCommentLike(comment._id)}
      >
        <HeartIcon weight={commentLike ? "fill" : "regular"} />
      </button>
    </div>
  );
}

export default CommentSection;
