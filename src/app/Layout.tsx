import { Outlet } from "react-router";
import SideMenu from "../shared/components/Layout/SideMenu";
import Header from "@components/Layout/Header";

function Layout() {
  return (
    <div className="grid lg:grid-cols-6 grid-cols-1">
      <div className="fixed top-0 lg:hidden w-full">
        <Header />
      </div>
      <div className="lg:col-span-1 lg:order-1 order-2 fixed lg:relative bottom-0 w-full justify-center items-center">
        <SideMenu />
      </div>
      <div className="lg:col-span-5 col-span-1  lg:order-2 order-1 mt-18 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
