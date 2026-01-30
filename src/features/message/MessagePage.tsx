import MessageSideMenu from "./components/MessageSideMenu";
import MessageSection from "./components/MessageSection";
import { useState } from "react";
import type { ChatUserType } from "./types/ChatUserType";
import { useAppSelector } from "stores/hooks";

function MessagePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeChatUser, setActiveChatUser] = useState<ChatUserType | null>(
    null,
  );
  const [chatId, setChatId] = useState("");

  if (!user) return;

  return (
    <div className="grid grid-cols-5">
      <MessageSideMenu
        user={user}
        onSelectUser={(chatUser: ChatUserType) => setActiveChatUser(chatUser)}
        setChatId={setChatId}
      />
      <MessageSection
        user={user}
        activeChatUser={activeChatUser}
        chatId={chatId}
      />
    </div>
  );
}

export default MessagePage;
