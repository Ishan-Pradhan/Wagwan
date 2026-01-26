import { useQuery } from "@tanstack/react-query";
import type { ChatUserType } from "../types/ChatUserType";
import { getAvailableUsers } from "../api/getAvailableUsers";

export const useGetAvailableUsers = () => {
  return useQuery<ChatUserType[]>({
    queryKey: ["chatsUsers"],
    queryFn: () => getAvailableUsers(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
