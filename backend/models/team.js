const mongoose = require('mongoose');


const teamSchema = mongoose.Schema({
  email: {type: String, required: true, unique = true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  role: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
});

teamSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Team', partnersSchema);