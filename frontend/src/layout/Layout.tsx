import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex sidebar" style={{ height: "calc(100vh - 64px)" }}>
        <Sidebar />
        <div className="flex flex-1 bg-gray-900 text-white p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
