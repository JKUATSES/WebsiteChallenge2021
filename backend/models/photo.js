const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const photoSchema = mongoose.Schema({
  imagePath: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
});

photoSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Photo', photoSchema);