import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostComments } from "../hooks/usePostComments";
import Spinner from "@components/ui/Spinner";

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

          // this is for refetching
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
        className="flex-1 body-s-regular focus:outline-none  peer py-1"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handlePostComment(postId, newComment);
        }}
      />
      <button
        className="border cursor-pointer px-2 rounded-sm  justify-center items-center bg-primary-500 body-s-regular text-white hidden hover:bg-primary-600  peer-not-placeholder-shown:flex"
        onClick={() => handlePostComment(postId, newComment)}
      >
        <span>Post</span> {postCommentMutation.isPending && <Spinner />}
      </button>
    </div>
  );
}

export default PostCommentInput;
