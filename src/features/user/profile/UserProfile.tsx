import { BookmarkIcon, GridNineIcon } from "@phosphor-icons/react";
import { useGetPosts } from "../../../shared/features/user-profile/hooks/useGetPosts";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useGetProfile } from "../../../shared/features/user-profile/hooks/useGetProfile";
import UserDetail from "./components/UserDetail";
import PostsGrid from "./components/PostsGrid";
import BookmarksGrid from "./components/BookmarksGrid";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { logoutUser } from "stores/auth/authThunk";
import SkeletonLoading from "./components/SkeletonLoading";

function UserProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "posts";
  const { username } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts(username);
  const { data: profile } = useGetProfile(username);

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

  const posts =
    data?.pages?.flatMap((page) => {
      return page?.posts ?? [];
    }) ?? [];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <SkeletonLoading />
      </div>
    );
  }

  return (
    <div className="container flex max-w-4xl flex-col justify-center gap-10 px-4 py-3 pb-20 lg:gap-13 lg:py-10">
      <UserDetail
        profile={profile}
        posts={posts}
        user={user}
        logout={handleLogout}
      />

      {/* posts */}
      <div className="flex h-full flex-col gap-3">
        <div
          className={`grid ${user?._id === profile?.account._id ? "grid-cols-2" : "grid-cols-1"} border-b border-gray-200`}
        >
          <button
            type="button"
            aria-label={`${profile?.account?.username}'s post`}
            className={`flex w-full cursor-pointer items-center justify-center text-2xl lg:text-4xl`}
            onClick={() => setSearchParams({ tab: "posts" })}
            aria-current={activeTab === "posts" ? "true" : "false"}
          >
            <div
              className={`border-b-2 px-5 ${activeTab === "posts" ? "border-black dark:border-white" : "border-transparent"}`}
            >
              <GridNineIcon weight="duotone" />
            </div>
          </button>

          {user?._id === profile?.account._id && (
            <button
              type="button"
              aria-label="Your saved posts"
              className={`flex w-full cursor-pointer justify-center text-2xl lg:text-4xl`}
              onClick={() => setSearchParams({ tab: "bookmarks" })}
              aria-current={activeTab === "bookmarks" ? "true" : "false"}
            >
              <div
                className={`border-b-2 px-5 ${activeTab === "bookmarks" ? "border-black dark:border-white" : "border-transparent"}`}
              >
                <BookmarkIcon weight="duotone" />
              </div>
            </button>
          )}
        </div>

        {activeTab === "posts" && (
          <PostsGrid
            posts={posts}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            observerRef={observerRef}
          />
        )}
        {activeTab === "bookmarks" && <BookmarksGrid />}
      </div>
    </div>
  );
}

export default UserProfile;
