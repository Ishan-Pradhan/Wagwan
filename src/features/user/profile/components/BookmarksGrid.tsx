import { useEffect, useRef } from "react";
import { useGetBookmarks } from "../hooks/useGetBookmarks";
import LottieLoading from "@components/ui/LottieLoading";
import { Link } from "react-router";
import Spinner from "@components/ui/Spinner";
import { BookmarkIcon, ChatCircleIcon, HeartIcon } from "@phosphor-icons/react";

function BookmarksGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetBookmarks();
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <LottieLoading />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center gap-4">
        <div className="flex shrink-0 rounded-full border-2 border-gray-300 bg-gray-100 p-3">
          <BookmarkIcon size={40} weight="duotone" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="body-l-medium">
            You have not bookmarked any posts yet.
          </h3>
          <p className="body-s-regular text-gray-500">
            Click the bookmark icon to save the post here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3">
      {posts.map((post) => (
        <Link
          to={`/post/${post._id}`}
          className="group relative aspect-square border border-white"
        >
          <img
            src={post.images[0].url}
            alt="user post"
            className="aspect-square object-cover"
          />
          <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center gap-4 p-3 transition-all duration-300 ease-in-out group-hover:flex group-hover:bg-gray-800/50">
            <div className="flex items-center gap-2 text-sm text-white lg:text-4xl">
              <HeartIcon weight="fill" />
              <span className="body-l-semibold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white lg:text-4xl">
              <ChatCircleIcon weight="fill" />
              <span className="body-l-semibold">{post.comments}</span>
            </div>
          </div>
        </Link>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="flex h-10 justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default BookmarksGrid;
