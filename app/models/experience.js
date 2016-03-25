var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Experience', new Schema({
    period: {type: String, required: true},
    description: {type: String, required: true},
    end_date: {type: Date, required: true},
    start_date: {type: Date, required: true},
    is_education: {type: Boolean, required: true}
}));
