import { EditIcon } from "lucide-react";
import type { User } from "types/LoginTypes";
import { useGetUsersList } from "../hooks/useGetUsersList";
import type { Chat } from "../types/ChatType";
import { useGetAvailableUsers } from "../hooks/useGetAvailableUsers";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@components/ui/combobox";

function MessageSideMenu({ user }: { user: User }) {
  const { data: chats } = useGetUsersList();
  console.log("🚀 ~ MessageSideMenu ~ chats:", chats);
  const { data: chatUsers } = useGetAvailableUsers();
  console.log("🚀 ~ MessageSideMenu ~ chatUsers:", chatUsers);

  return (
    <div className="col-span-1 p-4 border-r border-gray-200 h-lvh">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="body-m-semibold">{user?.username}</span>
          <EditIcon />
        </div>

        {/* Search */}
        <Combobox items={chatUsers}>
          <ComboboxInput placeholder="Search User" />
          <ComboboxContent>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item._id} value={item}>
                  <div className="flex gap-2 items-center">
                    <img
                      src={item?.avatar.url}
                      alt=""
                      className="rounded-full h-10 w-10"
                    />
                    <span className="">{item.username}</span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {/* Messages */}
        <div className="flex flex-col gap-4">
          <span className="body-m-bold">Messages</span>
          <div className="flex flex-col gap-6">
            {chats?.length === 0 && (
              <div className="text-sm text-gray-500">
                You have not messaged any one yet.
              </div>
            )}
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
