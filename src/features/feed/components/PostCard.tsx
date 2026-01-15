import {
  BookmarkSimpleIcon,
  ChatCircleIcon,
  CircleIcon,
  DotsThreeIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";
import { formatTime } from "utils/formatTime";
import PostCardImage from "./PostCardImage";
import { Link } from "react-router";
import { useState } from "react";
import type { Post } from "../types/FeedTypes";

function PostCard({ post }: { post: Post }) {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="w-full flex flex-col gap-2 p-3  max-w-md sm:max-w-lg md:max-w-md  mx-auto">
      <div className="flex justify-between px-4 items-center">
        {/* user info and created time */}
        <div className="flex gap-4 items-center">
          <img
            src={post.author.account.avatar.url}
            alt={post.author.account.username}
            className="w-10 h-10 rounded-full border border-primary-500 cursor-pointer"
          />
          <span className="body-m-semibold cursor-pointer">
            {post.author.account.username}
          </span>

          <div className="flex gap-1 body-m-regular text-gray-700 items-center">
            <CircleIcon weight="fill" size={8} />
            <span>{formatTime(post.createdAt)}</span>
          </div>
        </div>

        {/* menu */}
        <DotsThreeIcon
          size={28}
          className="cursor-pointer hover:text-gray-500"
        />
      </div>

      {/* post */}
      <div className="flex flex-col gap-3 ">
        <PostCardImage images={post.images} />
        <div className="flex flex-col  gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <HeartIcon size={28} weight="fill" fill="red" stroke="2px" />
              <ChatCircleIcon size={28} />
              <ShareFatIcon size={28} />
            </div>
            <BookmarkSimpleIcon size={28} />
          </div>
          <span className="body-s-semibold">{post.likes} likes</span>
        </div>
      </div>

      {/* post description */}
      <div className="flex flex-col">
        <p
          className={`body-s-regular ${
            seeMore ? "line-clap-none" : "line-clamp-2"
          }`}
        >
          <Link to="" className="body-s-bold cursor-pointer inline">
            {post.author.account.username}&nbsp;
          </Link>
          {post.content}
        </p>
        <button
          className={` self-start text-gray-400 cursor-pointer caption-semibold ${
            seeMore ? "hidden" : "flex"
          }`}
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See less" : "See More"}
        </button>
      </div>

      {/* comments */}
      <div className="flex flex-col gap-3 justify-start">
        <button className="body-s-regular text-gray-400 cursor-pointer flex self-start">
          See all {post.comments} comments
        </button>
        <div className="flex w-full justify-between">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 body-s-regular focus:outline-none  peer py-1"
          />
          <button className="border bg-primary cursor-pointer px-2 rounded-sm  justify-center items-center bg-primary-500 body-s-regular text-white hidden hover:bg-primary-600  peer-not-placeholder-shown:flex">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
