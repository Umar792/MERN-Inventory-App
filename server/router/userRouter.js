const express = require("express");
const router = express.Router();
const controller = require("../controller/UserController");
const TokenVerify = require("../middleware/TokenVerify");

router.post("/registration", controller.createUser);

router.post("/verifyOTP", controller.verifyOtp);

router.post("/login", controller.Login);

router.get("/me", TokenVerify, controller.getUser);

module.exports = router;
