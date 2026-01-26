import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { EditIcon } from "lucide-react";
import type { User } from "types/LoginTypes";
import { useGetUsersList } from "../hooks/useGetUsersList";
import type { Chat } from "../types/ChatType";

function MessageSideMenu({ user }: { user: User }) {
  const { data: chats } = useGetUsersList();

  return (
    <div className="col-span-1 p-4 border-r border-gray-200 h-lvh">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="body-m-semibold">{user?.username}</span>
          <EditIcon />
        </div>

        {/* Search */}
        <div className="flex items-center focus-within:outline focus-within:outline-primary-500 px-2 py-1 border border-gray-300 rounded-full">
          <label htmlFor="searchPeople" className="text-gray-500">
            <MagnifyingGlassIcon />
          </label>
          <input
            id="searchPeople"
            type="search"
            className="w-full px-2 focus:outline-0"
            placeholder="Search"
          />
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-4">
          <span className="body-m-bold">Messages</span>
          <div className="flex flex-col gap-6">
            {chats?.map((chat: Chat) => {
              const receivers = chat.participants.filter(
                (p) => p._id !== user._id,
              );
              const receiver = receivers[0];
              if (!receiver) return null;
              return (
                <div
                  key={chat._id}
                  className="flex gap-4 items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <img
                    src={receiver.avatar.url}
                    alt={receiver.username}
                    className="w-10 h-10 rounded-full"
                  />

                  <div className="flex flex-col">
                    {/* Username of the receiver */}
                    <span className="body-m-medium">{receiver.username}</span>

                    {/* Last message */}
                    <p className="caption-regular">
                      {chat.latestMessage
                        ? `${chat.latestMessage.sender.username}: ${chat.latestMessage.content}`
                        : "No messages yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSideMenu;
