const express = require("express");
const router = express.Router();

const shoeController = require("../controller/shoeController");
router.post("/addProduct", shoeController.addProduct);
router.get("/shopNow", shoeController.fetchAllProduct);
router.post("/addToCart", shoeController.addToCart);
router.get("/cartItems/:id", shoeController.fetchCartItems);
router.delete("/deleteCartItem", shoeController.deleteCartItem);
router.post("/addFavorite", shoeController.addToFavorite);
router.delete("/delteFromFavorite", shoeController.deleleFromFavorite);
router.get("/fetchFavorite/:id", shoeController.fetchFavorite);
module.exports = router;
