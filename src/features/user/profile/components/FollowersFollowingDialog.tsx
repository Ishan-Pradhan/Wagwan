import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Link } from "react-router";
import { useGetFollowersFollowing } from "../hooks/useGetFollowFollowing";
import { useEffect, useRef } from "react";
import Spinner from "@components/custom-ui/Spinner";
import { useFollowInDialog } from "../hooks/useFollowInDialog";
import { useQueryClient } from "@tanstack/react-query";
import type { FollowersFollowingDialogPropTypes } from "../types/UserDetailsTypes";

function FollowersFollowingDialog({
  open,
  onClose,
  type,
  username,
}: FollowersFollowingDialogPropTypes) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFollowersFollowing({ username, type });

  const followMutation = useFollowInDialog(username, type);

  const queryClient = useQueryClient();

  const handleFollow = (userId: string) => {
    followMutation.mutate(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["follow-list", username, type],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", username],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", "me"],
        });
      },
    });
  };

  const users =
    type === "followers"
      ? (data?.pages.flatMap((p) => p.users ?? []) ?? [])
      : (data?.pages.flatMap((p) => p.users ?? []) ?? []);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !hasNextPage || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "200px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader className="sr-only">
          <DialogTitle>{type}</DialogTitle>
          <DialogDescription>
            {username}'s {type}
          </DialogDescription>
        </DialogHeader>

        <span className="body-l-medium">
          {username}'s {type}
        </span>

        <div
          ref={scrollContainerRef}
          className="relative flex h-80 flex-col gap-8 overflow-y-auto py-4"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {users.length === 0 && (
                <div className="heading-2-medium flex h-full flex-col items-center justify-center gap-1">
                  <span>
                    {type === "followers"
                      ? `No one is currently following ${username}`
                      : `${username} has not followed any one yet`}
                  </span>
                </div>
              )}
              {users.map((user) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={user._id}
                  >
                    <Link to={`/user/profile/${user.username}`}>
                      {user.username}
                    </Link>
                    <button
                      type="button"
                      className="bg-primary-500 hover:bg-primary-700 cursor-pointer rounded-sm px-2 py-1 text-white"
                      onClick={() => handleFollow(user._id)}
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                );
              })}

              {hasNextPage && (
                <div ref={observerRef} className="flex h-10 justify-center">
                  {isFetchingNextPage && <Spinner />}
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FollowersFollowingDialog;
