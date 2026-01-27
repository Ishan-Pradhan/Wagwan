import Spinner from "@components/ui/Spinner";
import { Link } from "react-router";
import type { Post } from "../types/PostTypes";
import { CameraIcon, HeartIcon, ChatCircleIcon } from "@phosphor-icons/react";

interface PostsGridPropTypes {
  posts: Post[];
  hasNextPage: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

function PostsGrid({
  posts,
  hasNextPage,
  observerRef,
  isFetchingNextPage,
}: PostsGridPropTypes) {
  if (posts.length === 0) {
    return (
      <div className=" flex justify-center h-60 flex-col items-center">
        <CameraIcon size={40} weight="duotone" />
        <div className="flex flex-col items-center">
          <h3 className="body-l-medium">No post yet.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 ">
      {posts.map((post) => (
        <Link
          to={`/post/${post._id}`}
          className="aspect-square relative group border border-white"
          key={post._id}
        >
          <img
            src={post.images[0].url}
            alt="user post"
            className="aspect-square object-cover"
          />
          <div className="absolute top-0 left-0 h-full w-full hidden group-hover:flex gap-4 items-center justify-center p-3 group-hover:bg-gray-800/50 transition-all duration-300 ease-in-out">
            <div className="flex gap-2 items-center text-white">
              <HeartIcon weight="fill" size={30} />
              <span className="body-l-semibold">{post.likes}</span>
            </div>
            <div className="flex gap-2 items-center text-white">
              <ChatCircleIcon weight="fill" size={30} />
              <span className="body-l-semibold">{post.comments}</span>
            </div>
          </div>
        </Link>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="h-10 flex justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default PostsGrid;
