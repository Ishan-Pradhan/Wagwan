import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { GearIcon } from "@phosphor-icons/react";
import type { Post } from "../types/PostTypes";
import type { User } from "types/LoginTypes";
import { useFollow } from "../hooks/useFollow";
import { useState } from "react";
import FollowersFollowingDialog from "./FollowersFollowingDialog";
import { Link } from "react-router";

export interface Media {
  _id: string;
  url: string;
  localPath: string;
}

export interface Account {
  _id: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  avatar: Media;
}

export interface UserProfile {
  _id: string;
  owner: string;

  account: Account;

  firstName: string;
  lastName: string;
  bio: string;

  dob: string | null;

  phoneNumber: string;
  countryCode: string;
  location: string;

  coverImage: Media;

  followersCount: number;
  followingCount: number;
  isFollowing: boolean;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

// FIXME user not being able to view the followers or following more than 10 even if there are more data

interface UserDetailProps {
  posts: Post[];
  user: User | null;
  logout: () => void;
  profile: UserProfile;
}

type DialogType = "followers" | "following" | null;

function UserDetail({ profile, user, posts, logout }: UserDetailProps) {
  const followMutation = useFollow(profile.account.username);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const handleFollow = (userId: string) => {
    followMutation.mutate(userId);
  };
  return (
    <div className="mx-auto ">
      <div className="flex lg:justify-between  gap-4  items-center  w-full">
        {/* image */}
        <div>
          <img
            className="lg:h-30 lg:w-30 w-10 h-10 rounded-full border border-gray-200"
            src={profile?.account?.avatar.url}
            alt="user avatar"
          />
        </div>

        {/* user details */}
        <div className="flex flex-1  flex-col lg:gap-5 gap-2">
          {/* user info and interactions */}
          <div className="flex gap-5 items-center ">
            <span className="body-l-medium">{profile?.account?.username}</span>
            {user?._id === profile.owner ? (
              <Link
                to="/user/profile/edit-profile"
                className="hidden lg:flex bg-gray-100 body-m-medium cursor-pointer hover:bg-gray-200 text-gray-900 rounded-md px-3 py-1"
              >
                Edit Profile
              </Link>
            ) : (
              <button
                type="button"
                className="hidden lg:flex self-start bg-primary-500 text-white px-3 py-1 rounded-sm cursor-pointer"
                onClick={() => handleFollow(profile.account._id)}
              >
                {profile.isFollowing ? "Following" : "Follow"}
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

          {user?._id === profile.owner ? (
            <button className="lg:hidden flex self-start bg-gray-100 body-m-medium cursor-pointer hover:bg-gray-200 text-gray-900 rounded-md px-3 py-1">
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              className="lg:hidden flex self-start bg-primary-500 text-white px-3 py-1 rounded-sm cursor-pointer"
              onClick={() => handleFollow(profile.account._id)}
            >
              {profile.isFollowing ? "Following" : "Follow"}
            </button>
          )}

          {/* followers, posts and following counts */}
          <div className="flex gap-10 items-center">
            <div className="flex gap-1 items-center">
              <span className="body-l-semibold">{posts.length}</span>
              <span className="body-m-regular text-gray-600">posts</span>
            </div>
            <button
              className="flex gap-1 items-center cursor-pointer group"
              onClick={() => setDialogType("followers")}
            >
              <span className="body-l-semibold">{profile.followersCount}</span>
              <span className="body-m-regular text-gray-600 group-hover:text-gray-400">
                followers
              </span>
            </button>
            <button
              className="flex gap-1 items-center cursor-pointer group"
              onClick={() => setDialogType("following")}
            >
              <span className="body-l-semibold">{profile.followingCount}</span>
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

      {dialogType && (
        <FollowersFollowingDialog
          type={dialogType}
          open={true}
          onClose={() => setDialogType(null)}
          username={profile.account.username}
        />
      )}
    </div>
  );
}

export default UserDetail;
