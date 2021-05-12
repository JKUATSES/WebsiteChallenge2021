const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true},
  githubLink: {type: String, required: true},
  youtubeLink: {type: String, required: true},
  claps: {type: Number, required: true},
});

projectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema);