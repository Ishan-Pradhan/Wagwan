import api from "api/api";
import type { Media, UserProfile } from "../components/UserDetail";

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

export const getFollowing = async ({
  page = 1,
  limit = 10,
  username,
}: {
  page: number;
  limit: number;
  username: string;
}): Promise<FollowingUserType> => {
  const res = await api.get(
    `/social-media/follow/list/following/${username}?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    users: data?.following ?? [],
    total: data?.totalFollowing ?? 0,
    limit: data?.limit ?? 10,
    totalPages: data?.totalPages ?? 1,
    page: data?.page ?? 1,
    serialNumberStartFrom: data?.serialNumberStartFrom ?? 1,
    hasPrevPage: data?.hasPrevPage ?? false,
    hasNextPage: data?.hasNextPage ?? false,
    prevPage: data?.prevPage ?? null,
    nextPage: data?.nextPage ?? null,
  };
};
