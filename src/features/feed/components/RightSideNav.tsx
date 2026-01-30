import { useFollow } from "features/user/profile/hooks/useFollow";

import { Link } from "react-router";
import { useAppSelector } from "stores/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFollowersFollowing } from "features/user/profile/hooks/useGetFollowFollowing";

function RightSideNav() {
  const { user } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetFollowersFollowing({
    username: user?.username,
    type: "followers",
  });
  const followMutation = useFollow(user?.username);

  const followers = data?.pages.flatMap((p) => p.users ?? []) ?? [];
  const noSuggestion = followers?.filter((user) => !user.isFollowing) ?? [];

  const userAvatar = user?.avatar?.url;

  if (!user) return;

  return (
    <div className="flex flex-col gap-10 w-2/3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to={`/user/profile/${user?.username}`}>
            <img
              src={userAvatar}
              alt="user avatar"
              className="h-10 w-10 rounded-full border object-contain"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/user/profile/${user?.username}`}>
              <span className="body-m-bold">{user?.username}</span>
            </Link>
            <span className="body-s-regular tracking-wide">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <span className="body-m-bold">Suggested for you</span>
        <div className="flex flex-col gap-8 w-full">
          {noSuggestion.length === 0 && (
            <span className="text-gray-500 body-s-regular">
              No suggestion for you currently
            </span>
          )}

          {isLoading && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-15 h-4 bg-gray-600 animate-pulse rounded-full"></div>
                    <div className="w-20 h-3 bg-gray-400 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="w-7 h-3 bg-gray-600 animate-pulse rounded-full"></div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-15 h-4 bg-gray-600 animate-pulse rounded-full"></div>
                    <div className="w-20 h-3 bg-gray-400 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="w-7 h-3 bg-gray-600 animate-pulse rounded-full"></div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-15 h-4 bg-gray-600 animate-pulse rounded-full"></div>
                    <div className="w-20 h-3 bg-gray-400 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="w-7 h-3 bg-gray-600 animate-pulse rounded-full"></div>
              </div>
            </div>
          )}
          {followers
            .filter((user) => user.isFollowing === false)
            .map((follower) => (
              <div
                className="flex justify-between items-center w-full"
                key={follower._id}
              >
                <div className="flex gap-4">
                  <img
                    src={follower.avatar.url}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col ">
                    <Link
                      to={`/user/profile/${follower.username}`}
                      className="body-s-semibold hover:text-gray-600"
                    >
                      {follower.username}
                    </Link>
                    <span className="caption-regular text-gray-500">
                      Suggested for you.
                    </span>
                  </div>
                </div>

                <button
                  className="text-primary-500 body-s-semibold cursor-pointer hover:text-primary-600"
                  type="button"
                  onClick={() =>
                    followMutation.mutate(follower._id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: [
                            "follow-list",
                            { username: user.username, type: "followers" },
                          ],
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["profile"],
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["profile", "me"],
                        });
                      },
                    })
                  }
                >
                  {follower.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RightSideNav;
