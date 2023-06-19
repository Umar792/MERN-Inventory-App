const ProductReducer = (state, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS_GET_REQUEST":
      return {
        ...state,
        productloading: true,
      };
    case "ALL_PRODUCTS_GET_REQUEST_FAIL":
      return {
        ...state,
        productloading: false,
      };
    case "ALL_PRODUCTS_GET_REQUEST_SUCCESS":
      return {
        ...state,
        productloading: false,
        userProducts: action.payload,
      };
    case "ALL_PRODUCTS_GET_REQUEST_eRROR":
      return {
        ...state,
        productloading: false,
      };

    //   ----------------- create Product
    case "CREATE_PRODUCT_REQUEST":
      return {
        ...state,
        productloading: true,
      };
    case "CREATE_PRODUCT_REQUEST_FAIL":
      return {
        ...state,
        productloading: false,
      };
    case "CREATE_PRODUCT_REQUEST_SUCCESS":
      return {
        ...state,
        productloading: false,
      };
    case "CREATE_PRODUCT_REQUEST_eRROR":
      return {
        ...state,
        productloading: false,
      };

    //   ----------------- uPDATE Product
    case "UPDATE_PRODUCT_REQUEST":
      return {
        ...state,
        productloading: true,
      };
    case "UPDATE_PRODUCT_REQUEST_FAIL":
      return {
        ...state,
        productloading: false,
      };
    case "UPDATE_PRODUCT_REQUEST_SUCCESS":
      return {
        ...state,
        productloading: false,
      };
    case "UPDATE_PRODUCT_REQUEST_eRROR":
      return {
        ...state,
        productloading: false,
      };

    //   ------------------------- Single product
    case "DELETE_SINGLE_GET_REQUEST":
      return {
        ...state,
        productloading: true,
      };
    case "DELETE_SINGLE_GET_REQUEST_FAIL":
      return {
        ...state,
        productloading: false,
      };
    case "DELETE_SINGLE_GET_REQUEST_SUCCESS":
      return {
        ...state,
        productloading: false,
      };
    case "DELETE_SINGLE_GET_REQUEST_eRROR":
      return {
        ...state,
        productloading: false,
      };
    //   ------------------------- Single product delete
    case "SINGLE_GET_REQUEST":
      return {
        ...state,
        productloading: true,
      };
    case "SINGLE_GET_REQUEST_FAIL":
      return {
        ...state,
        productloading: false,
      };
    case "SINGLE_GET_REQUEST_SUCCESS":
      return {
        ...state,
        productloading: false,
        singleProduct: action.payload,
      };
    case "SINGLE_GET_REQUEST_eRROR":
      return {
        ...state,
        productloading: false,
      };

    default:
      return state;
  }
};
export default ProductReducer;
