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
router.get("/shoeCategory", shoeController.fetchCategory);
router.get("/shoeType", shoeController.fetchBasedOnType);
router.get("/searchProduct", shoeController.searchProduct);
router.patch("/moveToCart", shoeController.moveToCartFromFavorite);
router.post("/updateQuantity", shoeController.updateCartProductQuantity);
router.post("/addAddress", shoeController.addAddress);
router.post("/placeOrder", shoeController.placeOrder);
router.delete("/deleteAllCartItems", shoeController.deleteAllCartItem);
router.get("/orderDetails", shoeController.fetchOrderDetails);
module.exports = router;
