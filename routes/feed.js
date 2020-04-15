const express = require('express');
const feeController = require('../controllers/feed');
const router = express.Router();

//GET /feed/posts
router.get('/posts' , feeController.getPosts);

// POST /feed/post
router.post('/post' , feeController.createPost);




module.exports = router;