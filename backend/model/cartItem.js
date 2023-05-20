const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productItemId: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
