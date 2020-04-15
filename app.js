/**
 *  npm init , npm install --save express body-parser 
 *  npm install --save-dev nodemon 
 */
const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const app = express();

// app.use(bodyParser.urlencoded())  DataFormat in form  x-www-form-urlencoded <form>
app.use(bodyParser.json()); //in request header application/json

app.use('/feed', feedRoutes);

app.listen(8080);