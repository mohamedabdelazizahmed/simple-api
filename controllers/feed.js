exports.getPosts = (req, res, next) => {
  // Sending the json response
  // you can see response header [Content-Type:application/json]
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: "First Post",
        content: "the first paragraph for post",
        imageUrl: "images/part-1/CROS.PNG",
        creator:{
          name: 'Mohamedabdelaziz'
        },
        createdAt: new Date()
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  title = req.body.title;
  content = req.body.content;
  // create post in DB.

  res.status(201).json({
    message: "The post created Successfully ",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};
