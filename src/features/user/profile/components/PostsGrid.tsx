import Spinner from "@components/ui/Spinner";
import { Link } from "react-router";
import type { Post } from "../types/PostTypes";

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
  return (
    <div className="grid grid-cols-3">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} className="aspect-square">
          <img
            src={post.images[0].url}
            alt="user post"
            className="aspect-square object-cover"
          />
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
