import { useEffect, useRef, useState } from "react";
import { useFeed } from "../hooks/useFeed";
import PostCard from "./PostCard";
import Spinner from "@components/custom-ui/Spinner";
import type { Post } from "../types/FeedTypes";
import FeedSkeletonLoading from "./FeedSkeletonLoading";
import { SealCheckIcon } from "@phosphor-icons/react";

import CommentDialog from "./CommentDialog";

function Feeds() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeed();

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
      { rootMargin: "200px" },
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
