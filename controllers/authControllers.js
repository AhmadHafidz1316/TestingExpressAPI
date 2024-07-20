require('dotenv').config();
const { User } = require("../models");
const jwt = require("jsonwebtoken")

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

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

    return res.status(201).json({
      status: 201,
      message: "User Created Successfully !!",
      data: newUser,
    });
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
            message: ["Your Email or Password is Empty !!!"]
        })
    }

    const userData = await User.findOne({ where : {email : req.body.email}})

    if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
        return res.status(400).json({
            status: 400,
            message: ["Invalid Email or Password "]
        })
    }

    const token = signToken(userData.id)
    return res.status(200).json({
        status: 200,
        message: "Login Successfully !!! ",
        token : token
    })
};
