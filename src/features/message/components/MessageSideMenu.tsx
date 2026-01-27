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
import type { ChatUserType } from "../types/ChatUserType";
import { useCreateChat } from "../hooks/useCreateChat";
import { useQueryClient } from "@tanstack/react-query";
import { DotsThreeIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useDeleteChat } from "../hooks/useDeleteChat";

import { useSocket } from "context/socket/SocketContext";
import { MESSAGE_RECEIVED_EVENT, NEW_CHAT_EVENT } from "../const/const";
import { useEffect } from "react";
import type { Message } from "../types/MessageType";

function MessageSideMenu({
  user,
  onSelectUser,
  setChatId,
}: {
  user: User;
  onSelectUser: (user: ChatUserType) => void;
  setChatId: (chatId: string) => void;
}) {
  const { data: chats } = useGetUsersList();
  const { data: chatUsers } = useGetAvailableUsers();
  const createChatMutation = useCreateChat();
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteChat();
  const { socketRef } = useSocket();

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.on(NEW_CHAT_EVENT, (chat: Chat) => {
      console.log("New chat created!", chat);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    socket.on(MESSAGE_RECEIVED_EVENT, (message: Message) => {
      const activeChatId = queryClient.getQueryData<string>(["activeChatId"]);

      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
        old?.map((chat) => {
          if (chat._id !== message.chat) return chat;

          return {
            ...chat,
            latestMessage: message,
            hasUnread: message.chat !== activeChatId,
          };
        }),
      );
    });

    return () => {
      socket.off(NEW_CHAT_EVENT);
      socket.off(MESSAGE_RECEIVED_EVENT);
    };
  }, [socketRef, queryClient]);

  return (
    <div className="lg:col-span-1 col-span-5  p-4 border-r border-gray-200 h-lvh ">
      <div className="flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="body-m-semibold">{user?.username}</span>
        </div>

        {/* Search */}
        <Combobox
          items={chatUsers}
          itemToStringValue={(chatUser: ChatUserType) => chatUser.username}
        >
          <ComboboxInput placeholder="Search User" />

          <ComboboxContent>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem
                  key={item._id}
                  value={""}
                  onClick={() => {
                    createChatMutation.mutate(item._id, {
                      onSuccess: (data) => {
                        queryClient.invalidateQueries({
                          queryKey: ["chats"],
                        });
                        console.log("data in side nav:", data);
                        setChatId(data.data._id);
                      },
                    });
                    onSelectUser(item);
                  }}
                >
                  <div className="flex gap-2 items-center justify-between group">
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.avatar.url}
                        alt={item.username}
                        className="rounded-full h-10 w-10"
                      />
                      <span>{item.username}</span>
                    </div>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {/* Messages */}
        <div className="flex flex-col gap-4 h-full overflow-hidden">
          <span className="body-m-bold">Messages</span>
          <div className="flex flex-col gap-6 h-full overflow-y-auto">
            {chats?.length === 0 && (
              <div className="text-sm text-gray-500">
                You have not messaged any one yet.
              </div>
            )}
            {chats
              ?.filter((chat: Chat) => !chat.isGroupChat)
              ?.map((chat: Chat) => {
                console.log(chat?.latestMessage?.content);
                const receivers = chat.participants.filter(
                  (p) => p._id !== user._id,
                );
                const receiver = receivers[0];
                if (!receiver) return null;
                return (
                  <div
                    key={chat._id}
                    className="flex   hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md cursor-pointer group  justify-between items-center"
                    onClick={() => {
                      onSelectUser(receiver);
                      setChatId(chat._id);

                      queryClient.setQueryData(["activeChatId"], chat._id);

                      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
                        old?.map((c) =>
                          c._id === chat._id ? { ...c, hasUnread: false } : c,
                        ),
                      );
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-4 items-center w-full relative">
                        {chat.hasUnread && (
                          <span className="h-2 w-2 bg-primary-500 rounded-full shrink-0 animate-pulse absolute top-0 right-0" />
                        )}
                        <img
                          src={receiver.avatar.url}
                          alt={receiver.username}
                          className="w-10 h-10 rounded-full"
                        />

                        <div className="flex flex-col">
                          {/* Username of the receiver */}
                          <span className="body-m-medium w-20 overflow-hidden text-ellipsis line-clamp-1">
                            {receiver.username}
                          </span>

                          {/* Last message */}
                          <p className="caption-regular line-clamp-1">
                            {chat.latestMessage
                              ? `${chat.latestMessage.content}`
                              : "No messages yet"}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <DotsThreeIcon
                            size={28}
                            className="cursor-pointer shrink-0 hover:text-gray-500 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={() => {
                                deleteMutation.mutate(chat._id, {
                                  onSuccess: () => {
                                    queryClient.invalidateQueries({
                                      queryKey: ["chats"],
                                    });
                                  },
                                });
                              }}
                            >
                              Delete Chat
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
