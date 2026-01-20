import { BookmarkIcon, GridNineIcon } from "@phosphor-icons/react";
import { useAuth } from "context/auth/AuthContext";
import { useGetPosts } from "./hooks/useGetPosts";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useGetProfile } from "./hooks/useGetProfile";
import LottieLoading from "@components/ui/LottieLoading";
import UserDetail from "./components/UserDetail";
import PostsGrid from "./components/PostsGrid";

function UserProfile() {
  const { user, logout } = useAuth();
  const { username } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts(username);

  const { data: profile } = useGetProfile(username);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl flex flex-col gap-4 justify-center lg:py-10 py-3 pb-20 px-4">
      <UserDetail profile={profile} posts={posts} user={user} logout={logout} />

      {/* posts */}
      <div className="flex flex-col">
        <div className="grid grid-cols-2  border-b border-gray-200 ">
          <button
            type="button"
            className="cursor-pointer w-full flex justify-center border-b border-black py-2"
          >
            <GridNineIcon weight="duotone" size={32} />
          </button>
          <button
            type="button"
            className="cursor-pointer w-full flex justify-center py-2"
          >
            <BookmarkIcon weight="duotone" size={32} />
          </button>
        </div>

        <PostsGrid
          posts={posts}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      </div>
    </div>
  );
}

export default UserProfile;
