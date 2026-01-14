import {
  HouseIcon,
  PaperPlaneTiltIcon,
  PlusIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useAuth } from "context/auth/AuthContext";
import { NavLink } from "react-router-dom";

function SideMenu() {
  const { user } = useAuth();

  const menus = [
    {
      menu: "home",
      path: "/",
      icon: HouseIcon,
    },
    {
      menu: "messages",
      path: "/message",
      icon: PaperPlaneTiltIcon,
    },
    {
      menu: "create",
      path: "/create-post",
      icon: PlusIcon,
    },
    {
      menu: "profile",
      path: "/user/profile",
      icon: UserCircleIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-r border-gray-400 h-lvh justify-between p-5">
      <div className="flex flex-col gap-4">
        <span className="px-4">Wagwan</span>

        <ul className="flex flex-col gap-4">
          {menus.map((menu) => (
            <li key={menu.menu}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex gap-3 items-center rounded-md px-4 py-3 capitalize transition-colors duration-100 ease-in-out
       ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
                }
              >
                {({ isActive }) => {
                  const Icon = menu.icon;

                  return (
                    <>
                      {menu.menu === "profile" ? (
                        <img
                          src={user?.avatar?.url}
                          className="w-6 h-6 rounded-full"
                          alt="Profile"
                        />
                      ) : (
                        <Icon
                          weight={isActive ? "duotone" : "regular"}
                          size={24}
                        />
                      )}
                      <span>{menu.menu}</span>
                    </>
                  );
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
