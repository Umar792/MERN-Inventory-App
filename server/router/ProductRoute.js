const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify");
const controller = require("../controller/ProductController");

router.post("/createproduct", TokenVerify, controller.createProduct);

router.get("/getUserProducts", TokenVerify, controller.getLoginUserProducts);

router.get("/singleproduct/:id", TokenVerify, controller.SingleProduct);

router.put("/upadteProduct/:id", TokenVerify, controller.updateProduct);

router.delete("/deleteProduct/:id", TokenVerify, controller.removeProduct);

module.exports = router;
