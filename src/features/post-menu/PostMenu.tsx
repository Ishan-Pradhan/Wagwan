import { DotsThreeIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shared/components/ui/dropdown-menu";
import { usePostDelete } from "./hooks/useDeletePosts";
import { useAuth } from "context/auth/AuthContext";
import type { Post } from "features/feed/types/FeedTypes";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CreatePost from "features/create-post/CreatePost";

function PostMenu({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false);

  const deletePostMutation = usePostDelete();

  const closeEditPostDialog = () => {
    setOpenEditPostDialog(false);
  };

  const handlePostDelete = (postId: string) => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        toast.success("Post deleted");
        // this is for refetching
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts", "me"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <DotsThreeIcon
          size={28}
          className="cursor-pointer hover:text-gray-500"
        />
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
          <DropdownMenuItem className="cursor-pointer" onSelect={() => {}}>
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      {openEditPostDialog && (
        <CreatePost
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
