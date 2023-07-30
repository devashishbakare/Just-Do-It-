const express = require("express");
const router = express.Router();
const authenticate = require("../config/authMiddleware");

const shoeController = require("../controller/shoeController");
router.post("/addProduct", shoeController.addProduct);
router.get("/shopNow", shoeController.fetchAllProduct);
router.post("/addToCart", authenticate, shoeController.addToCart);
router.get("/cartItems", authenticate, shoeController.fetchCartItems);
router.delete("/deleteCartItem", authenticate, shoeController.deleteCartItem);
router.post("/addFavorite", authenticate, shoeController.addToFavorite);
router.delete(
  "/delteFromFavorite",
  authenticate,
  shoeController.deleleFromFavorite
);
router.get("/fetchFavorite", authenticate, shoeController.fetchFavorite);
router.get("/shoeCategory", shoeController.fetchCategory);
router.get("/shoeType", shoeController.fetchBasedOnType);
router.get("/searchProduct", shoeController.searchProduct);
router.patch(
  "/moveToCart",
  authenticate,
  shoeController.moveToCartFromFavorite
);
router.post(
  "/updateQuantity",
  authenticate,
  shoeController.updateCartProductQuantity
);
router.post("/addAddress", shoeController.addAddress);
router.post("/placeOrder", authenticate, shoeController.placeOrder);
router.delete(
  "/deleteAllCartItems",
  authenticate,
  shoeController.deleteAllCartItem
);
router.get("/orderDetails/:id", authenticate, shoeController.fetchOrderDetails);
router.delete("/deleteOrder", authenticate, shoeController.deleteOrder);
router.get("/placeOrder", shoeController.placeOrderTemplate);
router.delete("/clearCart", shoeController.clearCart);
module.exports = router;
