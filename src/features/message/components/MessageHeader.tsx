import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import type { ChatUserType } from "../types/ChatUserType";

function MessageHeader({ activeChatUser }: { activeChatUser: ChatUserType }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full shrink-0 items-center gap-5 border-b border-gray-200 px-4 py-3">
      <ArrowLeftIcon
        size={30}
        className="text-primary-500 cursor-pointer lg:hidden dark:text-white"
        onClick={() => navigate(-1)}
      />

      <div className="flex items-center gap-4">
        <img
          src={activeChatUser?.avatar.url}
          alt="user profile avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="body-l-semibold">{activeChatUser?.username}</span>
          <span className="caption-regular text-gray-500">
            {activeChatUser?.email}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;
