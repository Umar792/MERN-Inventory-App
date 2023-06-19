import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/Home/Header";
import Registration from "./Component/Account/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPverification from "./Component/Account/OTPverification";
import Login from "./Component/Account/Login";
import { UseUserContext } from "./ContextApi/Context/UserContext";
import DashBoard from "./Component/Dashboard/DashBoard";
import CreateProduct from "./Component/Dashboard/CreateProduct/CreateProduct";
import SingleProduct from "./Component/Dashboard/SinglePrpoduct/SingleProduct";
import UpdatePrpduct from "./Component/Dashboard/UpdateProduct/UpdtaePrpduct";
import Profile from "./Component/Dashboard/Profile/Profile";

const App = () => {
  const { Authanticated, getme } = UseUserContext();
  useEffect(() => {
    getme();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="dark" />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/singnup" element={<Registration />} />
        <Route exact path="/verifyOTP" element={<OTPverification />} />
        <Route exact path="/login" element={<Login />} />

        {/* ---------------- dashboard  */}
        {Authanticated && (
          <Route exact path="/dashboard" element={<DashBoard />} />
        )}
        {Authanticated && (
          <Route exact path="/createProduct" element={<CreateProduct />} />
        )}
        {Authanticated && (
          <Route exact path="/singleproduct/:id" element={<SingleProduct />} />
        )}
        {Authanticated && (
          <Route exact path="/upadteProduct/:id" element={<UpdatePrpduct />} />
        )}
        {Authanticated && <Route exact path="/profile" element={<Profile />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
