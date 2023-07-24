const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const CreateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(15);
  let securePass = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      name: req.body.name,
      password: securePass,
      email: req.body.email,
      location: req.body.location,
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false });
  }
};

const LoginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let email = req.body.email;
  try {
    let userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).send({ errors: "Incorrect Credentials" });
    }
    const passCompare = await bcrypt.compare(
      req.body.password,
      userdata.password
    );

    if (!passCompare) {
      return res.status(400).send({ errors: "Incorrect Credentials" });
    }
    const data = {
      user: {
        id: userdata._id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_TOKEN);

    return res.status(200).send({ success: true, authToken: authToken });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false });
  }
};

module.exports = { CreateUser, LoginUser };
