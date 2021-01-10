var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    // image: ImageBitmap,
    user: String,
    image: String,
});


module.exports = mongoose.model('photo', photoSchema); // when call module by require, this function is executed. 