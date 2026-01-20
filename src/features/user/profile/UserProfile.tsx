import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { BookmarkIcon, GearIcon, GridNineIcon } from "@phosphor-icons/react";
import { useAuth } from "context/auth/AuthContext";
import { useGetPosts } from "./hooks/useGetPosts";
import { Link, useParams } from "react-router";
import { useEffect, useRef } from "react";
import Spinner from "@components/ui/Spinner";
import { useGetProfile } from "./hooks/useGetProfile";

function UserProfile() {
  const { user, logout } = useAuth();
  const { username } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts(username);

  const { data: profile } = useGetProfile(username);

  console.log(profile);

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
    return <div>Loading</div>;
  }

  return (
    <div className="container max-w-4xl flex flex-col gap-4 justify-center lg:py-10 py-3 pb-20 px-4">
      <div className="mx-auto ">
        <div className="flex lg:justify-between  gap-4  items-center  w-full">
          {/* image */}
          <div>
            <img
              className="lg:h-30 lg:w-30 w-10 h-10 rounded-full "
              src={profile?.account?.avatar.url}
              alt="user avatar"
            />
          </div>

          {/* user details */}
          <div className="flex flex-1  flex-col lg:gap-5 gap-2">
            {/* user info and interactions */}
            <div className="flex gap-5 items-center ">
              <span className="body-l-medium">
                {profile?.account?.username}
              </span>
              {user?._id === profile.owner && (
                <button className="hidden lg:flex bg-gray-100 body-m-medium cursor-pointer hover:bg-gray-200 text-gray-900 rounded-md px-3 py-1">
                  Edit Profile
                </button>
              )}
              {user?._id === profile.owner && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <GearIcon
                      size={24}
                      className=" hover:text-gray-500 cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:bg-gray-100 cursor-pointer"
                        onSelect={logout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {user?._id === profile.owner && (
              <button className="lg:hidden flex self-start bg-gray-100 body-m-medium cursor-pointer hover:bg-gray-200 text-gray-900 rounded-md px-3 py-1">
                Edit Profile
              </button>
            )}

            {/* followers, posts and following counts */}
            <div className="flex gap-10 items-center">
              <div className="flex gap-1 items-center">
                <span className="body-l-semibold">{posts.length}</span>
                <span className="body-m-regular text-gray-600">posts</span>
              </div>
              <button className="flex gap-1 items-center cursor-pointer group">
                <span className="body-l-semibold">
                  {profile.followersCount}
                </span>
                <span className="body-m-regular text-gray-600 group-hover:text-gray-400">
                  followers
                </span>
              </button>
              <button className="flex gap-1 items-center cursor-pointer group">
                <span className="body-l-semibold">
                  {profile.followingCount}
                </span>
                <span className="body-m-regular text-gray-600 group-hover:text-gray-400">
                  following
                </span>
              </button>
            </div>

            <div className="flex flex-col ">
              {/* user's full name  */}
              <div className="lg:flex gap-1 hidden body-s-bold">
                <span>{profile.firstName}</span>
                <span>{profile.lastName}</span>
              </div>

              {/* user's bio */}
              <p className="body-s-regular hidden lg:flex">{profile.bio}</p>
            </div>
          </div>
        </div>
        <p className="body-s-regular lg:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat animi
          odit ut ratione neque, expedita, adipisci itaqu. trains yeahqs
        </p>
      </div>

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

        <div className="grid grid-cols-3">
          {posts.map((post) => (
            <Link to="" className="aspect-square">
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
      </div>
    </div>
  );
}

export default UserProfile;
