import { useFollow } from "shared/features/user-profile/hooks/useFollow";

import { Link } from "react-router";
import { useAppSelector } from "stores/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFollowersFollowing } from "shared/features/user-profile/hooks/useGetFollowFollowing";

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
    <div className="flex w-2/3 flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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

      <div className="flex w-full flex-col gap-5">
        <span className="body-m-bold">Suggested for you</span>
        <div className="flex w-full flex-col gap-8">
          {noSuggestion.length === 0 && (
            <span className="body-s-regular text-gray-500">
              No suggestion for you currently
            </span>
          )}

          {isLoading && (
            <div className="flex flex-col gap-8">
              <div className="flex w-full items-center justify-between">
                <div className="flex gap-4">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-15 animate-pulse rounded-full bg-gray-600"></div>
                    <div className="h-3 w-20 animate-pulse rounded-full bg-gray-400"></div>
                  </div>
                </div>
                <div className="h-3 w-7 animate-pulse rounded-full bg-gray-600"></div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex gap-4">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-15 animate-pulse rounded-full bg-gray-600"></div>
                    <div className="h-3 w-20 animate-pulse rounded-full bg-gray-400"></div>
                  </div>
                </div>
                <div className="h-3 w-7 animate-pulse rounded-full bg-gray-600"></div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex gap-4">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-15 animate-pulse rounded-full bg-gray-600"></div>
                    <div className="h-3 w-20 animate-pulse rounded-full bg-gray-400"></div>
                  </div>
                </div>
                <div className="h-3 w-7 animate-pulse rounded-full bg-gray-600"></div>
              </div>
            </div>
          )}
          {followers
            .filter((user) => user.isFollowing === false)
            .map((follower) => (
              <div
                className="flex w-full items-center justify-between"
                key={follower._id}
              >
                <div className="flex gap-4">
                  <img
                    src={follower.avatar.url}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col">
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
                  className="text-primary-500 body-s-semibold hover:text-primary-600 cursor-pointer"
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
