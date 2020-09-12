const express = require("express");
/**
 *  npm install --save express-validator
 */
const { body } = require("express-validator/check");
const { route } = require("./feed");
const User = require("../models/user");
const

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email .")
    // check email dose not exists in db .
    // {req} destruction js
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-mail Address already exists.");
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty()
]);

module.exports = router;
