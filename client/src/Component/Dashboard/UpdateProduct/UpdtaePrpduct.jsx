import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "../CreateProduct/CreateProduct.css";
import { RxAvatar } from "react-icons/rx";
import { UseProductContextApi } from "../../../ContextApi/Context/ProductContext";
import Loading from "../../loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePrpduct = () => {
  const { UpdateProduct, productloading, getSingleProduct, singleProduct } =
    UseProductContextApi();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
  }, []);
  //   const [Image, setImage] = useState("");
  const [data, setdata] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  useEffect(() => {
    if (singleProduct) {
      setdata({
        name: singleProduct.name && singleProduct.name,
        category: singleProduct.category && singleProduct.category,
        price: parseInt(singleProduct.price && singleProduct.price),
        quantity: parseInt(singleProduct.Quantity && singleProduct.Quantity),
        description: singleProduct.discription && singleProduct.discription,
      });
    }
  }, [singleProduct]);
  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const submitProduct = () => {
    UpdateProduct(
      data.name,
      data.category,
      data.price,
      data.quantity,
      data.description,
      navigate,
      id
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
              {/* <input
                type="file"
                placeholder="Please Select Your Profile Picture"
                accept="image/"
                name="Image"
                onChange={imageChange}
              />
              {Image ? <img src={Image} alt="" /> : <RxAvatar />} */}
              <button onClick={submitProduct}>Update Product</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePrpduct;
