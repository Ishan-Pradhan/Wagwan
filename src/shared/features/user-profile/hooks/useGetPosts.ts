import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPosts } from "../api/getMyPosts";
import { getUsersPosts } from "../api/getUsersPosts";
import { useAppSelector } from "stores/hooks";

export const useGetPosts = (username?: string) => {
  const { user } = useAppSelector((state) => state.auth);

  const isOwner = !username || user?.username === username;

  return useInfiniteQuery({
    queryKey: ["posts", isOwner ? "me" : username],
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      isOwner
        ? getMyPosts({ page: pageParam, limit: 12 })
        : getUsersPosts({
            username: username,
            page: pageParam,
            limit: 10,
          }),

    enabled: isOwner || !!username,

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
};
