import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../api/userProfile";
import type { UserProfile } from "../types/UserDetailsTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPosts } from "../api/userProfile";
import { getUsersPosts } from "../api/userProfile";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/userProfile";
import { getUsersProfile } from "../api/userProfile";
import { useAppSelector } from "stores/hooks";
import { getFollowers } from "../api/userProfile";
import { getFollowing } from "../api/userProfile";

export const useFollow = (username: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: follow,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["profile", username] });

      const previousProfile = queryClient.getQueryData<UserProfile>([
        "profile",
        username,
      ]);

      queryClient.setQueryData(["profile", username], (old: UserProfile) => {
        if (!old) return old;

        return {
          ...old,
          isFollowing: !old.isFollowing,
          followersCount: old.isFollowing
            ? old.followersCount - 1
            : old.followersCount + 1,
        };
      });

      return { previousProfile };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers", username] });
    },
    onError: (_err, _vars, context) => {
      // Rollback on failure
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["profile", username],
          context.previousProfile,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
};

export const useGetFollowersFollowing = ({
  username,
  type,
}: {
  username: string | undefined;
  type: "followers" | "following";
}) => {
  return useInfiniteQuery({
    queryKey: ["follow-list", { username, type }],
    initialPageParam: 1 as number,
    enabled: !!username,

    queryFn: async ({ pageParam }) => {
      if (type === "followers") {
        const data = await getFollowers({
          username,
          page: pageParam,
          limit: 10,
        });
        return data;
      } else {
        const data = await getFollowing({
          username,
          page: pageParam,
          limit: 10,
        });
        return data;
      }
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
};

export const useGetPosts = (username?: string) => {
  const { user } = useAppSelector((state) => state.auth);

  const isOwner = !username || user?.username === username;

  return useInfiniteQuery({
    queryKey: ["posts", isOwner ? "me" : username],
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      isOwner
        ? getMyPosts({ page: pageParam, limit: 12 })
        : getUsersPosts({
            username: username,
            page: pageParam,
            limit: 10,
          }),

    enabled: isOwner || !!username,

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
};

export const useGetProfile = (username?: string) => {
  const { user } = useAppSelector((state) => state?.auth);

  const isOwner = !username || user?.username === username;

  return useQuery({
    queryKey: ["profile", isOwner ? "me" : username],
    queryFn: () => (isOwner ? getMyProfile() : getUsersProfile(username)),
    enabled: isOwner || !!username,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// import React, { useRef, useState,useEffect } from 'react'
// import Confetti from 'js-confetti'
// import './style.css'

// const confetti = new Confetti()

// const useDebounce = (value, delay)=>{
//   const [debounceValue, setDebounceValue] = useState(value);

// useEffect(() => {
//   const timer = setTimeout(()=>{
//       setDebounceValue(value)
//   },delay);

//   return () => {
//     clearTimeout(timer)
//   }
// },[value,delay])

//     return debounceValue
// }

// const App = () => {
//   const [input, setInput] = useState("");
//     const debounce = useDebounce(input, 3000);

//     useEffect(() => {
//       if(!debounce) return;

//         fetch(`https://dummyjson.com/users/search?q=${debounce}`)
// .then(res => res.json())
// .then(console.log);

//       },[debounce])

//   return (
//      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
//   )
// }

// export default App
