/**
 *  npm init , npm install --save express body-parser 
 *  npm install --save-dev nodemon 
 */
const express = require('express');
const feedRoutes = require('./routes/feed');

const app = express();


app.use('/feed', feedRoutes);

app.listen(8080);