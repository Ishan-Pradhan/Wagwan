import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Logo from "@components/widgets/Logo";
import {
  DotsThreeOutlineVerticalIcon,
  HouseIcon,
  PaperPlaneTiltIcon,
  PlusIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useAuth } from "context/auth/AuthContext";
import CreatePost from "features/create-post/CreatePost";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function SideMenu() {
  const { user, logout } = useAuth();

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

  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

  const closeCreatePostDialog = () => {
    setOpenCreatePostDialog(false);
  };

  return (
    <div className="flex flex-col gap-3 lg:border-r-2 lg:border-gray-200 lg:border-t-0 border-t border-gray-200 shadow-md lg:h-lvh lg:justify-between justify-center lg:items-start items-center lg:p-5 z-50 bg-white ">
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
                  `flex gap-3 items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out
       ${isActive ? "lg:bg-gray-100" : "lg:hover:bg-gray-100"}`
                }
              >
                {({ isActive }) => {
                  const Icon = menu.icon;

                  return (
                    <>
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
                        />
                      )}
                      <span
                        className={`hidden lg:flex text-gray-700  ${
                          isActive ? "body-m-bold" : "body-m-medium"
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
              className="flex gap-3 w-full cursor-pointer items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out lg:hover:bg-gray-100"
            >
              <PlusIcon weight={"regular"} size={24} />
              <span className="hidden lg:flex text-gray-700 body-m-medium">
                Create
              </span>
            </button>
          </li>
        </ul>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="hidden cursor-pointer hover:bg-gray-100 w-full lg:flex gap-3 items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out">
            <DotsThreeOutlineVerticalIcon
              size={24}
              className=" hover:text-gray-500"
            />
            <span>More</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-65" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:bg-gray-100 cursor-pointer"
              onSelect={logout}
            >
              Logout
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
