import Button from "@components/custom-ui/Button";
import { CircleIcon } from "@phosphor-icons/react";
import type { ChatUserType } from "../types/ChatUserType";
import { Link } from "react-router";
import type { User } from "types/LoginTypes";

function MessageSection({
  user,
  activeChatUser,
}: {
  user: User;
  activeChatUser: ChatUserType | null;
}) {
  console.log(activeChatUser);
  return (
    <div className="flex flex-col h-full  w-full col-span-4">
      <div className="py-3 shrink-0 flex gap-4 items-center border-b border-gray-200 w-full px-4">
        <img
          src={user.avatar.url}
          alt="user profile avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="body-l-semibold">{user.username}</span>
          <span className="caption-regular text-gray-500">{user.email}</span>
        </div>
      </div>
      <div className=" flex-1 min-h-0 ">
        {!activeChatUser ? (
          <div className="flex flex-col gap-2 h-148 items-center justify-center py-10">
            <span className="text-center w-full ">
              Select user to message them
            </span>
          </div>
        ) : (
          <div className=" flex flex-col gap-2 h-148 overflow-y-auto py-10">
            <div className="flex flex-col gap-2 justify-center items-center ">
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
                <span className="body-s-regular text-gray-500">{`Wagwan`}</span>
              </div>
              <Link
                to={`/user/profile/${activeChatUser?.username}`}
                type="button"
                className="body-s-medium px-3 py-1 bg-primary-500 text-white cursor-pointer rounded-sm hover:bg-primary-600
                "
              >
                View Profile
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-4 p-4">
        <div className="w-full">
          <input
            type="text"
            className="border border-gray-200 rounded-full w-full h-full py-3 px-3"
            placeholder="Message"
          />
        </div>
        <Button type="button">Send</Button>
      </div>
    </div>
  );
}

export default MessageSection;
