import React from "react";
import {Outlet} from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const Layout = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div>
        <div>
          <Navbar />
        </div>
        {/* <Home /> */}
        {/* <CreatePost/> */}
        {/* <Login/> */}
        {/* <Signup/> */}
        {/* <ProfilePage /> */}
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
