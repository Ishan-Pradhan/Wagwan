import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { follow } from "shared/features/user-profile/api/userProfileApi";
import type {
  Followers,
  FollowersUserType,
  FollowingUserType,
} from "../../../../shared/features/user-profile/types/UserDetailsTypes";

export const useFollowInDialog = (
  username: string,
  type: "followers" | "following",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: follow, // API call: follow/unfollow user by id

    onMutate: async (userId: string) => {
      // Cancel ongoing follow-list queries
      await queryClient.cancelQueries({
        queryKey: ["follow-list", { username, type }],
      });

      // Snapshot previous state
      const previousData = queryClient.getQueryData<FollowersUserType>([
        "follow-list",
        { username, type },
      ]);

      // Optimistically update the user in the dialog
      queryClient.setQueryData<
        InfiniteData<FollowersUserType | FollowingUserType>
      >(["follow-list", { username, type }], (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page: FollowersUserType) => {
          return {
            ...page,
            users: page.users.map((user: Followers) =>
              user._id === userId
                ? { ...user, isFollowing: !user.isFollowing }
                : user,
            ),
          };
        });

        return { ...oldData, pages: newPages };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["follow-list", { username, type }],
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow-list", { username, type }],
      });
    },
  });
};
