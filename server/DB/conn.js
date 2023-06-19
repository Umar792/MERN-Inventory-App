const mongoose = require("mongoose");

mongoose
  .connect(process.env.BAS_URI)
  .then(() => {
    console.log("Mongoose connect");
  })
  .catch(() => {
    console.log("Mongoose not connect");
  });
