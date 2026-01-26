import Button from "@components/custom-ui/Button";
import { ChatsIcon, CircleIcon } from "@phosphor-icons/react";
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
  MESSAGE_RECEIVED_EVENT,
} from "../const/const";
import { useQueryClient } from "@tanstack/react-query";
import { useSendMessage } from "../hooks/useSendMessage";
import LottieLoading from "@components/ui/LottieLoading";

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

    // Cleanup: Leave the room and stop listening when switching chats
    return () => {
      socket.emit(LEAVE_CHAT_EVENT, chatId);
      socket.off(MESSAGE_RECEIVED_EVENT);
    };
  }, [chatId, socketRef, queryClient]);

  const sendMessageMutation = useSendMessage();

  const sendMessage = () => {
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
            {isPending ? (
              <LottieLoading />
            ) : (
              <div className="flex flex-col gap-3  container">
                {messages?.map((message: Message) => (
                  <div
                    className={`flex gap-2 items-center ${message?.sender._id === user._id ? " self-end" : "self-start"}`}
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
                      className={`${message?.sender._id === user._id ? "bg-primary-500 text-white rounded-full self-end px-4  py-2" : "bg-gray-200 text-black rounded-full self-start px-4 py-2"}`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
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
              onChange={(e) => setMessageToBeSent(e.target.value)}
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
