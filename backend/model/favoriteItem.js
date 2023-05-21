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
  },
  { timestamps: true }
);

const FavoriteItem = mongoose.model("FavoriteItem", favoriteItemSchema);
module.exports = FavoriteItem;
