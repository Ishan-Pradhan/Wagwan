import api from "api/api";
import axios from "axios";
import type { PostType } from "../types/PostTypes";
import type { BookmarkType } from "../../../../features/user/profile/types/BookmarkTypes";
import type { FollowersUserType } from "../types/UserDetailsTypes";
import type { FollowingUserType } from "../types/UserDetailsTypes";

export const follow = async (userId: string) => {
  try {
    const res = await api.post(`/social-media/follow/${userId}`, {});

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      throw err.response.data;
    }
  }
};

export const getBookmarks = async ({
  page = 1,
  limit = 10,
}): Promise<BookmarkType> => {
  const res = await api.get(
    `/social-media/bookmarks?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    bookmarkedPosts: data?.bookmarkedPosts ?? [],
    totalBookmarkedPosts: data?.totalBookmarkedPosts ?? 0,
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

export const getMyPosts = async ({
  page = 1,
  limit = 10,
}): Promise<PostType> => {
  const res = await api.get(
    `/social-media/posts/get/my?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    posts: data?.posts ?? [],
    totalPosts: data?.totalPosts ?? 0,
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

export const getMyProfile = async () => {
  const res = await api.get(`/social-media/profile`);

  const data = res.data?.data;

  return data;
};

export const getUsersPosts = async ({
  page = 1,
  limit = 10,
  username,
}: {
  page: number;
  limit: number;
  username: string;
}): Promise<PostType> => {
  const res = await api.get(
    `/social-media/posts/get/u/${username}?page=${page}&limit=${limit}`,
  );

  const data = res.data?.data;

  return {
    posts: data?.posts ?? [],
    totalPosts: data?.totalPosts ?? 0,
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

export const getUsersProfile = async (username: string | undefined) => {
  const res = await api.get(`/social-media/profile/u/${username}`);

  const data = res.data?.data;

  return data;
};
