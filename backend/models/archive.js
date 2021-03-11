const mongoose = require('mongoose');


const archiveSchema = mongoose.Schema({
  events: {type: Array, required: true},
  members: {type: Array, required: true},
  year: {type: Date, required: true},
});

module.exports = mongoose.model('Archive', archiveSchema);