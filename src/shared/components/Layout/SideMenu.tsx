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
import CreatePost from "features/create-post/CreatePost";
import {
  MESSAGE_RECEIVED_EVENT,
  NEW_CHAT_EVENT,
} from "features/message/const/const";
import type { Message } from "features/message/types/MessageType";
import type { Chat } from "features/message/types/ChatType";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "stores/auth/authThunk";
import { useAppDispatch, useAppSelector } from "stores/hooks";
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
        toast.success(`You have message from ${message.sender.username}`);
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
    window.location.replace("/login");
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
    <div className="flex flex-col dark:bg-gray-900 gap-3 lg:border-r-2 lg:border-gray-200 lg:border-t-0 border-t border-gray-200 shadow-md lg:h-lvh lg:justify-between justify-center lg:items-start items-center lg:p-5 z-50 bg-gray-50 ">
      <div className="flex flex-col gap-10 lg:w-full">
        <div className="px-4 lg:flex hidden">
          <Logo />
        </div>

        <ul className="flex lg:flex-col gap-4 lg:w-full">
          {menus.map((menu) => (
            <li key={menu.menu}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex gap-3 items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out relative
       ${isActive ? "lg:bg-gray-200" : "lg:hover:bg-gray-200 dark:lg:hover:bg-gray-700"}`
                }
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })
                }
              >
                {({ isActive }) => {
                  const Icon = menu.icon;
                  return (
                    <>
                      {hasNewMessage && menu.menu === "messages" && (
                        <div className="h-2 w-2 bg-primary-500 absolute top-2 right-2 rounded-full "></div>
                      )}

                      {menu.menu === "profile" ? (
                        <img
                          src={user?.avatar?.url}
                          className={`w-6 h-6 rounded-full ${
                            isActive ? "border-2 border-gray-700" : ""
                          }`}
                          alt="Profile"
                        />
                      ) : (
                        <Icon
                          weight={isActive ? "duotone" : "regular"}
                          size={24}
                          className={`${isActive ? "text-gray-800 font-bold dark:text-white lg:dark:text-gray-800 rounded-md" : ""}`}
                        />
                      )}
                      <span
                        className={`hidden lg:flex text-gray-700   ${
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
          <li>
            <button
              onClick={
                user?.isEmailVerified
                  ? () => setOpenCreatePostDialog(!openCreatePostDialog)
                  : () => {
                      toast.error("Please verify your email to Add posts");
                    }
              }
              className="flex gap-3 w-full cursor-pointer items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700"
            >
              <PlusIcon weight={"regular"} size={24} />
              <span className="hidden lg:flex text-gray-700 body-m-medium dark:text-white">
                Create
              </span>
            </button>
          </li>
        </ul>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-full lg:flex gap-3 items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out">
            <ListIcon size={24} className=" hover:text-gray-500" />
            <span>More</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="body-s-regular text-gray-500 mb-1 ">
              Switch Theme
            </DropdownMenuLabel>
            <DropdownMenuItem className="hover:bg-gray-100 r flex gap-5 items-center w-full">
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
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-gray-100 cursor-pointer flex gap-2 items-center w-full"
              onSelect={() =>
                navigate(`/user/profile/${user?.username}?tab=bookmarks`)
              }
            >
              <BookmarkSimpleIcon
                size={32}
                className="shrink-0 "
                weight="bold"
              />
              <span className="body-s-regular">Saved Posts</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-100 cursor-pointer flex gap-2 items-center w-full"
              onSelect={handleLogout}
            >
              <PowerIcon size={32} className="shrink-0" weight="bold" />
              <span className="body-s-regular">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {openCreatePostDialog && (
        <CreatePost
          open={openCreatePostDialog}
          onClose={closeCreatePostDialog}
        />
      )}
    </div>
  );
}

export default SideMenu;
