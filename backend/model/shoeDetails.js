const mongoose = require("mongoose");

const shoeDetailsSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    shoes_type: {
      type: String,
      enum: ["Male", "Female", "Kid"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Lifestyle", "Running", "Training and Gym", "Basketball"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableColors: {
      type: [String],
      default: [],
      require: true,
    },
    availableSize: {
      type: [Number],
      default: [],
      require: true,
    },
    summary: {
      type: String,
      required: true,
    },
    productInformation: {
      type: [String],
      default: [],
      require: true,
    },
  },
  { timestamps: true }
);

const ShoeDetails = mongoose.model("ShoeDetails", shoeDetailsSchema);

module.exports = ShoeDetails;
