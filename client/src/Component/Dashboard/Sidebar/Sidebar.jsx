import React from "react";
import "./Sidebar.css";
import { GrApps } from "react-icons/gr";
import { MdCreateNewFolder } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/dashboard">
        <div className="sidebar_box">
          <GrApps />
          <p>DashBoard</p>
        </div>
      </NavLink>
      <NavLink to="/createProduct">
        <div className="sidebar_box">
          <MdCreateNewFolder />
          <p>Add Product</p>
        </div>
      </NavLink>

      <NavLink to="/profile">
        <div className="sidebar_box">
          <ImProfile />
          <p>Profile</p>
        </div>
      </NavLink>
      {/* <div className="sidebar_box">
        <AiFillMessage />
        <p>Report Bug</p>
      </div> */}
    </div>
  );
};

export default Sidebar;
