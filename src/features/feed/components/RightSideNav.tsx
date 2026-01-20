import { useAuth } from "context/auth/AuthContext";
import { Link } from "react-router";

function RightSideNav() {
  const { user } = useAuth();
  const userAvatar = user?.avatar?.url;
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link to={`/user/profile/${user?.username}`}>
          <img
            src={userAvatar}
            alt="user avatar"
            className="h-10 w-10 rounded-full border object-contain"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/user/profile/${user?.username}`}>
            <span className="body-m-bold">{user?.username}</span>
          </Link>
          <span className="body-s-regular tracking-wide">{user?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default RightSideNav;
