import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowers } from "../api/getFollowers";
import { getFollowing } from "../api/getFollowing";

export const useGetFollowersFollowing = ({
  username,
  type,
}: {
  username: string | undefined;
  type: "followers" | "following";
}) => {
  return useInfiniteQuery({
    queryKey: ["follow-list", { username, type }],
    initialPageParam: 1 as number,

    queryFn: async ({ pageParam }) => {
      if (type === "followers") {
        const data = await getFollowers({
          username,
          page: pageParam,
          limit: 10,
        });
        return data;
      } else {
        const data = await getFollowing({
          username,
          page: pageParam,
          limit: 10,
        });
        return data;
      }
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
};
