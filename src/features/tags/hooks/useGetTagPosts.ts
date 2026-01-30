import { useInfiniteQuery } from "@tanstack/react-query";
import { getTagPosts } from "../api/getTagPosts";

export const useGetTagPosts = (tag: string) => {
  return useInfiniteQuery({
    queryKey: ["tags", tag],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      return getTagPosts({
        tag,
        page: pageParam,
        limit: 10,
      });
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
};
