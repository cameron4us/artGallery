const mongoose = require('mongoose');

var gallerySchema = new mongoose.Schema({
  link: String,
  caption: String
});

module.exports = exports = mongoose.model('Gallery', gallerySchema);