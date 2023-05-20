const express = require("express");
const router = express.Router();

const shoeController = require("../controller/shoeController");
router.post("/addProduct", shoeController.addProduct);
router.get("/shopNow", shoeController.fetchAllProduct);
router.post("/addToCart", shoeController.addToCart);
router.get("/cartItems/:id", shoeController.fetchCartItems);
router.delete("/deleteCartItem", shoeController.deleteCartItem);
module.exports = router;
