const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); 

const serviceSchema = mongoose.Schema({
  serviceName: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  imagePath: {type: String, required: true}
});

serviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Service', serviceSchema);