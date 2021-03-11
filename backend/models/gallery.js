const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const gallerySchema = mongoose.Schema({
  imagePath: {type: String, required: true, unique},
  description: {type: String, required: true},
  date: {type: String, required: true},
});

gallerySchema.plugin(uniqueValidator);


module.exports = mongoose.model('Gallery', gallerySchema);