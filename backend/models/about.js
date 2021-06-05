const mongoose = require('mongoose');


const aboutSchema = mongoose.Schema({
  aboutUs: {type: String, required: true},
  impact: {type: String, required: true},
  mission: {type: String, required: true},
  vision: {type: String, required: true},
  coreValues: {type: String, required: true},
});

module.exports = mongoose.model('About', aboutSchema);