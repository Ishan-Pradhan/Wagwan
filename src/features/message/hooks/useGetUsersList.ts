import { useQuery } from "@tanstack/react-query";
import { getUsersList } from "../api/getUsersList";
import type { Chat } from "../types/ChatType";

export const useGetUsersList = () => {
  return useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: () => getUsersList(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
