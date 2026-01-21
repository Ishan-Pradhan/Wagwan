import { useEffect, useRef } from "react";
import { useGetBookmarks } from "../hooks/useGetBookmarks";
import LottieLoading from "@components/ui/LottieLoading";
import { Link } from "react-router";
import Spinner from "@components/ui/Spinner";

function BookmarksGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetBookmarks();
  console.log("bookmarks", data);
  const posts =
    data?.pages?.flatMap((page) => {
      return page?.bookmarkedPosts ?? [];
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LottieLoading />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} className="aspect-square">
          <img
            src={post.images[0].url}
            alt="user post"
            className="aspect-square object-cover"
          />
        </Link>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="h-10 flex justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default BookmarksGrid;
