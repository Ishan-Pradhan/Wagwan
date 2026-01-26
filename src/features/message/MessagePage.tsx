import { useAuth } from "context/auth/AuthContext";
import MessageSideMenu from "./components/MessageSideMenu";
import MessageSection from "./components/MessageSection";
import { useState } from "react";
import type { ChatUserType } from "./types/ChatUserType";

function MessagePage() {
  const { user } = useAuth();
  const [activeChatUser, setActiveChatUser] = useState<ChatUserType | null>(
    null,
  );

  if (!user) return;

  return (
    <div className="grid grid-cols-5">
      <MessageSideMenu
        user={user}
        onSelectUser={(chatUser: ChatUserType) => setActiveChatUser(chatUser)}
      />
      <MessageSection user={user} activeChatUser={activeChatUser} />
    </div>
  );
}

export default MessagePage;
