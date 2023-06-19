const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your UserName"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email Adress"],
    validate: [validator.isEmail, "Please Enter Valid Email Adress"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password should be greater then 6 character"],
    required: [true, "Please Enter Your Password"],
  },
  avatar: {
    public_id: {
      type: String,
      required: [true, "Plaese pic an profie image"],
    },
    url: {
      type: String,
      required: [true, "Plaese pic an profie image"],
    },
  },
  OTP: {
    type: Number,
  },
  verify: {
    type: String,
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
