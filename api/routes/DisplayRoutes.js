const express = require("express");
const router = express.Router();
const sendData = require("../controllers/displayController");

router.post("/foodData", sendData);

module.exports = router;
