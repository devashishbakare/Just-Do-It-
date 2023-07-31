const Razorpay = require("razorpay");
const crypto = require("crypto");
const createOrder = (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.REZ_KEY,
      key_secret: process.env.REZ_SECRET,
    });

    var options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res
          .status(500)
          .json("something went wrong while creating order");
      }
      // console.log(order);
      return res.status(200).json(order);
    });
  } catch (error) {
    // console.log("Something went wrong while creating order" + error);
    return res.status(500).json("Error in creating order");
  }
};

const verifyOrder = async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

  let body = order_id + "|" + razorpay_payment_id;

  let expectedSignature = crypto
    .createHmac("sha256", process.env.REZ_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.status(200).json("payment varified");
  } else {
    return res.status(500).json("payment failed to verify");
  }
};

module.exports = {
  createOrder,
  verifyOrder,
};
