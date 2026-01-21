import { useInfiniteQuery } from "@tanstack/react-query";

import { getBookmarks } from "../api/getBookmarks";

export const useGetBookmarks = () => {
  return useInfiniteQuery({
    queryKey: ["bookmarks"],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      return getBookmarks({
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
