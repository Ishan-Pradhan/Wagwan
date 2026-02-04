import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Switch } from "@components/ui/switch";
import Logo from "@components/widgets/Logo";
import {
  BookmarkSimpleIcon,
  HouseIcon,
  ListIcon,
  PaperPlaneTiltIcon,
  PlusIcon,
  PowerIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useSocket } from "context/socket/SocketContext";
import { useTheme } from "context/Theme/ThemeContext";
import {
  MESSAGE_RECEIVED_EVENT,
  NEW_CHAT_EVENT,
} from "shared/features/message/const/const";
import type { Message } from "shared/features/message/types/MessageType";
import type { Chat } from "shared/features/message/types/ChatType";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "stores/auth/authThunk";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import CreateEditPost from "shared/features/create-edit-post/CreateEditPost";
function SideMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const dispatch = useAppDispatch();
  const { socketRef } = useSocket();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleNewChat = () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    const handleNotification = (message: Message) => {
      if (location.pathname !== "/message") {
        setHasNewMessage(true);
        toast(`You have message from ${message.sender.username}`, {
          icon: "💬",
        });
      }

      // Update chats list cache globally
      const activeChatId = queryClient.getQueryData<string>(["activeChatId"]);

      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
        old?.map((chat) => {
          if (chat._id !== message.chat) return chat;

          return {
            ...chat,
            latestMessage: message,
            hasUnread:
              chat._id !== activeChatId || location.pathname !== "/message",
          };
        }),
      );

      // Invalidate specific chat messages if they are currently being viewed
      queryClient.invalidateQueries({
        queryKey: ["chat_messages", message.chat],
      });
    };

    socket.on(NEW_CHAT_EVENT, handleNewChat);
    socket.on(MESSAGE_RECEIVED_EVENT, handleNotification);

    return () => {
      socket.off(NEW_CHAT_EVENT, handleNewChat);
      socket.off(MESSAGE_RECEIVED_EVENT, handleNotification);
    };
  }, [socketRef, location.pathname, queryClient]);

  useEffect(() => {
    if (location.pathname === "/message" && hasNewMessage) {
      //eslint-disable-next-line
      setHasNewMessage(false);
    }
  }, [location.pathname, hasNewMessage]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const menus = [
    {
      menu: "home",
      path: "/",
      icon: HouseIcon,
    },
    {
      menu: "messages",
      path: `${user?.isEmailVerified ? "/message" : `/user/profile/edit-profile`}`,
      icon: PaperPlaneTiltIcon,
    },

    {
      menu: "profile",
      path: `/user/profile/${user?.username}`,
      icon: UserCircleIcon,
    },
  ];

  const closeCreatePostDialog = () => {
    setOpenCreatePostDialog(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="z-50 flex flex-col items-center justify-center gap-3 border-t border-gray-200 bg-gray-50 shadow-md lg:h-lvh lg:items-start lg:justify-between lg:border-t-0 lg:border-r lg:border-gray-200 lg:p-5 dark:bg-gray-800 dark:lg:border-gray-600"
    >
      <div className="flex flex-col gap-10 lg:w-full">
        <div className="hidden px-4 lg:flex">
          <Logo />
        </div>

        <ul className="flex items-center gap-4 lg:w-full lg:flex-col">
          {menus.map((menu) => (
            <li key={menu.menu} className="w-full">
              <NavLink
                to={menu.path}
                aria-current="page"
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-md px-2 py-3 capitalize transition-colors duration-100 ease-in-out lg:px-4 ${isActive ? "lg:bg-gray-200" : "lg:hover:bg-gray-200 dark:lg:hover:bg-gray-700"}`
                }
              >
                {({ isActive }) => {
                  const Icon = menu.icon;
                  return (
                    <>
                      {hasNewMessage && menu.menu === "messages" && (
                        <div className="bg-primary-500 absolute top-2 right-2 h-2 w-2 rounded-full"></div>
                      )}

                      {menu.menu === "profile" ? (
                        <img
                          src={user?.avatar?.url}
                          className={`h-8 w-8 shrink-0 rounded-full object-cover lg:h-6 lg:w-6 ${
                            isActive ? "border-2 border-gray-700" : ""
                          }`}
                          alt="Profile"
                        />
                      ) : (
                        <Icon
                          weight={isActive ? "duotone" : "regular"}
                          className={`flex shrink-0 text-2xl lg:text-lg ${isActive ? "rounded-md font-bold text-gray-800 dark:text-white lg:dark:text-gray-800" : ""}`}
                        />
                      )}
                      <span
                        className={`hidden text-gray-700 lg:flex ${
                          isActive
                            ? "body-m-bold"
                            : "body-m-medium dark:text-white"
                        }`}
                      >
                        {menu.menu}
                      </span>
                    </>
                  );
                }}
              </NavLink>
            </li>
          ))}
          <li className="w-full">
            <button
              onClick={
                user?.isEmailVerified
                  ? () => setOpenCreatePostDialog(!openCreatePostDialog)
                  : () => {
                      toast.error("Please verify your email to Add posts");
                    }
              }
              className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700"
            >
              <PlusIcon weight={"regular"} className="text-2xl lg:text-xl" />
              <span className="body-m-medium hidden text-gray-700 lg:flex dark:text-white">
                Create
              </span>
            </button>
          </li>
        </ul>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="hidden w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out hover:bg-gray-100 lg:flex dark:hover:bg-gray-600"
          >
            <ListIcon size={20} className="hover:text-gray-500" />
            <span className="body-m-medium">More</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="body-s-regular mb-1 text-gray-500">
              Switch Theme
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="r flex w-full items-center gap-5 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  toggleTheme();
                }
              }}
            >
              <label
                htmlFor="dark-mode"
                className="body-s-regular cursor-pointer"
              >
                Dark Mode
              </label>
              <Switch
                className="cursor-pointer"
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                tabIndex={0}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex w-full cursor-pointer items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() =>
                navigate(`/user/profile/${user?.username}?tab=bookmarks`)
              }
            >
              <BookmarkSimpleIcon
                size={32}
                className="shrink-0"
                weight="bold"
              />
              <span className="body-s-regular">Saved Posts</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full cursor-pointer items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={handleLogout}
            >
              <PowerIcon size={32} className="shrink-0" weight="bold" />
              <span className="body-s-regular">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {openCreatePostDialog && (
        <CreateEditPost
          open={openCreatePostDialog}
          onClose={closeCreatePostDialog}
        />
      )}
    </nav>
  );
}

export default SideMenu;
