const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      default: "no image",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
