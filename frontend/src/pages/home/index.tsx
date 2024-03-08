import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { themeChange } from "theme-change";
import { SideBar } from "../../components/siderbar";

export const Home = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex w-screen flex-col sm:flex-row">
      <div className="w-screen min-w-64 sm:w-1/5">
        <SideBar />
      </div>
      <div className="w-screen p-1 sm:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};
