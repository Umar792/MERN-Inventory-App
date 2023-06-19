import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { UseUserContext } from "../../ContextApi/Context/UserContext";

const Header = () => {
  const { Authanticated } = UseUserContext();
  return (
    <div className="header">
      <NavLink to="/">
        <h1>Inventory-App</h1>
      </NavLink>
      <div className="header_buttons">
        {!Authanticated ? (
          <>
            <NavLink to="/singnup">
              <button>Sign-Up</button>
            </NavLink>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/dashboard">
            <button>DashBoard</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
