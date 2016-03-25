var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Technology', new Schema({
    name: String,
    logo: String
}));
