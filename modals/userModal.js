const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is  require"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is require"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone is require"],
    },
    userType: {
      type: String,
      required: [true, "user type is require"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fprofile%2520icon&psig=AOvVaw3D82eKkAdon_k5VwseRZFH&ust=1711524513781000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDS4OezkYUDFQAAAAAdAAAAABA_",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
