import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeedType, Post } from "../types/FeedTypes";
import { bookmarkPost } from "../api/bookmarkPost";

type FeedData = {
  pages: FeedType[];
};

export const useBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => bookmarkPost(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const previousFeed = queryClient.getQueryData<FeedData>(["feed"]);

      queryClient.setQueryData<FeedData>(["feed"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post: Post) =>
              post._id === postId
                ? {
                    ...post,
                    isBookmarked: !post.isBookmarked,
                  }
                : post
            ),
          })),
        };
      });

      return { previousFeed };
    },

    onError: (_, __, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }
    },
  });
};
