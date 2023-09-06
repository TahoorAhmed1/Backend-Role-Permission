const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { Signup, Login, getUser } = require("../libs/user");
const fetchuser = require("../middleware/fetchuser");
router.post(
  "/signUp",
  [
    body("name", "Name min Length require 2").isLength({ min: 2 }),
    body("email", "  use correct email").isEmail(),
    body("password", " password min Length require 2").isLength({ min: 2 }),
  ],
  async (req, res) => {
    if (req.method == "POST") {
      Signup(req, res);
    }
  }
);
router.post(
  "/login",
  [
    body("email", "use correct email").isEmail(),
    body("password", " password Length is to short").isLength({ min: 2 }),
  ],
  async (req, res) => {
    if (req.method == "POST") {
      Login(req, res);
    }
  }
);
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    if (req.method == "POST") {
      getUser(req, res);
    } else {
      res.json({ message: "Invalid " });
    }
  } catch (err) {
    res.json({ message: "Invalid " });
  }
});

module.exports = router;
