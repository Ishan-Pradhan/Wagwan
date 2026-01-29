import { useGetFollowersFollowing } from "features/user/profile/hooks/useGetFollowFollowing";
import { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useNavigate } from "react-router";

import type { Followers } from "features/user/profile/api/getFollowers";
import { useStory } from "context/story/StoryContext";
import { useAppSelector } from "stores/hooks";

function Stories() {
  const { user } = useAppSelector((state) => state.auth);
  const { viewedIds, setViewedIds } = useStory();
  const username = user?.username as string;
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFollowersFollowing({ username, type: "following" });

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
      <div className="flex gap-5 w-full px-25   ">
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        <div className=" shrink-0 w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
      </div>
    );
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
    <div className="relative xl:w-150 lg:w-120  w-xs mx-auto">
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
              className="flex lg:gap-2 px-5 cursor-grab"
            >
              <div
                className={`shrink-0 rounded-full  flex flex-col gap-2 items-center justify-center`}
              >
                <img
                  src={user.avatar.url}
                  alt="user avatar"
                  onClick={() => markViewed(user)}
                  className={`w-20 h-20 rounded-full cursor-pointer ${viewed ? "border-4 border-gray-500" : " p-1 bg-linear-to-r from-primary-500 to-secondary-500"}`}
                />
                <span
                  className={`caption-semibold text-center  w-20 overflow-hidden whitespace-nowrap ${user.username.length > 10 ? "text-ellipsis" : ""}`}
                >
                  {user.username}
                </span>
              </div>
            </SplideSlide>
          );
        })}
        {hasNextPage && (
          <div ref={observerRef} className="h-10 flex justify-center">
            {isFetchingNextPage && (
              <div className="w-30 h-40 rounded-full bg-gray-500 animate-pulse"></div>
            )}
          </div>
        )}
      </Splide>
    </div>
  );
}

export default Stories;
