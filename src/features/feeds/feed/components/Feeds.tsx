import { useEffect, useRef, useState } from "react";
import Spinner from "@components/custom-ui/Spinner";
import type { Post } from "../../../../shared/features/posts/types/FeedTypes";
import FeedSkeletonLoading from "./FeedSkeletonLoading";
import { SealCheckIcon } from "@phosphor-icons/react";
import PostCard from "shared/features/posts/PostCard";
import CommentDialog from "shared/features/posts/CommentDialog";
import { INFINITE_SCROLL_MARGIN } from "constants/consts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/feeds";

function Feeds() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  //fetch feeds
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, limit: 10 }),

      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,

      staleTime: 30_000,
      refetchInterval: 60_000,
      refetchOnWindowFocus: true,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const posts =
    data?.pages?.flatMap((page) => {
      return page?.posts ?? [];
    }) ?? [];

  const openComments = (post: Post) => {
    setDialogOpen(true);
    setActivePost(post);
  };

  const closeComments = () => {
    setDialogOpen(false);
    setActivePost(null);
  };

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: INFINITE_SCROLL_MARGIN },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <FeedSkeletonLoading />;
  }

  return (
    <div className="mt-8 flex flex-col gap-6 pb-15">
      {posts.map((post: Post) => {
        return (
          <PostCard key={post._id} post={post} onOpenComments={openComments} />
        );
      })}

      {activePost && (
        <CommentDialog
          postId={activePost._id}
          open={dialogOpen}
          onClose={closeComments}
        />
      )}

      {hasNextPage && (
        <div ref={observerRef} className="flex h-10 justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}

      {!hasNextPage && (
        <div className="flex flex-col items-center justify-center gap-3">
          <SealCheckIcon weight="duotone" size={32} fill="green" />
          <span className="body-l-medium text-gray-500">
            You are all caught up
          </span>
        </div>
      )}
    </div>
  );
}

export default Feeds;
