const mongoose = require('mongoose');


const partnersSchema = mongoose.Schema({
  companyName: {type: String, required: true, unique = true},
  status: {type: Array, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
});

partnersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Partners', partnersSchema);