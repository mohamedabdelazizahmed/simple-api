const express = require("express");
const { body } = require("express-validator");

const feeController = require("../controllers/feed");
const router = express.Router();

//GET /feed/posts
router.get("/posts", feeController.getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feeController.createPost
);

module.exports = router;
