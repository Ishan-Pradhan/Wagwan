import Button from "@components/ui/Button";
import { useAuth } from "context/auth/AuthContext";

function UserProfile() {
  const { logout } = useAuth();

  return (
    <div>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default UserProfile;
