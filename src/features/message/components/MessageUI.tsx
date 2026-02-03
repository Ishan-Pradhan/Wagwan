import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { formatTime } from "utils/formatTime";
import IsTypingUI from "./IsTypingUI";
import type { Message } from "../../../shared/features/message/types/MessageType";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "types/LoginTypes";
import type { ChatUserType } from "../types/ChatUserType";
import { useDeleteMessage } from "../hooks/useDeleteMessage";

function MessageUI({
  messages,
  user,
  chatId,
  isTyping,
  activeChatUser,
}: {
  messages: Message[];
  user: User;
  chatId: string;
  isTyping: boolean;
  activeChatUser: ChatUserType;
}) {
  const queryClient = useQueryClient();
  const deleteMessageMutation = useDeleteMessage();

  return (
    <div className="container flex flex-col gap-8">
      {messages?.map((message: Message) => (
        <div
          className={`flex gap-3 ${
            user._id === message.sender._id
              ? "flex-row-reverse items-center"
              : ""
          } group relative ${
            message.sender._id === user._id ? "self-end" : "self-start"
          }`}
          key={message._id}
        >
          {message.sender._id !== user._id && (
            <img
              src={message.sender.avatar.url}
              alt={message.sender.username}
              className="h-7 w-7 rounded-full border object-cover"
            />
          )}

          <div
            className={`flex flex-col gap-2 ${
              message.sender._id === user._id ? "items-end" : ""
            }`}
          >
            <span
              className={`body-m-regular ${
                message.sender._id === user._id
                  ? "bg-primary-500 gap-3 self-end rounded-md px-4 py-2 break-all text-white"
                  : "flex break-after-all flex-col gap-3 self-start rounded-md bg-gray-200 px-4 py-2 text-black"
              }`}
            >
              {message.attachments?.length > 0 && (
                <div
                  className={`mt-2 grid gap-2 ${
                    message.attachments.length > 1
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {message.attachments.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      className="h-50 w-50 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              {message.content}
            </span>
            <span className="caption-regular text-gray-500">
              {formatTime(message.createdAt)}
            </span>
          </div>

          {user._id === message.sender._id && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <DotsThreeIcon
                  size={28}
                  className="shrink-0 cursor-pointer hover:text-gray-500 lg:pointer-events-none lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => {
                      deleteMessageMutation.mutate(
                        { chatId, messageId: message._id },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["chats"],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["chat_messages", chatId],
                            });
                          },
                        },
                      );
                    }}
                  >
                    Delete Message
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}

      {isTyping && <IsTypingUI activeChatUser={activeChatUser} />}
    </div>
  );
}

export default MessageUI;
