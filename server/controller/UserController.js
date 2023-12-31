const UserModel = require("../Models/UserSchema");
const SendMail = require("../utiles/SendMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          mesaage: "Please fill all the fields",
        });
      }

      const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "samples",
        width: 150,
        crop: "scale",
      });
      const isUser = await UserModel.findOne({ email });
      if (isUser) {
        return res.status(400).json({
          success: false,
          mesaage: "Email Alredy Exist Please Login",
        });
      }
      const randomOTP = Math.floor(Math.random() * 9000 + 1000);
      const message = `Hello ${name}, Your OTP is ${randomOTP}`;
      await UserModel.create({
        name: name,
        email: email,
        password: password,
        OTP: randomOTP,
        avatar: {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        },
      });
      try {
        await SendMail({
          email: email,
          subject: "From Inventory Manaement",
          message: message,
        });
        res.status(200).json({
          success: true,
          message: "We send an OTP on you Email Please Chcek",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        mesaage: error,
      });
    }
  },

  //   ----------------------------- OTP VERIFICATION

  verifyOtp: async function (req, res) {
    const { OTP } = req.body;
    if (!OTP) {
      return res.status(400).json({
        success: false,
        message: "Please enter OTP",
      });
    }

    const user = await UserModel.findOne({ OTP: OTP });
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Incorrect OTP. Your account will be deleted after 5 minutes. Please retry OTP",
      });
    }

    if (user.verify === "verify") {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified. Please login.",
      });
    }
    // const otpExpired = isOTPExpired(user.createdAt);
    if (user && user.OTP === OTP) {
      user.verify = "verify";
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Successful verification. Please login.",
      });
    } else {
      await UserModel.findByIdAndDelete(user._id);
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please retry.",
      });
    }
  },

  //   -------------- login User

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          mesaage: "Please Enter All Fields",
        });
      }
      const isUser = await UserModel.findOne({ email });
      if (!isUser) {
        return res.status(400).json({
          success: false,
          mesaage: "Inalid Email Password",
        });
      }
      if (isUser.verify !== "verify") {
        return res.status(400).json({
          success: false,
          mesaage: "Please first verify your account",
        });
      }

      const Token = await jwt.sign({ _id: isUser._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });

      const isMatch = await bcrypt.compare(password, isUser.password);
      if (isMatch) {
        res.status(200).cookie("token", Token).json({
          success: false,
          mesaage: "Login Successfuly",
          isUser,
          Token,
        });
      } else {
        res.status(400).json({
          success: false,
          mesaage: "Inavlid Email or Password",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        mesaage: error.mesaage,
      });
    }
  },

  // ------------- get user
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).populate("products");
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        mesaage: error.mesaage,
      });
    }
  },
};
const isOTPExpired = (otpCreatedAt) => {
  const OTP_EXPIRATION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  const currentTime = new Date().getTime();
  const otpCreationTime = new Date(otpCreatedAt).getTime();
  return currentTime - otpCreationTime >= OTP_EXPIRATION_DURATION;
};
