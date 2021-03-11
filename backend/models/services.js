const mongoose = require('mongoose');


const servicesSchema = mongoose.Schema({
  serviceName: {type: String, required: true, unique = true},
  description: {type: Array, required: true}
});

servicesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Partners', servicesSchema);