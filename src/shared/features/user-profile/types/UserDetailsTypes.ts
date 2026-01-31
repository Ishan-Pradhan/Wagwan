import type { User } from "types/LoginTypes";
import type { Post } from "./PostTypes";

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

export interface UserDetailProps {
  posts: Post[];
  user: User | null;
  logout: () => void;
  profile: UserProfile;
}

export type DialogType = "followers" | "following" | null;

export interface Followers {
  _id: string;
  username: string;
  email: string;
  avatar: Media;
  isFollowing: boolean;
  profile: UserProfile;
}

export interface FollowersUserType {
  users: Followers[];
  total: number;
  limit: number;
  page: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Following {
  _id: string;
  username: string;
  email: string;
  avatar: Media;
  isFollowing: boolean; // relative to current logged-in user
  profile: UserProfile;
}

export interface FollowingUserType {
  users: Following[];
  total: number;
  limit: number;
  page: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

export interface FollowersFollowingDialogPropTypes {
  open: boolean;
  onClose: () => void;
  type: "followers" | "following";
  username: string;
}
