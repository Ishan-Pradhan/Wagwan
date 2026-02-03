import { useGetFollowersFollowing } from "shared/features/user-profile/hooks/useGetFollowFollowing";
import { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useNavigate } from "react-router";
import { useStory } from "context/story/StoryContext";
import { useAppSelector } from "stores/hooks";
import StoriesSkeletonLoading from "./StoriesSkeletonLoading";
import type { Followers } from "shared/features/user-profile/types/UserDetailsTypes";

function Stories() {
  const { user } = useAppSelector((state) => state.auth);

  const { viewedIds, setViewedIds } = useStory();

  const username = user?.username;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFollowersFollowing({ username, type: "following" });

  const navigate = useNavigate();

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
    return <StoriesSkeletonLoading />;
  }

  const users =
    data?.pages?.flatMap((page) => {
      return page?.users ?? [];
    }) ?? [];

  const markViewed = (user: Followers) => {
    setViewedIds((prev) =>
      prev.includes(`userId`) ? prev : [...prev, user._id],
    );
    navigate(`/story/${user.username}`);
  };

  return (
    <div className="relative mx-auto w-xs md:w-120 xl:w-150">
      <Splide
        options={{
          perPage: 1,
          pagination: false,
          arrows: false,
          gap: "0",
          lazyLoad: "nearby",
        }}
      >
        {users.map((user) => {
          const viewed = viewedIds.includes(user._id);
          return (
            <SplideSlide
              key={user?._id}
              ref={observerRef}
              className="flex cursor-grab lg:gap-2 lg:px-5"
            >
              <div
                className={`flex shrink-0 flex-col items-center justify-center gap-2 rounded-full`}
              >
                <img
                  src={user.avatar.url}
                  alt="user avatar"
                  onClick={() => markViewed(user)}
                  className={`h-15 w-15 cursor-pointer rounded-full object-cover lg:h-20 lg:w-20 ${viewed ? "border-4 border-gray-500" : "from-primary-500 to-secondary-500 bg-linear-to-r p-1"}`}
                />
                <span
                  className={`caption-semibold w-20 overflow-hidden text-center whitespace-nowrap ${user.username.length > 10 ? "text-ellipsis" : ""}`}
                >
                  {user.username}
                </span>
              </div>
            </SplideSlide>
          );
        })}
        {hasNextPage && (
          <div ref={observerRef} className="flex h-10 justify-center">
            {isFetchingNextPage && (
              <div className="h-40 w-30 animate-pulse rounded-full bg-gray-500"></div>
            )}
          </div>
        )}
      </Splide>
    </div>
  );
}

export default Stories;
