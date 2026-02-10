import MessageSideMenu from "./components/MessageSideMenu";
import MessageSection from "./components/MessageSection";
import { useRef } from "react";
import { useAppSelector } from "stores/hooks";

function MessagePage() {
  const { user } = useAppSelector((state) => state.auth);

  const messageInputRef = useRef<HTMLInputElement>(null);

  if (!user) return;

  return (
    <div className="grid grid-cols-5">
      <MessageSideMenu user={user} messageInputRef={messageInputRef} />
      <MessageSection user={user} messageInputRef={messageInputRef} />
    </div>
  );
}

export default MessagePage;
