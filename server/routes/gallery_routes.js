const express = require('express');
const jsonParser = require('body-parser').json();
const Gallery = require(__dirname + '/../models/gallery');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var galleryRouter = module.exports = exports = express.Router();

galleryRouter.get('/galleries', (req, res) => {
  Gallery.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data)
  });
});

galleryRouter.post('/galleries', jsonParser, (req, res) => {
  var newGallery = new Gallery(req.body);
  newGallery.save((err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

galleryRouter.put('/galleries/:id', jsonParser, (req, res) => {
  var galleryData = req.body;
  delete galleryData._id;
  Gallery.update({_id: req.params.id}, galleryData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'Update Successful'});
  });
});

galleryRouter.delete('/galleries/:id', (req, res) => {
  Gallery.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'Successfully Deleted'});
  });
});
