const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  image: {
    public_id: {
      type: String,
      required: [true, "Please Enter Your Product Image"],
    },
    url: {
      type: String,
      required: [true, "Please Enter Your Product url"],
    },
  },
  name: {
    type: String,
    required: [true, "Plaese Enter Your Product Name"],
  },
  category: {
    type: String,
    required: [true, "Plaese Enter Your Product Category"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Your Product Price"],
  },
  Quantity: {
    type: Number,
    required: [true, "Please Enter Your Product Quantity"],
  },
  discription: {
    type: String,
    required: [true, "Plaese Enter Your Product Description"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
