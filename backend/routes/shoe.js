const express = require("express");
const router = express.Router();

const shoeController = require("../controller/shoeController");
router.post("/addProduct", shoeController.addProduct);
module.exports = router;
