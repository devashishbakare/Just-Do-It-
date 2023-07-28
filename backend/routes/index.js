const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.testCall);
router.use("/user", require("./user"));
router.use("/shoe", require("./shoe"));
router.use("/payment", require("./payment"));

module.exports = router;
