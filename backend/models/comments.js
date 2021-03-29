const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
  comment: {type: String, required: true},
  aurthor: {type: String, required: true},
  date: {type: Date, required: true},
  blog: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);