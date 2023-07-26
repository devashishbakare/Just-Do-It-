const express = require("express");
const router = express.Router();
const authenticate = require("../config/authMiddleware");
const userController = require("../controller/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/loginStatus", userController.checkLoginStatus);
router.get("/logout", userController.logout);
router.get("/userDetails", authenticate, userController.fetchUserDetails);
router.get("/fetchOrders", authenticate, userController.fetchUserOrders);
router.put("/updateUser", authenticate, userController.updateUserDetails);
router.delete("/deleteSessions", userController.deleteSession);

//testing ejs for sending mails
router.get("/placeOrder", userController.placeOrderTemplate);

module.exports = router;
