import { useEffect, useRef } from "react";
import { useFeed } from "../hooks/useFeed";
import PostCard from "./PostCard";
import Spinner from "@components/ui/Spinner";
import type { Post } from "../types/FeedTypes";
import FeedSkeletonLoading from "./FeedSkeletonLoading";

function Feeds() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeed();

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
      { rootMargin: "200px" }
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
    <div className="flex flex-col gap-6 mb-20">
      {posts.map((post: Post) => {
        return <PostCard key={post._id} post={post} />;
      })}

      {hasNextPage && (
        <div ref={observerRef} className="h-10 flex justify-center">
          {isFetchingNextPage && <Spinner />}{" "}
        </div>
      )}
    </div>
  );
}

export default Feeds;
