const mongoose = require("mongoose");
const Address = require("./address");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    cartIds: {
      type: Array,
      default: [],
      require: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentMethod: {
      type: String,
      default: "COD",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
