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
import Spinner from "@components/ui/Spinner";
import { useFollowInDialog } from "../hooks/useFollowInDialog";
import { useQueryClient } from "@tanstack/react-query";

interface FollowersFollowingDialogPropTypes {
  open: boolean;
  onClose: () => void;
  type: "followers" | "following";
  username: string;
}

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
        // this is for refetching
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
    if (!hasNextPage || !scrollContainerRef.current) return;

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

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
          className="flex flex-col gap-8 h-80 overflow-y-auto py-4 relative"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {users.length === 0 && (
                <div className="heading-2-medium  flex flex-col gap-1 items-center justify-center h-full">
                  <span>
                    {type === "followers"
                      ? `No one is currently following ${username}`
                      : `${username} has not followed any one yet`}
                  </span>
                </div>
              )}
              {users.map((user) => {
                return (
                  <div className="flex justify-between items-center">
                    <Link to={`/user/profile/${user.username}`}>
                      {user.username}
                    </Link>
                    <button
                      type="button"
                      className="bg-primary-500 px-2 py-1 text-white rounded-sm cursor-pointer hover:bg-primary-700"
                      onClick={() => handleFollow(user._id)}
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                );
              })}

              {hasNextPage && (
                <div ref={observerRef} className="h-10 flex justify-center">
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
