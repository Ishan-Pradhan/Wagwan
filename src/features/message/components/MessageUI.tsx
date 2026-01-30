import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { formatTime } from "utils/formatTime";
import IsTypingUI from "./IsTypingUI";
import type { Message } from "../types/MessageType";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "types/LoginTypes";
import { useDeleteMessage } from "../hooks/useDeleteMesssage";
import type { ChatUserType } from "../types/ChatUserType";

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
    <div className="flex flex-col gap-8 container">
      {messages?.map((message: Message) => (
        <div
          className={`flex gap-3 ${
            user._id === message.sender._id
              ? "flex-row-reverse items-center"
              : ""
          } relative group ${
            message.sender._id === user._id ? "self-end" : "self-start"
          }`}
          key={message._id}
        >
          {message.sender._id !== user._id && (
            <img
              src={message.sender.avatar.url}
              alt={message.sender.username}
              className="h-7 w-7 border rounded-full"
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
                  ? "bg-primary-500 text-white rounded-md gap-2 self-end px-4 py-2 break-all"
                  : "self-start bg-gray-200 text-black flex flex-col gap-4 rounded-md px-4 py-2 break-after-all"
              }`}
            >
              {message.attachments?.length > 0 && (
                <div
                  className={`grid gap-2 mt-2 ${
                    message.attachments.length > 1
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {message.attachments.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      className="rounded-md w-50 h-50 object-cover"
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
                  className="cursor-pointer shrink-0 hover:text-gray-500 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
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
