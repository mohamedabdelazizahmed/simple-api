/**
 *  npm init , npm install --save express body-parser
 *  npm install --save-dev nodemon
 */
const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");
const app = express();

// app.use(bodyParser.urlencoded())  DataFormat in form  x-www-form-urlencoded <form>
app.use(bodyParser.json()); //in request header application/json

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

app.listen(8080);
