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

function PostMenu({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const deletePostMutation = usePostDelete();

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
              onSelect={() => {
                handlePostDelete(post._id);
              }}
            >
              Delete
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={() => {}}>Share</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostMenu;
