import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full min-h-screen max-h-full flex">
      <div className="min-h-screen max-h-full">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col min-h-screen max-h-full">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
