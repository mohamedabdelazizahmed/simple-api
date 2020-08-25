const { validationResult } = require("express-validator");
const Post = require('../models/post');


exports.getPosts = (req, res, next) => {
  // Sending the json response
  // you can see response header [Content-Type:application/json]
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "the first paragraph for post",
        imageUrl: "images/part-one/CROS.PNG",
        creator: {
          name: "Mohamedabdelaziz",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  /** CHECKING VALIDATION  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // to exit file execution 
    const error = new Error('Validation Failed, enter data correct ');
    // create custom property 
    error.statusCode = 422;
    throw error
  }
  title = req.body.title;
  content = req.body.content;
  // create post in DB.
  const post = new Post({
    title: title,
    imageUrl: 'images/part-one/CROS.PNG',
    content: content,
    creator: {
      name: "Mohamedabdelaziz",
    }
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "The post created Successfully ",
      post: result
    });
  }).catch(err => { 
    console.log(err) ;
    if (!err.statusCode ) {
      err.statusCode = 500;
    }
    // to Go Another Middleware handling error ...
    next(err);
  });

};
