import React, { useEffect } from "react";
import "./DashBoard.css";
import Sidebar from "./Sidebar/Sidebar";
import DashboardContnet from "./Content/DashboardContnet";
import { UseProductContextApi } from "../../ContextApi/Context/ProductContext";

const DashBoard = () => {
  const { AllProducts } = UseProductContextApi();
  useEffect(() => {
    AllProducts();
  }, []);
  return (
    <div className="dashboard">
      <div>
        <Sidebar />
      </div>
      <div>
        <DashboardContnet />
      </div>
    </div>
  );
};

export default DashBoard;
