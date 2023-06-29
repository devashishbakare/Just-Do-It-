const mongoose = require("mongoose");

const favoriteItemSchema = new mongoose.Schema(
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

const FavoriteItem = mongoose.model("FavoriteItem", favoriteItemSchema);
module.exports = FavoriteItem;
