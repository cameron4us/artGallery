const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/gallery_app_dev')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

const galleryRouter = require(__dirname + '/routes/gallery_routes');

app.use('/api', galleryRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Hellooooo! Server is up on port: ' + PORT));
