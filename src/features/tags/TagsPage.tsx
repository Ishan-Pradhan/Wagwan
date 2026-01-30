import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import LottieLoading from "@components/ui/LottieLoading";

import { useGetTagPosts } from "./hooks/useGetTagPosts";
import type { Post } from "features/feed/types/FeedTypes";
import { SealCheckIcon } from "@phosphor-icons/react";
import Spinner from "@components/ui/Spinner";
import CommentDialog from "features/feed/components/CommentDialog";
import PostCard from "features/feed/components/PostCard";

function TagsPage() {
  const { tag } = useParams();

  const [activePost, setActivePost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTagPosts(tag as string);

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
      { rootMargin: "200px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <LottieLoading />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 mb-20 container py-5">
      <span className="body-l-medium">All results for Tag: {tag}</span>

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
        <div ref={observerRef} className="h-10 flex justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}

      {!hasNextPage && (
        <div className="flex flex-col gap-3 justify-center items-center">
          <SealCheckIcon weight="duotone" size={32} fill="green" />
          <span className="text-gray-500 body-l-medium">
            You are all caught up
          </span>
        </div>
      )}
    </div>
  );
}

export default TagsPage;
