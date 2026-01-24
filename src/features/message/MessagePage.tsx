import { useAuth } from "context/auth/AuthContext";
import MessageSideMenu from "./components/MessageSideMenu";
import MessageSection from "./components/MessageSection";

function MessagePage() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <div className="grid grid-cols-5">
      <MessageSideMenu user={user} />
      <MessageSection />
    </div>
  );
}

export default MessagePage;
