var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechnologySchema = require('./technology').schema;

module.exports = mongoose.model('Project', new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    image: String,
    description: String,
    link: String,
    technologies: [TechnologySchema],
    priority: Number
}));
