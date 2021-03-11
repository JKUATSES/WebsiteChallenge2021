const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  subTitle: {type: String, required: true},
  topic: {type: String, required: true},
  subTopic: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required},
  authorID: {type: String, required: true},
  author: {type: String, required: true},
  date: {type: String, required: true},
  comments: {type: Array, required: true},
  claps: {type: Number, required: true},
});

module.exports = mongoose.model('Blog', blogSchema);