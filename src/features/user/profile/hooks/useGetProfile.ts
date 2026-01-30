import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/getMyProfile";
import { getUsersProfile } from "../api/getUsersProfile";
import { useAppSelector } from "stores/hooks";

export const useGetProfile = (username?: string) => {
  const { user } = useAppSelector((state) => state.auth);

  const isOwner = !username || user?.username === username;

  return useQuery({
    queryKey: ["profile", isOwner ? "me" : username],
    queryFn: () => (isOwner ? getMyProfile() : getUsersProfile(username)),
    enabled: isOwner || !!username,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
