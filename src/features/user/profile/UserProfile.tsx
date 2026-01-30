import { BookmarkIcon, GridNineIcon } from "@phosphor-icons/react";
import { useGetPosts } from "./hooks/useGetPosts";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useGetProfile } from "./hooks/useGetProfile";
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <SkeletonLoading />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl flex flex-col gap-4 justify-center lg:py-10 py-3 pb-20 px-4">
      <UserDetail
        profile={profile}
        posts={posts}
        user={user}
        logout={handleLogout}
      />

      {/* posts */}
      <div className="flex flex-col gap-3 h-full">
        <div
          className={`grid ${user?._id === profile?.account._id ? "grid-cols-2" : "grid-cols-1"} border-b border-gray-200`}
        >
          <button
            type="button"
            className={`cursor-pointer w-full flex justify-center items-center  lg:text-4xl text-2xl`}
            onClick={() => setSearchParams({ tab: "posts" })}
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
              className={`cursor-pointer w-full flex justify-center lg:text-4xl text-2xl`}
              onClick={() => setSearchParams({ tab: "bookmarks" })}
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
