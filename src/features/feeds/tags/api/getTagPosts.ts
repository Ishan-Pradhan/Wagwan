import api from "api/api";

export const getTagPosts = async ({
  page = 1,
  limit = 10,
  tag,
}: {
  page: number;
  limit: number;
  tag: string | undefined;
}) => {
  const res = await api.get(
    `/social-media/posts/get/t/${tag}?page=${page}&limit=${limit}`,
  );
  const data = res.data.data;

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
