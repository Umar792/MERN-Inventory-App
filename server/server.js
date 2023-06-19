const express = require("express");
const app = express();
const cloudinary = require("cloudinary");

// ----------- dotenv
require("dotenv").config();

// ------------ cors
const cors = require("cors");
app.use(cors());

// --------------- cookie parser
var cookieParser = require("cookie-parser");
app.use(cookieParser());

// body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ------------ mongoose connect
require("./DB/conn");

// ======== cloudinary
cloudinary.config({
  cloud_name: "dvgvcifrd",
  api_key: "651412252829259",
  api_secret: "RC4IM6i6t_oginPt9h1os5C5BBw",
});

// -------------- router
app.use("/", require("./router/userRouter"));
app.use("/", require("./router/ProductRoute"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Express server running on port ${process.env.PORT}`);
});

// ------------- unhandledRejection
process.on("unhandledRejection", (err) => {
  console.log(`Error due to unhandledRejection ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

// -------------------- uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error due to uncaughtException ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
