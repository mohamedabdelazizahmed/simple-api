const path = require("path");
/**
 *  npm init , npm install --save express body-parser
 *  npm install --save-dev nodemon
 */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

MONGOOSE_URI = `mongodb+srv://mohamedabdelaziz:01282434860m@application-api-ctmzm.mongodb.net/blog?retryWrites=true&w=majority`;
const app = express();

// app.use(bodyParser.urlencoded())  DataFormat in form  x-www-form-urlencoded <form>
app.use(bodyParser.json()); //in request header application/json
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

app.use("/feed", feedRoutes);
// this middleware run when forward  after next(err) for any Error
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({message: message});
});
mongoose
  .connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
