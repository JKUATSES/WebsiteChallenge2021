const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
  venue: {type: String, required: true},
  imagePath: {type: String, required: true} // poster, photo, etc
});

module.exports = mongoose.model('Event', eventSchema);