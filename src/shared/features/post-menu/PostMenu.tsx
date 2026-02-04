import { DotsThreeIcon } from "@phosphor-icons/react";

import { usePostDelete } from "./hooks/useDeletePosts";
import type { Post } from "shared/features/posts/types/FeedTypes";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAppSelector } from "stores/hooks";
import CreateEditPost from "shared/features/create-edit-post/CreateEditPost";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { handleShare } from "utils/handleShare";
import { useNavigate } from "react-router";

function PostMenu({ post }: { post: Post }) {
  const { user } = useAppSelector((state) => state.auth);
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false);

  const queryClient = useQueryClient();
  const deletePostMutation = usePostDelete();

  const navigate = useNavigate();

  const closeEditPostDialog = () => {
    setOpenEditPostDialog(false);
  };

  const handlePostDelete = (postId: string) => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        toast.success("Post deleted");
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts", "me"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        navigate(`/user/profile/${post.author.account.username}`);
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="post menu">
          <DotsThreeIcon
            size={28}
            className="cursor-pointer hover:text-gray-500"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          {user?._id === post.author.owner && (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                handlePostDelete(post._id);
              }}
            >
              Delete
            </DropdownMenuItem>
          )}

          {user?._id === post.author.owner && (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={
                user?.isEmailVerified
                  ? () => setOpenEditPostDialog(!openEditPostDialog)
                  : () => {
                      toast.error("Please verify your email to Add posts");
                    }
              }
            >
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleShare(
                post.author.account.username,
                `${window.location.origin}/post/${post._id}`,
              );
            }}
          >
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      {openEditPostDialog && (
        <CreateEditPost
          open={openEditPostDialog}
          onClose={closeEditPostDialog}
          mode="edit"
          post={post}
        />
      )}
    </DropdownMenu>
  );
}

export default PostMenu;
