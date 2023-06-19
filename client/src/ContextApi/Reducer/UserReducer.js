const reducer = (state, action) => {
  switch (action.type) {
    //  -------------AUTH_SUCCESS
    case "AUTH_SUCCESS":
      return {
        ...state,
        Authanticated: action.payload,
      };
    //   ---------------
    case "USER_REGISTRATION_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_REGISTRATION_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "USER_REGISTRATION_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "USER_REGISTRATION_REQUEST_eRROR":
      return {
        ...state,
        loading: false,
      };

    //   ------------- OTP verification
    case "OTP_VERIFICATIUON_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "OTP_VERIFICATIUON_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "OTP_VERIFICATIUON_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "OTP_VERIFICATIUON_REQUEST_eRROR":
      return {
        ...state,
        loading: false,
      };
    //   ------------- usre login
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        Authanticated: false,
      };
    case "USER_LOGIN_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };
    case "USER_LOGIN_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        Authanticated: true,
      };
    case "USER_LOGIN_REQUEST_eRROR":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };
    //   ------------- usre ME
    case "ME_REQUEST":
      return {
        ...state,
      };
    case "ME_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "ME_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "ME_REQUEST_eRROR":
      return {
        ...state,
        loading: false,
      };
    //   ------------- logout
    case "LOGOUT_USER_LOAD":
      return {
        ...state,
        loading: true,
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        Authanticated: false,
      };
    case "LOGOUT_USER_FAIL":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
