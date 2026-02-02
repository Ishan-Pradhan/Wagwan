import { Outlet } from "react-router";
import SideMenu from "../shared/components/Layout/SideMenu";
import Header from "@components/Layout/Header";

function Layout() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-6">
      <div className="fixed top-0 z-10 w-full lg:hidden">
        <Header />
      </div>
      <div className="fixed bottom-0 z-10 order-2 w-full items-center justify-center overflow-hidden lg:relative lg:order-1 lg:col-span-1">
        <SideMenu />
      </div>
      <div className="order-1 col-span-1 mt-18 overflow-y-auto lg:order-2 lg:col-span-5 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
