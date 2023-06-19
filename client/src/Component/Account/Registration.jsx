import React, { useState } from "react";
import "./Registration.css";
import { RxAvatar } from "react-icons/rx";
import { UseUserContext } from "../../ContextApi/Context/UserContext";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { loading, userRegisytration } = UseUserContext();
  const [avatar, setAvatar] = useState("");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };
  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const navigate = useNavigate();

  const DataSend = () => {
    userRegisytration(data.name, data.email, data.password, avatar, navigate);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="registration">
          <div className="registration_conect">
            <h1>Register Your Account</h1>
            <input
              type="text"
              placeholder="Please Enter Your Name"
              name="name"
              value={data.name}
              onChange={dataChange}
            />
            <input
              type="email"
              placeholder="Please Enter Your Email"
              name="email"
              value={data.email}
              onChange={dataChange}
            />
            <input
              type="password"
              placeholder="Please Enter Your password"
              name="password"
              value={data.password}
              onChange={dataChange}
            />
            <div className="image">
              <input
                type="file"
                placeholder="Please Select Your Profile Picture"
                accept="image/"
                name="avatar"
                onChange={imageChange}
              />
              {avatar ? <img src={avatar} alt="" /> : <RxAvatar />}
            </div>
            <button onClick={DataSend}>Sign-Up</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
