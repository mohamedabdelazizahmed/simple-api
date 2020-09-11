const fs = require("fs");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully.", posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  /** CHECKING VALIDATION  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // to exit file execution
    const error = new Error("Validation Failed, enter data correct ");
    // create custom property
    error.statusCode = 422;
    throw error;
  }
  // checking file in request to validation
  if (!req.file) {
    const error = new Error("No Image Provided .");
    err.statusCode = 422;
    throw err;
  }
  const imageUrl = req.file.path;

  title = req.body.title;
  content = req.body.content;
  // create post in DB.
  const post = new Post({
    title: title,
    // imageUrl: "images/part-one/CROS.PNG",
    imageUrl: imageUrl,
    content: content,
    creator: {
      name: "Mohamedabdelaziz",
    },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "The post created Successfully ",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      // to Go Another Middleware handling error ...
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error(`Could not find post.`);
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post Fetched.", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  /** CHECKING VALIDATION  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // to exit file execution
    const error = new Error("Validation Failed, enter data correct ");
    // create custom property
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.image; // my be null

  // if pick new file
  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error("No file  picked.");
    error.statusCode = 422;
    throw error;
  }
  // update post in DB
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error(`Could not find post.`);
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Post updated !",
        post: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
const clearImage = (filePath) => {
  const filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => {
    console.log(error);
  });
};
exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error(`Could not find post.`);
        error.statusCode = 404;
        throw error;
      }
      // checked logged in user
      // clear Image
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: "Deleted Post ." });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
