import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";
import { toast } from "react-toastify";

const UserContext = createContext();

const initialValue = {
  loading: false,
  user: {},
  Authanticated: false,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: true });
    }
  }, []);
  const userRegisytration = async (name, email, password, avatar, navigate) => {
    try {
      dispatch({ type: "USER_REGISTRATION_REQUEST" });
      const res = await fetch("http://localhost:4000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });
      dispatch({ type: "USER_REGISTRATION_REQUEST_FAIL" });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/verifyOTP");
      }
      dispatch({ type: "USER_REGISTRATION_REQUEST_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "USER_REGISTRATION_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  //   -------------- OTP verification
  const OTPverification = async (OTP, navigate) => {
    try {
      dispatch({ type: "OTP_VERIFICATIUON_REQUEST" });
      const res = await fetch("http://localhost:4000/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OTP }),
      });
      dispatch({ type: "OTP_VERIFICATIUON_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/login");
      }
      dispatch({ type: "OTP_VERIFICATIUON_REQUEST_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "OTP_VERIFICATIUON_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  //   ------------------------- Login user
  const UserLogin = async (email, password, navigate) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      dispatch({ type: "USER_LOGIN_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.mesaage);
      } else {
        toast.success(data.mesaage);
        navigate("/dashboard");
      }
      localStorage.setItem("token", data.Token);
      dispatch({ type: "USER_LOGIN_REQUEST_SUCCESS", payload: data.isUser });
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };
  //   --------------------- get me
  const getme = async () => {
    try {
      dispatch({ type: "ME_REQUEST" });
      const res = await fetch("http://localhost:4000/me", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "ME_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400) {
        return console.log(data);
      }
      dispatch({ type: "ME_REQUEST_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({
        type: "ME_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  // =============== logout

  const logout = async (navigate) => {
    try {
      dispatch({ type: "LOGOUT_USER_LOAD" });
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT_USER_SUCCESS" });
      toast.success("Logout Successfuly");
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGOUT_USER_FAIL", payload: error.message });
    }
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        userRegisytration,
        OTPverification,
        UserLogin,
        getme,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UseUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, UseUserContext };
