import Button from "@components/custom-ui/Button";
import { ChatsIcon, CircleIcon, DotsThreeIcon } from "@phosphor-icons/react";
import type { ChatUserType } from "../types/ChatUserType";
import { Link } from "react-router";
import type { User } from "types/LoginTypes";
import type { Message } from "../types/MessageType";
import { useGetMessageInChat } from "./../hooks/useGetMessageInChat";
import { useEffect, useState } from "react";
import { useSocket } from "context/socket/SocketContext";
import {
  JOIN_CHAT_EVENT,
  LEAVE_CHAT_EVENT,
  MESSAGE_DELETE_EVENT,
  MESSAGE_RECEIVED_EVENT,
  STOP_TYPING_EVENT,
  TYPING_EVENT,
} from "../const/const";
import { useQueryClient } from "@tanstack/react-query";
import { useSendMessage } from "../hooks/useSendMessage";
import LottieLoading from "@components/ui/LottieLoading";
import { formatTime } from "utils/formatTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useDeleteMessage } from "../hooks/useDeleteMesssage";

function MessageSection({
  user,
  activeChatUser,
  chatId,
}: {
  user: User;
  activeChatUser: ChatUserType | null;
  chatId: string;
}) {
  const { data, isPending } = useGetMessageInChat(chatId);
  const messages = data?.slice().reverse();
  const [messageToBeSent, setMessageToBeSent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  const { socketRef } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socketRef.current || !chatId) return;

    const socket = socketRef.current;

    socket.emit(JOIN_CHAT_EVENT, chatId);

    socket.on(MESSAGE_RECEIVED_EVENT, (message) => {
      console.log("New message arrived!", message);
      queryClient.invalidateQueries({ queryKey: ["chat_messages", chatId] });
    });

    socket.on(TYPING_EVENT, (id: string) => {
      if (id === chatId) setIsTyping(true);
    });

    socket.on(STOP_TYPING_EVENT, (id: string) => {
      if (id === chatId) setIsTyping(false);
    });

    socket.on(MESSAGE_DELETE_EVENT, () => {
      queryClient.invalidateQueries({ queryKey: ["chat_messages", chatId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    // Cleanup: Leave the room and stop listening when switching chats
    return () => {
      socket.emit(LEAVE_CHAT_EVENT, chatId);
      // socket.off(MESSAGE_RECEIVED_EVENT);
      socket.off(TYPING_EVENT);
      socket.off(STOP_TYPING_EVENT);
      socket.off(MESSAGE_DELETE_EVENT);
    };
  }, [chatId, socketRef, queryClient]);

  const sendMessageMutation = useSendMessage();

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToBeSent(e.target.value);

    if (!socketRef.current || !chatId) return;

    socketRef.current.emit(TYPING_EVENT, chatId);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      socketRef.current?.emit(STOP_TYPING_EVENT, chatId);
    }, 3000);

    setTypingTimeout(timeout);
  };

  const sendMessage = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      socketRef.current?.emit(STOP_TYPING_EVENT, chatId);
    }

    sendMessageMutation.mutate(
      { chatId, content: messageToBeSent },
      {
        onSuccess: () => {
          setMessageToBeSent("");
          queryClient.invalidateQueries({
            queryKey: ["chat_messages", chatId],
          });
        },
      },
    );
  };

  const deleteMessageMutation = useDeleteMessage();

  return (
    <div className="flex flex-col h-lvh overflow-hidden  w-full col-span-4 pb-10 lg:pb-0">
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
      <div className=" flex-1 min-h-0 overflow-hidden">
        {!activeChatUser ? (
          <div className="flex flex-col gap-2 h-full  items-center justify-center py-10">
            <div className="flex justify-center items-center p-3 border rounded-full ">
              <ChatsIcon size={24} />
            </div>
            <div className="flex flex-col  items-center">
              <span className="text-center w-full body-l-medium">
                Your Messages
              </span>
              <p className="body-s-regular text-gray-500">
                Send a message to start a chat.
              </p>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-2 h-full overflow-y-auto py-10">
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
            {isPending ? (
              <LottieLoading />
            ) : (
              <div className="flex flex-col gap-3  container">
                {messages?.map((message: Message) => (
                  <div
                    className={`flex gap-2 ${user._id === message.sender._id ? "flex-row-reverse items-center" : ""} relative group  ${message?.sender._id === user._id ? " self-end" : "self-start"}`}
                    key={message._id}
                  >
                    {message?.sender._id !== user._id && (
                      <img
                        src={message.sender.avatar.url}
                        alt={message?.sender?.username}
                        className="h-7 w-7 border rounded-full"
                      />
                    )}

                    <div
                      className={` flex flex-col ${message?.sender._id === user._id ? "items-end" : ""}`}
                    >
                      <span
                        className={`${message?.sender._id === user._id ? "bg-primary-500 text-white rounded-full  self-end   px-4  py-2" : "self-start bg-gray-200 text-black rounded-full px-4 py-2"}`}
                      >
                        {" "}
                        {message.content}
                      </span>
                      <span
                        className={`caption-regular text-gray-500 ${message?.sender._id === user._id ? "" : ""}`}
                      >
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
                              className="cursor-pointer"
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
                {isTyping && (
                  <div className="self-start bg-gray-100 text-gray-500 rounded-full px-4 py-2 italic text-xs">
                    {/* {activeChatUser?.username} is typing... */}
                    <div className="flex gap-2">
                      <CircleIcon
                        size={10}
                        weight="fill"
                        className="animate-[ellipsis-up_1s_ease-in-out_infinite] "
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
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {chatId && (
        <div className="shrink-0 flex items-center gap-4 p-4">
          <div className="w-full">
            <input
              type="text"
              className="border border-gray-200 rounded-full w-full h-full py-3 px-3"
              placeholder="Message"
              value={messageToBeSent}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              onChange={handleTyping}
            />
          </div>
          <Button type="button" onClick={sendMessage}>
            Send
          </Button>
        </div>
      )}
    </div>
  );
}

export default MessageSection;
