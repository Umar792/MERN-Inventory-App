import React, { useState } from "react";
import "./Registration.css";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../ContextApi/Context/UserContext";

const Login = () => {
  const { loading, UserLogin } = UseUserContext();
  const [data, setdata] = useState({
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

  const navigate = useNavigate();

  const DataSend = () => {
    UserLogin(data.email, data.password, navigate);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="registration">
          <div className="registration_conect">
            <h1>Login Your Account</h1>
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
            <button onClick={DataSend}>Login</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
