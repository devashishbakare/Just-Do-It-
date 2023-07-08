const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
