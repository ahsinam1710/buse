const mongoose = require("mongoose");
//create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is requiered"
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required"
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required"
    },
    passwordResetToken: {
      type: String,
      default: ""
    },
    passwordResetExpires: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("User", userSchema);
