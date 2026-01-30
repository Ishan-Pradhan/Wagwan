import { CircleIcon } from "@phosphor-icons/react";
import type { ChatUserType } from "../types/ChatUserType";
import { Link } from "react-router";

function ReceiverInfo({ activeChatUser }: { activeChatUser: ChatUserType }) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <img
        src={activeChatUser?.avatar.url}
        alt="user profile avatar"
        className="w-15 h-15 rounded-full"
      />
      <div className="flex gap-2 items-center">
        <span className="body-s-regular text-gray-500">
          {activeChatUser?.username}
        </span>
        <CircleIcon weight="fill" fill="gray" size={4} />
        <span className="body-s-regular text-gray-500">Wagwan</span>
      </div>
      <Link
        to={`/user/profile/${activeChatUser?.username}`}
        className="body-s-medium px-3 py-1 bg-primary-500 text-white cursor-pointer rounded-sm hover:bg-primary-600"
      >
        View Profile
      </Link>
    </div>
  );
}

export default ReceiverInfo;
