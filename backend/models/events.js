const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  eventDate: {type: String, required: true},
  venue: {type: String, required: true},
});

module.exports = mongoose.model('Events', eventsSchema);