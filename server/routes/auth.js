const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
  const { handle, email, password, pic } = req.body;
  if (!email || !password || !handle) {
    return res.status(400).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(400)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          handle,
          pic,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "New user created successfully" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Operation failed" });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Operation failed" });
    });
});

router.post("/signin", (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(400).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ message: "successfully signed in" });
          const token = jwt.sign(
            {
              _id: savedUser._id,
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            keys.JWT_KEY
          );
          const { _id, handle, email, pic } = savedUser;
          res.json({
            token,
            user: { _id, handle, email, pic },
          });
        } else {
          return res.status(400).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: "Please try again" });
      });
  });
});

module.exports = router;
