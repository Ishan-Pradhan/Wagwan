import { Outlet } from "react-router";
import SideMenu from "../shared/components/Layout/SideMenu";

function Layout() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <SideMenu />
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
