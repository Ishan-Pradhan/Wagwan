import { CircleIcon } from "@phosphor-icons/react";
import type { ChatUserType } from "../types/ChatUserType";
import { Link } from "react-router";

function ReceiverInfo({ activeChatUser }: { activeChatUser: ChatUserType }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img
        src={activeChatUser?.avatar.url}
        alt="user profile avatar"
        className="h-15 w-15 rounded-full object-cover"
      />
      <div className="flex items-center gap-2">
        <span className="body-s-regular text-gray-500">
          {activeChatUser?.username}
        </span>
        <CircleIcon weight="fill" fill="gray" size={4} />
        <span className="body-s-regular text-gray-500">Wagwan</span>
      </div>
      <Link
        to={`/user/profile/${activeChatUser?.username}`}
        className="body-s-medium border-primary-500 hover:bg-primary-600 text-primary-500 cursor-pointer rounded-sm border px-3 py-1 hover:text-white"
      >
        View Profile
      </Link>
    </div>
  );
}

export default ReceiverInfo;
