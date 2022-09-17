import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AdminSidebar from "./AdminSidebar";

const MobileAdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebarMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebarMenu}
        className="flex items-center border p-2 rounded-md lg:hidden bg-colorWhite border-[tomato]"
      >
        <MenuIcon color="primary" />
      </button>

      <div
        className={`lg:hidden p-4 py-10 w-10/12 fixed z-50 left-0 top-0 h-screen transition-transform duration-300 bg-colorWhite border-l ${
          !sidebarOpen ? "-translate-x-full" : ""
        }`}
      >
        <div className="mb-10 flex justify-end">
          <button onClick={toggleSidebarMenu}>
            <CloseIcon className="text-black" />
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="w-full flex items-center justify-center">
            <AdminSidebar />
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          onClick={toggleSidebarMenu}
          className="fixed w-screen h-screen left-0 top-0 z-40 bg-colorPrimary opacity-20 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default MobileAdminSidebar;
