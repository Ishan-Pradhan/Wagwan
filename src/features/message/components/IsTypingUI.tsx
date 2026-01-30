import { CircleIcon } from "@phosphor-icons/react";
import type { ChatUserType } from "../types/ChatUserType";

function IsTypingUI({ activeChatUser }: { activeChatUser: ChatUserType }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={activeChatUser.avatar.url}
        alt={activeChatUser.username}
        className="h-7 w-7 border rounded-full"
      />
      <div className="self-start bg-gray-100 text-gray-500 rounded-full p-2 italic text-xs">
        <div className="flex gap-2">
          <CircleIcon
            size={10}
            weight="fill"
            className="animate-[ellipsis-up_1s_ease-in-out_infinite]"
          />
          <CircleIcon
            size={10}
            weight="fill"
            className="animate-[ellipsis-up_1s_ease-in-out_infinite] delay-75"
          />
          <CircleIcon
            size={10}
            weight="fill"
            className="animate-[ellipsis-up_1s_ease-in-out_infinite] delay-100"
          />
        </div>
      </div>
    </div>
  );
}

export default IsTypingUI;
