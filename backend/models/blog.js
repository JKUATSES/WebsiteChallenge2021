const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  subTitle: {type: String, required: true},
  topic: {type: String, required: true},
  subTopic: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true},
  authorID: {type: String, required: true},
  author: {type: String, required: true},
  date: {type: Date, required: true},
  claps: {type: Number, required: true},
});

module.exports = mongoose.model('Blog', blogSchema);