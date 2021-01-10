var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    // image: ImageBitmap,
    user: String,
    name: String,
    number: String,
});


module.exports = mongoose.model('contact', contactSchema); // when call module by require, this function is executed. 