import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../api/follow";
import type { UserProfile } from "../types/UserDetailsTypes";

export const useFollow = (username: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: follow,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["profile", username] });

      const previousProfile = queryClient.getQueryData<UserProfile>([
        "profile",
        username,
      ]);

      queryClient.setQueryData(["profile", username], (old: UserProfile) => {
        if (!old) return old;

        return {
          ...old,
          isFollowing: !old.isFollowing,
          followersCount: old.isFollowing
            ? old.followersCount - 1
            : old.followersCount + 1,
        };
      });

      return { previousProfile };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", username] });
    },
    onError: (_err, _vars, context) => {
      // Rollback on failure
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["profile", username],
          context.previousProfile,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
};
