// models/user.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false }, // Add isAdmin field
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
