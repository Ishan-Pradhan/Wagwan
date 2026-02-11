import LottieLoading from "@components/custom-ui/LottieLoading";
import Spinner from "@components/custom-ui/Spinner";
import {
  ImagesIcon,
  MagnifyingGlassIcon,
  SmileyXEyesIcon,
} from "@phosphor-icons/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_MARGIN } from "constants/consts";
import { getTagPosts } from "features/feeds/tags/api/getTagPosts";
import { useDebounce } from "hooks/useDebouncer";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Post } from "shared/features/posts/types/FeedTypes";

function SearchPage() {
  const [input, setInput] = useState("");
  const debounce = useDebounce(input, 2000);

  const {
    data,
    fetchNextPage,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["search", debounce],
    initialPageParam: 1,
    enabled: !!debounce,

    queryFn: ({ pageParam }) => {
      return getTagPosts({
        tag: debounce,
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

  const observerRef = useRef<HTMLDivElement>(null);

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

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const posts =
    data?.pages?.flatMap((page) => {
      return page?.posts ?? [];
    }) ?? [];

  return (
    <div className="container mt-4 flex w-full flex-col items-center gap-5 lg:px-40">
      <div className="focus-within:outline-primary-500 flex w-full items-center rounded-full border border-gray-700 px-3 focus-within:outline-2 dark:border-gray-200">
        <label htmlFor="search" className="text-gray-500">
          <MagnifyingGlassIcon size={24} />
        </label>
        <input
          id="search"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full py-4 pl-2 focus:outline-none"
          placeholder="Search with tags"
        />
      </div>

      {input !== "" && !isFetched && (
        <div className="flex w-full flex-col items-center gap-2">
          <LottieLoading />
        </div>
      )}

      {!isFetching && !debounce && posts.length === 0 && input === "" && (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
          <MagnifyingGlassIcon size={80} weight="duotone" />
          <span className="body-l-semibold text-gray-700">
            Search with tags
          </span>
        </div>
      )}

      {debounce && !isFetching && posts.length === 0 && (
        <div className="col-span-3 flex h-[50vh] w-full flex-col items-center justify-center gap-2 text-center">
          <SmileyXEyesIcon size={80} weight="duotone" />
          <span className="body-l-semibold text-gray-700">
            No post found with tag:
            <span className="body-l-bold"> {debounce}</span>
          </span>
        </div>
      )}

      {posts.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <div>
            Posts with tag: <span className="body-m-bold">{debounce}</span>{" "}
          </div>
          <div className="grid w-full grid-cols-3">
            {posts.map((post: Post) => {
              return (
                <Link
                  to={`/post/${post._id}`}
                  key={post._id}
                  className="relative aspect-square transition-all duration-100 ease-in-out hover:brightness-50"
                >
                  <img
                    src={post.images[0].url}
                    className="h-full w-full object-cover"
                    alt={`image with tag ${input}`}
                  />

                  {post.images.length > 1 && (
                    <div className="absolute top-2 right-4">
                      <ImagesIcon size={18} fill="white" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {hasNextPage && (
        <div ref={observerRef} className="flex h-10 justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
