import Spinner from "@components/custom-ui/Spinner";
import { Link } from "react-router";
import type { PostsGridPropTypes } from "../../../../shared/features/user-profile/types/PostTypes";
import { CameraIcon, HeartIcon, ChatCircleIcon } from "@phosphor-icons/react";

function PostsGrid({
  posts,
  hasNextPage,
  observerRef,
  isFetchingNextPage,
}: PostsGridPropTypes) {
  if (posts.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center">
        <CameraIcon size={40} weight="duotone" />
        <div className="flex flex-col items-center">
          <h3 className="body-l-medium">No post yet.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3">
      {posts.map((post) => (
        <Link
          to={`/post/${post._id}`}
          className="group relative aspect-square border border-white"
          key={post._id}
        >
          <img
            src={post.images[0].url}
            alt="user post"
            className="aspect-square object-cover"
          />
          <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center gap-4 p-3 transition-all duration-300 ease-in-out group-hover:flex group-hover:bg-gray-800/50">
            <div className="flex items-center gap-2 text-xl text-white lg:text-4xl">
              <HeartIcon weight="fill" />
              <span className="body-l-semibold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-xl text-white lg:text-4xl">
              <ChatCircleIcon weight="fill" />
              <span className="body-l-semibold">{post.comments}</span>
            </div>
          </div>
        </Link>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="flex h-10 justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default PostsGrid;
