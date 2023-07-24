const express = require("express");
const router = express.Router();
const {
  OrderData,
  SingleOrderData,
} = require("../controllers/orderController");

router.post("/orderData", OrderData);
router.post("/singleOrderData", SingleOrderData);

module.exports = router;
