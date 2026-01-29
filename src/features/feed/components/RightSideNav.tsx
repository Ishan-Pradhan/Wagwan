import { useFollow } from "features/user/profile/hooks/useFollow";

import { Link } from "react-router";
import { useAppSelector } from "stores/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFollowersFollowing } from "features/user/profile/hooks/useGetFollowFollowing";

function RightSideNav() {
  const { user } = useAppSelector((state) => state.auth);
  const followMutation = useFollow(user?.username);

  const userAvatar = user?.avatar?.url;

  const { data } = useGetFollowersFollowing({
    username: user?.username,
    type: "followers",
  });

  const followers = data?.pages.flatMap((p) => p.users ?? []) ?? [];

  const queryClient = useQueryClient();

  const noSuggestion = followers?.filter((user) => !user.isFollowing) ?? [];

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
                    <span className="body-s-semibold">{follower.username}</span>
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
                        // this is for refetching
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
