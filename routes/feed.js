const express = require("express");
/**
 *  npm install --save express-validator
 */
const { body } = require("express-validator/check");

const feeController = require("../controllers/feed");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get("/posts",isAuth ,feeController.getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feeController.createPost
);

//GET /post/:postId
router.get("/post/:postId", feeController.getPost);

// PUT /post/:postId
router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feeController.updatePost
);
// DELETE  /post/:postId
router.delete("/post/:postId", feeController.deletePost);

module.exports = router;
