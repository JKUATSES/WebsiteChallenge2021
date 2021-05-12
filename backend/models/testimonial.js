const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const testimonialSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true},
  authorName: {type: String, required: true},
  authorCourse: {type: String, required: true},
  date: {type: Date, required: true},
  claps: {type: Number, required: true},
});

testimonialSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Testimonial', testimonialSchema);