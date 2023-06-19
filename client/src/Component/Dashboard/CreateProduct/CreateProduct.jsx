import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./CreateProduct.css";
import { RxAvatar } from "react-icons/rx";
import { UseProductContextApi } from "../../../ContextApi/Context/ProductContext";
import Loading from "../../loading/Loading";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { ProductCreate, productloading, singleProduct } =
    UseProductContextApi();
  const [Image, setImage] = useState("");
  const [data, setdata] = useState({
    name: "",
    category: "",
    price: parseInt(""),
    quantity: parseInt(""),
    description: "",
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
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const navigate = useNavigate();
  const submitProduct = () => {
    ProductCreate(
      data.name,
      data.category,
      data.price,
      data.quantity,
      data.description,
      Image,
      navigate
    );
  };
  return (
    <>
      {productloading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <div>
            <Sidebar />
          </div>
          <div className="create_product">
            <h1>Create Product</h1>
            <div className="inputs_create">
              <input
                type="text"
                placeholder="Product Name"
                onChange={dataChange}
                name="name"
                value={data.name}
              />
              <input
                type="text"
                placeholder="Product Category"
                onChange={dataChange}
                name="category"
                value={data.category}
              />
              <input
                type="number"
                placeholder="Product Price"
                onChange={dataChange}
                name="price"
                value={data.price}
              />
              <input
                type="number"
                placeholder="Product Quantity"
                onChange={dataChange}
                name="quantity"
                value={data.quantity}
              />
              <input
                className="textarea"
                type="text"
                name="description"
                placeholder="Product Description"
                value={data.description}
                onChange={dataChange}
              />
              <input
                type="file"
                placeholder="Please Select Your Profile Picture"
                accept="image/"
                name="Image"
                onChange={imageChange}
              />
              {Image ? <img src={Image} alt="" /> : <RxAvatar />}
              <button onClick={submitProduct}>Crete Product</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
