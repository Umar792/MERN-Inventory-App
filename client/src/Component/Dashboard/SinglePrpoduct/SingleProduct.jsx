import React, { useEffect } from "react";
import { UseProductContextApi } from "../../../ContextApi/Context/ProductContext";
import { useParams } from "react-router-dom";
import Loading from "../../loading/Loading";
import Sidebar from "../Sidebar/Sidebar";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { singleProduct, getSingleProduct, productloading } =
    UseProductContextApi();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  const createdAt = singleProduct && singleProduct.createdAt;
  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString([], {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <>
      {productloading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <div>
            <Sidebar />
          </div>
          <div>
            <div className="single_product">
              <h2>
                Product Name: <font>{singleProduct && singleProduct.name}</font>
              </h2>
              <p>
                Product Category :
                <fount> {singleProduct && singleProduct.category}</fount>
              </p>
              <p>
                Product Price :
                <fount> ${singleProduct && singleProduct.price}</fount>
              </p>
              <p>
                Product Stock :
                <fount> {singleProduct && singleProduct.Quantity}</fount>
              </p>
              <p>
                Product Discription :
                <fount> {singleProduct && singleProduct.discription}</fount>
              </p>
              {/* <p>Created-At :{singleProduct && singleProduct.createdAt}</p> */}
              <p>
                Created-At : <fount>{formattedCreatedAt}</fount>
              </p>
              <img
                src={singleProduct.image && singleProduct.image.url}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
