const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/createOrder", paymentController.createOrder);
router.post("/verify", paymentController.verifyOrder);

module.exports = router;
