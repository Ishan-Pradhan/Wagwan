import { HeartIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import type { Comment } from "../types/CommentTypes";

function CommentSection({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-8  items-start">
      <Link to="">
        <img
          src={comment.author.account.avatar.url}
          alt="user avatar"
          className="w-10 h-10 rounded-full"
        />
      </Link>
      <div className="flex-1 ">
        <p className={`body-s-regular `}>
          <Link to="" className="body-s-bold cursor-pointer inline">
            {comment.author.account.username}&nbsp;
          </Link>
          {comment.content}
        </p>
      </div>
      <button className="cursor-pointer">
        <HeartIcon />
      </button>{" "}
    </div>
  );
}

export default CommentSection;
