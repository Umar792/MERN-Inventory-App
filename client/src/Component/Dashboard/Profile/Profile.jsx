import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { UseUserContext } from "../../../ContextApi/Context/UserContext";
import "./profile.css";

const Profile = () => {
  const { user } = UseUserContext();
  console.log(user.avatar.url);
  return (
    <div className="dashboard">
      <div>
        <Sidebar />
      </div>
      <div className="profile">
        <h2>Profile</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-",
            alignItems: "center",
            borderBottom: "1px solid gray",
            padding: "10px ",
          }}
        >
          <h1> UserName: </h1>
          <h1>{user && user.name}</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-",
            alignItems: "center",
            borderBottom: "1px solid gray",
            padding: "10px ",
          }}
        >
          <p>Profile Picture</p>
          <img src={user && user.avatar.url} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "1px solid gray",
            padding: "10px ",
          }}
        >
          <p>Email : </p>
          <p>{user && user.email}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "1px solid gray",
            padding: "10px ",
          }}
        >
          <p>Your Verify Email :</p>
          <p> {user && user.verify}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
