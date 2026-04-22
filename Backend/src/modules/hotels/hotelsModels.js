
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);