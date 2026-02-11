import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import LottieLoading from "@components/custom-ui/LottieLoading";
import type { Post } from "shared/features/posts/types/FeedTypes";
import { SealCheckIcon } from "@phosphor-icons/react";
import Spinner from "@components/custom-ui/Spinner";
import PostCard from "shared/features/posts/PostCard";
import CommentDialog from "shared/features/posts/CommentDialog";
import { INFINITE_SCROLL_MARGIN } from "constants/consts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTagPosts } from "./api/getTagPosts";

function TagsPage() {
  const { tag } = useParams();

  const [activePost, setActivePost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
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

  const openComments = (post: Post) => {
    setDialogOpen(true);
    setActivePost(post);
  };

  const closeComments = () => {
    setDialogOpen(false);
    setActivePost(null);
  };

  const posts =
    data?.pages?.flatMap((page) => {
      return page?.posts ?? [];
    }) ?? [];

  const observerRef = useRef<HTMLDivElement | null>(null);

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
    return (
      <div className="flex h-lvh items-center justify-center">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className="container mb-20 flex flex-col gap-6 py-5">
      <span className="body-l-medium">All results for Tag: {tag}</span>

      {posts.length === 0 && <div>No posts found</div>}

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

      {!hasNextPage && posts.length > 0 && (
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

export default TagsPage;
