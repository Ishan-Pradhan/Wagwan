import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPosts } from "../api/getMyPosts";
import { useAuth } from "context/auth/AuthContext";
import { getUsersPosts } from "../api/getUsersPosts";

export const useGetPosts = (username?: string) => {
  const { user } = useAuth();

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

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
