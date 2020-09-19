const path = require("path");
/**
 *  npm init , npm install --save express body-parser
 *  npm install --save-dev nodemon
 */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

MONGOOSE_URI = `mongodb+srv://mohamedabdelaziz:01282434860m@application-api-ctmzm.mongodb.net/blog?retryWrites=true&w=majority`;
const app = express();

// uploading image
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Data().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded())  DataFormat in form  x-www-form-urlencoded <form>
app.use(bodyParser.json()); //in request header application/json

// Register Multer image
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); // to store file in image

app.use("/images", express.static(path.join(__dirname, "images")));

/** Resolve the CROS problem  */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
  })
);

// this middleware run when forward  after next(err) for any Error
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message  , data :data});
});

mongoose
  .connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
