var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    bookname:String,
    arthur: String,
    price: String,
    date: { type: Date, default: Date.now },
    img:String


});

var Book = mongoose.model('Book',BookSchema);
module.exports = Book;

