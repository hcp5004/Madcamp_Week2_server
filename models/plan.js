var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var planSchema = new Schema({
    time : String,
    place : String,
    fullPeople : Number,
    name : String,
    currentPeople : Number,
    liked : [{UID : String}]
});
module.exports = mongoose.model('plan', planSchema);