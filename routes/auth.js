const express = require("express");
/**
 *  npm install --save express-validator
 */
const { body } = require("express-validator/check");
const { route } = require("./feed");

const router = express.Router();

router.put('/signup')

module.exports = router;