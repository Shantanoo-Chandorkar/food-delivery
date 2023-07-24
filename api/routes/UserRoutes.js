const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { CreateUser, LoginUser } = require("../controllers/userController");

router.post(
  "/createuser",
  body("email", "Incorrect Email.").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "Password must be 8 character long.").isLength({ min: 8 }),
  CreateUser
);
router.post(
  "/loginuser",
  body("email", "Incorrect Email.").isEmail(),
  body("password", "Password must be 8 character long.").isLength({ min: 8 }),
  LoginUser
);

module.exports = router;
