import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";

export const useComment = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["comment", postId],
    initialPageParam: 1,
    queryFn: ({ queryKey, pageParam }) => {
      const [, postId] = queryKey;

      return fetchComments({
        postId,
        page: pageParam,
        limit: 10,
      });
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
