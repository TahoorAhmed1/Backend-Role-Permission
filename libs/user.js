const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ success: false, message: "Email exist" });
    }
    user = new User({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    await user.save();
    let data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    const token = jwt.sign(data, "#1212213#21$$$13", { expiresIn: "1m" });
    res
      .status(200)
      .json({ success: true, data: data.user, authentication: token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const Login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ user: "Invalid User" });
    }
    if (email == user.email && password == user.password) {
      let data = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
      const token = jwt.sign(data, "#1212213#21$$$13", { expiresIn: "1m" });
      res
        .status(200)
        .json({ success: true, data: data.user, authentication: token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }
    res.status(400).json({ success: true, data: user, message: "" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { Signup, Login, getUser };
