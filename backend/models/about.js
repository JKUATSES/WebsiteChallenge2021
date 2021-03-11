const mongoose = require('mongoose');


const aboutSchema = mongoose.Schema({
  aboutUS: {type: String, required: true},
  partners: {type: Array, required: true},
  services: {type: Array, required: true},
  impact: {type: String, required: true},
});

module.exports = mongoose.model('About', aboutSchema);