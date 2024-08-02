require("dotenv").config();
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOption = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOption);

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

exports.registerUser = async (req, res) => {
  try {
    if (!req.body.passwordConfirm) {
      return res.status(400).json({
        status: 400,
        message: ["Password Confirmation Empty !!! "],
      });
    }

    if (req.body.password != req.body.passwordConfirm) {
      return res.status(400).json({
        status: 400,
        message: ["Invalid Password Confirm"],
      });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Error Validation",
      error: error.errors.map((err) => err.message),
    });
  }
};

exports.loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: ["Your Email or Password is Empty !!!"],
    });
  }

  const userData = await User.findOne({ where: { email: req.body.email } });

  if (
    !userData ||
    !(await userData.CorrectPassword(req.body.password, userData.password))
  ) {
    return res.status(400).json({
      status: 400,
      message: ["Invalid Email or Password "],
    });
  }

  createSendToken(userData, 200, res);
};


