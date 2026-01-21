import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../api/follow";
import type { UserProfile } from "../components/UserDetail";

export const useFollow = (username: string) => {
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
      // Sync with server truth
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
};
