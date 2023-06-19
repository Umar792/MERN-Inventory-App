const ProductModel = require("../Models/ProductsSchema");
const UserModel = require("../Models/UserSchema");
const cloudinary = require("cloudinary");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, category, price, Quantity, discription } = req.body;
      const isuser = await UserModel.findById(req.user._id);
      if (!name || !category || !price || !Quantity || !discription) {
        return res.status(400).json({
          success: false,
          message: "Please all the fields",
        });
      }
      const mycloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "samples",
        width: 150,
        crop: "scale",
      });
      const productData = {
        name,
        discription,
        category,
        price,
        Quantity,
        owner: isuser._id,
        image: {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        },
      };
      let newProduct = await ProductModel.create(productData);

      await isuser.products.push(newProduct._id);
      await isuser.save();

      res.status(200).json({
        success: true,
        message: "Product Create Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ---------------- get Login User Products

  getLoginUserProducts: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      const loginUserProducts = await ProductModel.find({
        owner: user._id,
      }).populate("owner");
      res.status(200).json({
        success: true,
        loginUserProducts,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ------------- get single product
  SingleProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id).populate(
        "owner"
      );
      if (!product) {
        res.status(400).json({
          success: false,
          message: "Product not found please enter valid id",
        });
      }
      res.status(200).json({
        product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ------------------ update Product
  updateProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
        res.status(400).json({
          success: false,
          message: "Product not found please enter valid id",
        });
      } else {
        await ProductModel.findByIdAndUpdate(product._id, req.body, {
          new: true,
        });
        res.status(200).json({
          success: true,
          message: "Product Update Successfuly",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  },

  //   --------------- delete Prodcut
  removeProduct: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      const user = await UserModel.findById(req.user._id);
      if (!product) {
        res.status(400).json({
          success: false,
          message: "Product not found please enter valid id",
        });
      }
      // Delete the product
      await ProductModel.findByIdAndDelete(product._id);

      // Remove the product ID from the user's myProducts array
      user.products = await user.products.filter(
        (productId) => productId.toString() !== product._id.toString()
      );
      await user.save();
      res.status(200).json({
        success: true,
        message: "Product Delete Successfyly",
      });
    } catch (error) {}
  },
};
