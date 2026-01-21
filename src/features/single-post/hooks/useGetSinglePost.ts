import { getSinglePost } from "../api/getSinglePost";
import { useQuery } from "@tanstack/react-query";

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getSinglePost(postId),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
