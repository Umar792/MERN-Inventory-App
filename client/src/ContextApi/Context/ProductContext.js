import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/ProductReducer.js";
import { toast } from "react-toastify";

const ProductContext = createContext();
const initialValue = {
  productloading: false,
  userProducts: [],
  singleProduct: {},
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  //   --------------------- get All Products
  const AllProducts = async () => {
    try {
      dispatch({ type: "ALL_PRODUCTS_GET_REQUEST" });
      const res = await fetch("http://localhost:4000/getUserProducts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "ALL_PRODUCTS_GET_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400) {
        return console.log(data);
      }
      dispatch({
        type: "ALL_PRODUCTS_GET_REQUEST_SUCCESS",
        payload: data.loginUserProducts,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCTS_GET_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  // ----------------------- delete single  product
  const DeleteSingleProduct = async (id, navigate) => {
    try {
      dispatch({ type: "DELETE_SINGLE_GET_REQUEST" });
      const res = await fetch(`http://localhost:4000/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "DELETE_SINGLE_GET_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        // navigate("/dashboard");
      }
      dispatch({
        type: "DELETE_SINGLE_GET_REQUEST_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "DELETE_SINGLE_GET_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  //   ---------------- create Product
  const ProductCreate = async (
    name,
    category,
    price,
    quantity,
    description,
    Image,
    navigate
  ) => {
    try {
      dispatch({ type: "CREATE_PRODUCT_REQUEST" });
      const res = await fetch("http://localhost:4000/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          category: category,
          price: price,
          Quantity: quantity,
          discription: description,
          image: Image,
        }),
      });
      dispatch({ type: "CREATE_PRODUCT_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/dashboard");
      }
      dispatch({ type: "CREATE_PRODUCT_REQUEST_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "CREATE_PRODUCT_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };
  //   ---------------- Update Product
  const UpdateProduct = async (
    name,
    category,
    price,
    quantity,
    description,
    // Image,
    navigate,
    id
  ) => {
    try {
      dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
      const res = await fetch(`http://localhost:4000/upadteProduct/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          category: category,
          price: price,
          Quantity: quantity,
          discription: description,
          // image: Image,
        }),
      });
      dispatch({ type: "UPDATE_PRODUCT_REQUEST_FAIL" });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/dashboard");
      }
      dispatch({ type: "UPDATE_PRODUCT_REQUEST_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "UPDATE_PRODUCT_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  //   --------------- getSingleProduct
  const getSingleProduct = async (id) => {
    try {
      dispatch({ type: "SINGLE_GET_REQUEST" });
      const res = await fetch(`http://localhost:4000/singleproduct/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "SINGLE_GET_REQUEST_FAIL" });
      const data = await res.json();
      if (res.status === 400) {
        return console.log(data);
      }
      dispatch({
        type: "SINGLE_GET_REQUEST_SUCCESS",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "SINGLE_GET_REQUEST_eRROR",
        payload: error.message,
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        AllProducts,
        ProductCreate,
        getSingleProduct,
        DeleteSingleProduct,
        UpdateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const UseProductContextApi = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductContextProvider, UseProductContextApi };
