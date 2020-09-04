const { validationResult } = require("express-validator");
const Post = require("../models/post");

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
