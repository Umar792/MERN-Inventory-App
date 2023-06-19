import React, { useState } from "react";
import "./Registration.css";
import { UseUserContext } from "../../ContextApi/Context/UserContext";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const OTPverification = () => {
  const { loading, OTPverification } = UseUserContext();
  const [OTP, SetOTP] = useState("");
  const navigate = useNavigate();

  const DataSend = () => {
    const OTPNumber = parseInt(OTP);
    OTPverification(OTPNumber, navigate);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="registration">
          <div className="registration_conect">
            <h1>OTP Verification</h1>
            <input
              type="number"
              placeholder="Please Enter Your OTP"
              name="OTP"
              value={OTP}
              onChange={(e) => SetOTP(e.target.value)}
            />

            <button onClick={DataSend}>Submit OTP</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OTPverification;
