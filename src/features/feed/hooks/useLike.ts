import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../api/likePost";
import type { FeedType, Post } from "../types/FeedTypes";

type FeedData = {
  pages: FeedType[];
};

export const useLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
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
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
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
