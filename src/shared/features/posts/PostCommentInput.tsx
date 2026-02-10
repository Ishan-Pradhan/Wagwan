import Spinner from "@components/custom-ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostComments } from "./hooks/post";

function PostCommentInput({ postId }: { postId: string }) {
  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const postCommentMutation = usePostComments();

  const handlePostComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;

    postCommentMutation.mutate(
      { postId, comment },
      {
        onSuccess: () => {
          setNewComment("");
          queryClient.invalidateQueries({ queryKey: ["comment", postId] });
          queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
        onError: (err) => {
          console.error("Failed to post comment", err);
        },
      },
    );
  };

  return (
    <div className="flex w-full justify-between">
      <input
        type="text"
        placeholder="Add a comment..."
        className="body-s-regular peer flex-1 py-1 focus:outline-none"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handlePostComment(postId, newComment);
        }}
      />
      <button
        type="button"
        aria-label="post comment"
        className="bg-primary-500 body-s-regular hover:bg-primary-600 hidden cursor-pointer items-center justify-center rounded-sm border px-2 text-white peer-not-placeholder-shown:flex"
        onClick={() => handlePostComment(postId, newComment)}
      >
        <span>Post</span> {postCommentMutation.isPending && <Spinner />}
      </button>
    </div>
  );
}

export default PostCommentInput;
