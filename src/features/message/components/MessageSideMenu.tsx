import type { User } from "types/LoginTypes";
import { useGetUsersList } from "../hooks/useGetUsersList";
import type { Chat } from "../../../shared/features/message/types/ChatType";
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
import { useNavigate, useSearchParams } from "react-router";
import SkeletonLoading from "./SkeletonLoading";

function MessageSideMenu({
  user,
  onSelectUser,
  setChatId,
}: {
  user: User;
  onSelectUser: (user: ChatUserType) => void;
  setChatId: (chatId: string) => void;
}) {
  const { data: chats, isLoading: chatLoading } = useGetUsersList();
  const { data: chatUsers } = useGetAvailableUsers();
  const createChatMutation = useCreateChat();
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteChat();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeUser = searchParams.get("user");

  const isUserActive = Boolean(activeUser);

  return (
    <div
      className={`col-span-5 h-lvh border-gray-200 p-4 lg:col-span-1 lg:border-r dark:border-gray-600 ${isUserActive ? "hidden lg:flex" : "flex"}`}
    >
      <div className="flex h-full w-full flex-col gap-4">
        {/* Search */}
        <Combobox
          items={chatUsers}
          itemToStringValue={(chatUser: ChatUserType) => chatUser.username}
        >
          <ComboboxInput placeholder="Search User" />

          <ComboboxContent>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxList className="flex flex-col gap-4">
              {(item) => (
                <ComboboxItem
                  key={item._id}
                  value={""}
                  className="cursor-pointer"
                  onClick={() => {
                    createChatMutation.mutate(item._id, {
                      onSuccess: (data) => {
                        queryClient.invalidateQueries({
                          queryKey: ["chats"],
                        });
                        setChatId(data.data._id);
                      },
                    });
                    navigate(`/message?user=${item.username}`);
                    onSelectUser(item);
                  }}
                >
                  <div className="group flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.avatar.url}
                        alt={item.username}
                        className="h-10 w-10 rounded-full"
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
        <div className="flex h-full flex-col gap-4 overflow-hidden">
          <span className="body-m-bold">Messages</span>
          <div className="flex h-full flex-col gap-6 overflow-y-auto">
            {chats?.length === 0 && (
              <div className="text-sm text-gray-500">
                You have not messaged any one yet.
              </div>
            )}
            {chatLoading && (
              <div className="flex flex-col gap-4">
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </div>
            )}
            {chats
              ?.filter((chat: Chat) => !chat.isGroupChat)
              ?.map((chat: Chat) => {
                const receivers = chat.participants.filter(
                  (p) => p._id !== user._id,
                );
                const receiver = receivers[0];
                if (!receiver) return null;
                return (
                  <button
                    type="button"
                    key={chat._id}
                    className={`group cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-600 ${activeUser === receiver.username ? "bg-gray-200 dark:bg-gray-600" : ""}`}
                    onClick={() => {
                      onSelectUser(receiver);
                      setChatId(chat._id);
                      navigate(`/message?user=${receiver.username}`);

                      queryClient.setQueryData(["activeChatId"], chat._id);

                      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
                        old?.map((c) =>
                          c._id === chat._id ? { ...c, hasUnread: false } : c,
                        ),
                      );
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="relative flex w-full gap-4">
                        {chat.hasUnread && (
                          <span className="bg-primary-500 absolute top-0 right-0 h-2 w-2 shrink-0 animate-pulse rounded-full" />
                        )}
                        <img
                          src={receiver.avatar.url}
                          alt={receiver.username}
                          className="h-10 w-10 rounded-full"
                        />

                        <div className="flex flex-col">
                          {/* Username of the receiver */}
                          <span className="body-m-medium line-clamp-1 w-20 overflow-hidden text-start text-ellipsis">
                            {receiver.username}
                          </span>

                          {/* Last message */}
                          <p className="caption-regular line-clamp-1 text-start">
                            {chat.latestMessage
                              ? `${chat.latestMessage.content}`
                              : "No new message"}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <DotsThreeIcon
                            size={28}
                            className="pointer-events-none shrink-0 cursor-pointer opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 hover:text-gray-500"
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
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSideMenu;
