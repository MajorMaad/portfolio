var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Project', new Schema({
  title: String,
  image: String,
  description: String
}));
