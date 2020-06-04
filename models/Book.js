var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    bookname:String,
    author: String,
    publisher:String,
    price: String,
    edition:String,
    language:String,
    dimension:String,
    description:String,
    image:String,
    date: { type: Date, default: Date.now }

});

var Book = mongoose.model('Book',BookSchema);
module.exports = Book;

