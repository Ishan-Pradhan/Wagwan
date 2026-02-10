import { ChatsIcon } from "@phosphor-icons/react";
import { useSearchParams } from "react-router";
import type { User } from "types/LoginTypes";
import type { Message } from "../../../shared/features/message/types/MessageType";
import { useGetMessageInChat } from "./../hooks/useGetMessageInChat";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useSocket } from "context/socket/SocketContext";
import {
  JOIN_CHAT_EVENT,
  LEAVE_CHAT_EVENT,
  MESSAGE_DELETE_EVENT,
  STOP_TYPING_EVENT,
  TYPING_EVENT,
} from "../../../shared/features/message/const/const";
import { useQueryClient } from "@tanstack/react-query";
import { useSendMessage } from "../hooks/useSendMessage";
import LottieLoading from "@components/custom-ui/LottieLoading";

import toast from "react-hot-toast";
import AttachmentPreview from "./AttachmentPreview";
import MessageInput from "./MessageInput";
import MessageUI from "./MessageUI";
import MessageHeader from "./MessageHeader";
import ReceiverInfo from "./ReceiverInfo";
import { useGetAvailableUsers } from "../hooks/useGetAvailableUsers";
import { TYPING_TIMEOUT_MS } from "constants/consts";

function MessageSection({
  user,
  messageInputRef,
}: {
  user: User;
  messageInputRef: RefObject<HTMLInputElement | null>;
}) {
  const { socketRef } = useSocket();
  const [messageToBeSent, setMessageToBeSent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId") ?? "";
  const activeUser = searchParams.get("user");
  const isUserActive = Boolean(activeUser);

  const queryClient = useQueryClient();
  const { data, isPending } = useGetMessageInChat(chatId);

  const messages: Message[] = data?.slice().reverse();
  const sendMessageMutation = useSendMessage();

  const { data: chatUsers } = useGetAvailableUsers();
  console.log(chatUsers);
  const receiver =
    chatUsers?.find((chatUser) => chatUser.username === activeUser) || null;
  console.log(receiver);

  useEffect(() => {
    if (!chatId) return;
    // latest messages are fetched when opening chat
    queryClient.invalidateQueries({ queryKey: ["chat_messages", chatId] });
  }, [chatId, queryClient]);

  // socket events
  useEffect(() => {
    if (!socketRef.current || !chatId) return;

    const socket = socketRef.current;

    socket.emit(JOIN_CHAT_EVENT, chatId);

    const handleTyping = (id: string) => {
      if (id === chatId) setIsTyping(true);
    };

    const handleStopTyping = (id: string) => {
      if (id === chatId) setIsTyping(false);
    };

    const handleDelete = () => {
      queryClient.invalidateQueries({ queryKey: ["chat_messages", chatId] });
      queryClient.invalidateQueries({ queryKey: ["chat_messages"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    socket.on(TYPING_EVENT, handleTyping);
    socket.on(STOP_TYPING_EVENT, handleStopTyping);
    socket.on(MESSAGE_DELETE_EVENT, handleDelete);

    return () => {
      socket.emit(LEAVE_CHAT_EVENT, chatId);
      socket.off(TYPING_EVENT, handleTyping);
      socket.off(STOP_TYPING_EVENT, handleStopTyping);
      socket.off(MESSAGE_DELETE_EVENT, handleDelete);
    };
  }, [chatId, socketRef, queryClient]);

  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToBeSent(e.target.value);
    if (!socketRef.current || !chatId) return;

    socketRef.current.emit(TYPING_EVENT, chatId);

    const timeout = setTimeout(() => {
      socketRef.current?.emit(STOP_TYPING_EVENT, chatId);
    }, TYPING_TIMEOUT_MS); //3000 ms

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  const sendMessage = () => {
    if (
      (!messageToBeSent && attachments.length === 0) ||
      messageToBeSent === ""
    )
      return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
      socketRef.current?.emit(STOP_TYPING_EVENT, chatId);
    }

    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("content", messageToBeSent);
    attachments.forEach((file) => formData.append("attachments", file));

    sendMessageMutation.mutate(
      { chatId, formData },
      {
        onSuccess: () => {
          setMessageToBeSent("");
          setAttachments([]);
          queryClient.invalidateQueries({
            queryKey: ["chat_messages", chatId],
          });
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      },
    );
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`col-span-5 h-[89vh] w-full flex-col overflow-hidden pb-10 lg:col-span-4 lg:h-lvh lg:pb-0 ${isUserActive ? "flex" : "hidden lg:flex"}`}
    >
      {receiver && <MessageHeader activeChatUser={receiver} />}

      {!chatId ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 py-10">
          <div className="flex items-center justify-center rounded-full border p-3">
            <ChatsIcon size={24} />
          </div>
          <div className="flex flex-col items-center">
            <span className="body-l-medium w-full text-center">
              Your Messages
            </span>
            <p className="body-s-regular text-gray-500">
              Send a message to start a chat.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-10 overflow-y-auto py-10">
          {/* User info */}
          {chatId && receiver && <ReceiverInfo activeChatUser={receiver} />}
          {isPending ? (
            <div className="h-full">
              <LottieLoading />
            </div>
          ) : (
            <MessageUI
              user={user}
              messages={messages}
              chatId={chatId}
              isTyping={isTyping}
              activeChatUser={receiver}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {chatId && (
        <>
          {attachments.length > 0 && (
            // preview attachments
            <div className="flex gap-2 px-4">
              {attachments.map((file, index) => (
                <AttachmentPreview
                  file={file}
                  index={index}
                  setAttachments={setAttachments}
                />
              ))}
            </div>
          )}
          {/* message input */}
          <MessageInput
            setAttachments={setAttachments}
            messageToBeSent={messageToBeSent}
            sendMessage={sendMessage}
            handleTypingInput={handleTypingInput}
            messageInputRef={messageInputRef}
          />
        </>
      )}
    </div>
  );
}

export default MessageSection;
