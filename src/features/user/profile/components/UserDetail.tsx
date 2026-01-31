import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { GearIcon } from "@phosphor-icons/react";
import { useFollow } from "../../../../shared/features/user-profile/hooks/useFollow";
import { useState } from "react";
import FollowersFollowingDialog from "./FollowersFollowingDialog";
import { Link, useNavigate } from "react-router";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Switch } from "@components/ui/switch";
import { useTheme } from "context/Theme/ThemeContext";
import type {
  DialogType,
  UserDetailProps,
} from "../../../../shared/features/user-profile/types/UserDetailsTypes";

function UserDetail({ profile, user, posts, logout }: UserDetailProps) {
  const followMutation = useFollow(profile?.account.username);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleFollow = (userId: string) => {
    followMutation.mutate(userId);
  };
  return (
    <div className="mx-auto">
      <div className="flex w-full items-center gap-10 lg:justify-between">
        {/* image */}
        <div>
          <img
            className="h-20 w-20 shrink-0 rounded-full border border-gray-200 lg:h-30 lg:w-30"
            src={profile?.account?.avatar.url}
            alt="user avatar"
          />
        </div>

        {/* user details */}
        <div className="flex flex-1 flex-col gap-2 lg:gap-5">
          {/* user info and interactions */}
          <div className="flex items-center gap-5">
            <span className="body-l-medium">{profile?.account?.username}</span>
            {user?._id === profile?.owner ? (
              <Link
                to="/user/profile/edit-profile"
                className="body-s-semibold hidden cursor-pointer rounded-md bg-gray-100 px-4 py-1.5 text-gray-900 hover:bg-gray-200 lg:flex"
              >
                Edit Profile
              </Link>
            ) : (
              <button
                type="button"
                className={`body-s-semibold hidden cursor-pointer self-start rounded-sm px-3 py-1 lg:flex ${profile?.isFollowing ? "bg-gray-200 text-black" : "bg-primary-500 text-white"}`}
                onClick={() => handleFollow(profile?.account._id)}
              >
                {profile?.isFollowing ? "Following" : "Follow"}
              </button>
            )}
            {user?._id === profile?.owner && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <GearIcon
                    size={24}
                    className="cursor-pointer hover:text-gray-500"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="body-s-regular mb-1 text-gray-500">
                      Switch Theme
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="r flex w-full items-center gap-5 hover:bg-gray-100">
                      <label
                        htmlFor="dark-mode"
                        className="body-s-regular cursor-pointer"
                      >
                        Dark Mode
                      </label>
                      <Switch
                        className="cursor-pointer"
                        id="dark-mode"
                        checked={theme === "dark"}
                        onCheckedChange={toggleTheme}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100"
                      onSelect={() => navigate("/user/profile/change-password")}
                    >
                      Change Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100"
                      onSelect={logout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {user?._id === profile?.owner ? (
            <Link
              to="/user/profile/edit-profile"
              className="body-s-semibold flex cursor-pointer self-start rounded-md bg-gray-100 px-4 py-1.5 text-gray-900 hover:bg-gray-200 lg:hidden"
            >
              Edit Profile
            </Link>
          ) : (
            <button
              type="button"
              className={`bg-primary-500 flex cursor-pointer self-start rounded-sm px-3 py-1 text-white lg:hidden ${profile?.isFollowing ? "bg-gray-200 text-black" : "bg-primary-500 text-white"}`}
              onClick={() => handleFollow(profile?.account._id)}
            >
              {profile?.isFollowing ? "Following" : "Follow"}
            </button>
          )}

          {/* followers, posts and following counts */}
          <div className="flex items-center gap-5 lg:gap-10">
            <div className="flex items-center gap-1">
              <span className="body-l-semibold">{posts.length}</span>
              <span className="body-m-regular text-gray-600">posts</span>
            </div>
            <button
              className="group flex cursor-pointer items-center gap-1"
              onClick={() => setDialogType("followers")}
            >
              <span className="body-l-semibold">{profile?.followersCount}</span>
              <span className="body-m-regular text-gray-600 group-hover:text-gray-400">
                followers
              </span>
            </button>
            <button
              className="group flex cursor-pointer items-center gap-1"
              onClick={() => setDialogType("following")}
            >
              <span className="body-l-semibold">{profile?.followingCount}</span>
              <span className="body-m-regular text-gray-600 group-hover:text-gray-400">
                following
              </span>
            </button>
          </div>

          <div className="flex flex-col">
            {/* user's full name  */}
            <div className="body-s-bold hidden gap-1 lg:flex">
              <span>{profile?.firstName}</span>
              <span>{profile?.lastName}</span>
            </div>

            {/* user's bio */}
            <p className="body-s-regular hidden lg:flex">{profile?.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* user's full name  */}
        <div className="body-s-bold flex gap-1 lg:hidden">
          <span>{profile?.firstName}</span>
          <span>{profile?.lastName}</span>
        </div>
        <p className="body-s-regular lg:hidden">{profile?.bio}</p>
      </div>

      {dialogType && (
        <FollowersFollowingDialog
          type={dialogType}
          open={true}
          onClose={() => setDialogType(null)}
          username={profile?.account.username}
        />
      )}
    </div>
  );
}

export default UserDetail;
