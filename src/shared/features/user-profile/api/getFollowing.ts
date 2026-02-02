import api from "api/api";
import type { FollowingUserType } from "../types/UserDetailsTypes";

export const getFollowing = async ({
  page = 1,
  limit = 10,
  username,
}: {
  page: number;
  limit: number;
  username: string | undefined;
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
