const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/register", async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({
        message: "User already exits",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "User does not exits",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.send({
      message: "Login Successful",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

router.post("/get-user-info", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

module.exports = router;
