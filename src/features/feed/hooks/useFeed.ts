import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/feeds";

export const useFeed = () => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, limit: 10 }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
};
