const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: [2],
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: [6],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);