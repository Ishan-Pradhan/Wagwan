import { CircleIcon } from "@phosphor-icons/react";
import { formatTime } from "utils/formatTime";
import PostCardImage from "./PostCardImage";
import { Link } from "react-router";
import { useState } from "react";
import InteractionContainer from "./InteractionContainer";
import type { Post } from "./types/FeedTypes";
import PostCommentInput from "./PostCommentInput";
import PostMenu from "../post-menu/PostMenu";

function PostCard({
  post,
  onOpenComments,
}: {
  post: Post;
  onOpenComments: (post: Post) => void;
}) {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 p-3 sm:max-w-lg md:max-w-md">
      <div className="flex items-center justify-between px-4">
        {/* user info and created time */}
        <div className="flex items-center gap-3">
          <Link
            to={`/user/profile/${post.author.account?.username}`}
            className="flex items-center gap-3"
          >
            <img
              src={post.author.account?.avatar.url}
              alt={`${post.author.account?.username}'s avatar`}
              className="h-9 w-9 cursor-pointer rounded-full border border-gray-500 object-cover"
            />

            <span className="body-s-semibold cursor-pointer">
              {post.author.account?.username}
            </span>
          </Link>

          <div className="caption-medium flex items-center gap-2 text-gray-400">
            <CircleIcon weight="fill" size={5} />
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              aria-label={`Posted ${formatTime(post?.createdAt)} ago`}
            >
              {formatTime(post?.createdAt)}
            </time>
          </div>
          {post?.updatedAt !== post?.createdAt && (
            <div className="caption-medium flex items-center gap-2 text-gray-400">
              <CircleIcon weight="fill" size={5} />
              <span>Edited</span>
            </div>
          )}
        </div>

        {/* menu */}
        <PostMenu post={post} />
      </div>

      {/* post */}
      <div className="flex aspect-4/5 h-full flex-col gap-3">
        <PostCardImage images={post?.images} />

        {/* like comment share and save */}
        <InteractionContainer post={post} onOpenComments={onOpenComments} />
      </div>

      {/* post description */}
      <div className="flex flex-col">
        <p
          className={`body-s-regular ${
            seeMore ? "line-clap-none" : "line-clamp-2"
          } `}
        >
          <Link
            to={`/user/profile/${post.author.account?.username}`}
            className="body-s-bold inline cursor-pointer"
            aria-label={`posted by ${post.author.account?.username}`}
          >
            {post.author.account?.username}&nbsp;
          </Link>
          <span aria-label="post content">{post?.content}</span>
        </p>

        <button
          className={`caption-semibold cursor-pointer self-start text-gray-400 ${
            post.content.length < 50 ? "hidden" : "flex"
          } `}
          onClick={() => setSeeMore(!seeMore)}
          aria-label={seeMore ? "See less " : "See More"}
        >
          {seeMore ? "See Less" : "See More"}
        </button>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <Link
              to={`/posts/tags/${tag}`}
              className="text-primary-800 caption-semibold"
              key={index}
              aria-label={`#${tag}`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* comments */}
      <div className="flex flex-col justify-start gap-3">
        {/* <button
          className={`body-s-regular text-gray-400 cursor-pointer  self-start ${
            post.comments === 0 ? "hidden" : "flex"
          }`}
          onClick={() => onOpenComments(post)}
        >
          See all {post.comments} comments
        </button> */}
        <PostCommentInput postId={post._id} />
      </div>
    </div>
  );
}

export default PostCard;
