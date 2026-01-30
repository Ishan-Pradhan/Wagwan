import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import type { ChatUserType } from "../types/ChatUserType";

function MessageHeader({ activeChatUser }: { activeChatUser: ChatUserType }) {
  const navigate = useNavigate();
  return (
    <div className="py-3 shrink-0 items-center border-b border-gray-200 w-full px-4 flex gap-5 ">
      <ArrowLeftIcon
        size={30}
        className="cursor-pointer text-primary-500 dark:text-white lg:hidden"
        onClick={() => navigate(-1)}
      />

      <div className="flex gap-4 items-center">
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
