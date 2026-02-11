import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeedData, Post } from "../types/FeedTypes";
import { postComments } from "../api/post";
import toast from "react-hot-toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/post";
import { likePost } from "../api/post";

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
                : post,
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

export const usePostComments = () => {
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: string }) =>
      postComments(postId, comment),
    onSuccess: () => {
      toast.success("Comment added");
    },
    onError: (err) => {
      console.error("Failed to add comment", err);
    },
  });
};
