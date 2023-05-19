const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  shoeDetailsId: {
    type: Array,
    default: [],
    require: true,
  },

  numberOfProduct: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["credit card", "debit card", "UPI", "Cash_On_Delivery"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Dispatched", "Delivered", "Cancelled", "Returned"],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
