const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const memberSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  role: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: Number, required: true, unique: true},
  imagePath: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
});

memberSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Member', memberSchema);