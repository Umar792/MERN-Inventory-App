import React, { useEffect, useState } from "react";
import { UseUserContext } from "../../../ContextApi/Context/UserContext";
import "./DashboardContnet.css";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineDollar, AiFillEye, AiFillDelete } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { UseProductContextApi } from "../../../ContextApi/Context/ProductContext";
import Loading from "../../loading/Loading";

const DashboardContnet = () => {
  const {
    userProducts,
    DeleteSingleProduct,
    AllProducts,
    productloading,
    getSingleProduct,
  } = UseProductContextApi();

  const { user, logout } = UseUserContext();
  const [search, setSearch] = useState("");
  const [allProductData, setAllProductData] = useState([]);
  useEffect(() => {
    if (userProducts) {
      setAllProductData(userProducts);
    }
  }, [userProducts, search === ""]);
  const navigate = useNavigate();
  const logputCalled = () => {
    logout(navigate);
  };

  const DeleteSingleProductitem = async (id) => {
    await DeleteSingleProduct(id, navigate);
    AllProducts();
  };

  let TotalAmount = 0;

  userProducts &&
    userProducts.forEach((item) => {
      TotalAmount += item.price;
    });

  let outOfStockCount = 0;
  for (const product of userProducts) {
    if (product.Quantity === 0) {
      outOfStockCount++;
    }
  }
  console.log(outOfStockCount);

  const changeSerachitem = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);

    if (search === "") {
      setAllProductData(userProducts);
    } else {
      const newFilterProduct =
        allProductData &&
        allProductData.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      setAllProductData(newFilterProduct);
    }
  };

  return (
    <>
      {productloading ? (
        <Loading />
      ) : (
        <div className="dashboard_conent">
          <div className="user_name">
            <p>
              Welcom, <font>{user && user.name}</font>
            </p>
            <button onClick={logputCalled}>Logout</button>
          </div>

          {/* ----------------- Inventory Stats  */}
          <div className="Inventory_Stats">
            <p style={{ fontWeight: "bold" }}>Inventory Stats</p>
            <div className="inventry_box">
              <div className="box_Inventory_Stats box1">
                <GiShoppingCart />
                <div className="inner_box">
                  <p>Total Products</p>
                  <p>{userProducts && userProducts.length}</p>
                </div>
              </div>
              <div className="box_Inventory_Stats box2">
                <AiOutlineDollar />
                <div className="inner_box">
                  <p>Total Sales value</p>
                  <p>${TotalAmount}</p>
                </div>
              </div>
              <div className="box_Inventory_Stats box3">
                <MdOutlineRemoveShoppingCart />
                <div className="inner_box">
                  <p>Out of stock</p>
                  <p>{outOfStockCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------  */}
          <div className="invintory_item">
            <div className="inentory_item_header">
              <h2>Inventory Items</h2>
              <input
                type="text"
                placeholder="Serach"
                value={search}
                onChange={changeSerachitem}
              />
            </div>
            {/* ---------------- table  */}
            <table>
              <tr
                style={{
                  borderTop: "2px solid red",
                  borderBottom: "2px solid red",
                }}
              >
                <th>id</th>
                <th>Name</th>
                <th>Category</th>
                <th>price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              {allProductData.length && allProductData ? (
                allProductData.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name.slice(0, 15)}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.Quantity}</td>
                      <td className="showimage">
                        <img src={item.image && item.image.url} alt="" />
                      </td>
                      <td>
                        <NavLink to={`/singleproduct/${item._id}`}>
                          <AiFillEye className="svg1" />
                        </NavLink>
                        <NavLink to={`/upadteProduct/${item._id}`}>
                          <FiEdit
                            className="svg2"
                            onClick={() => getSingleProduct(item._id)}
                          />
                        </NavLink>
                        <AiFillDelete
                          className="svg3"
                          onClick={() => DeleteSingleProductitem(item._id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p
                  className="seractdata"
                  style={{
                    marginTop: 10,
                    backgroundColor: "gray",
                    padding: 10,
                  }}
                >
                  No Product Found
                </p>
              )}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardContnet;
