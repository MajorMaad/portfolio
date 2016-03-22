var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Project', new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    image: String,
    description: String,
    link: String,
    technologies: [{ name: String, logo: String }],
    priority: Number
}));
