import api from "api/api";
import type { FollowersUserType } from "../types/UserDetailsTypes";

export const getFollowers = async ({
  page = 1,
  limit = 10,
  username,
}: {
  page: number;
  limit: number;
  username: string | undefined;
}): Promise<FollowersUserType> => {
  const res = await api.get(
    `/social-media/follow/list/followers/${username}?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    users: data?.followers ?? [],
    total: data?.totalFollowers ?? 0,
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
